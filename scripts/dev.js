#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const projectsDir = path.join(__dirname, '..', 'projects');

// Get all project directories
function getProjects() {
  if (!fs.existsSync(projectsDir)) {
    console.error('No projects directory found. Run "pnpm lpg" to create your first project.');
    process.exit(1);
  }

  const dirs = fs.readdirSync(projectsDir).filter(dir => {
    const fullPath = path.join(projectsDir, dir);
    return fs.statSync(fullPath).isDirectory() &&
           fs.existsSync(path.join(fullPath, 'package.json'));
  });

  if (dirs.length === 0) {
    console.error('No projects found. Run "pnpm lpg" to create your first project.');
    process.exit(1);
  }

  return dirs;
}

// Run dev server for a project
function runDevServer(projectName) {
  const projectPath = path.join(projectsDir, projectName);

  if (!fs.existsSync(projectPath)) {
    console.error(`Project "${projectName}" not found.`);
    process.exit(1);
  }

  console.log(`\n🚀 Starting dev server for project: ${projectName}\n`);

  const devProcess = spawn('pnpm', ['next', 'dev'], {
    cwd: projectPath,
    stdio: 'inherit',
    shell: true
  });

  devProcess.on('error', (error) => {
    console.error(`Error starting dev server: ${error.message}`);
    process.exit(1);
  });

  devProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Dev server exited with code ${code}`);
    }
    process.exit(code);
  });
}

// Interactive project selection
function selectProject(projects) {
  console.log('\n📂 Available Projects:\n');
  projects.forEach((project, index) => {
    console.log(`  ${index + 1}. ${project}`);
  });
  console.log();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select a project (number or name): ', (answer) => {
    rl.close();

    const num = parseInt(answer);
    let selectedProject;

    if (!isNaN(num) && num >= 1 && num <= projects.length) {
      selectedProject = projects[num - 1];
    } else if (projects.includes(answer)) {
      selectedProject = answer;
    } else {
      console.error(`Invalid selection: ${answer}`);
      process.exit(1);
    }

    runDevServer(selectedProject);
  });
}

// Main logic
const args = process.argv.slice(2);
const projects = getProjects();

if (args.length === 0) {
  // No arguments - show interactive selection
  if (projects.length === 1) {
    // Only one project, run it directly
    runDevServer(projects[0]);
  } else {
    selectProject(projects);
  }
} else {
  // Project name provided as argument
  const projectName = args[0];
  runDevServer(projectName);
}
