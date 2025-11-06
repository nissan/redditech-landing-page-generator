import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export interface ProjectInfo {
  name: string;
  path: string;
  hasConfig: boolean;
}

export function getProjects(): ProjectInfo[] {
  const projectsDir = path.join(process.cwd(), 'projects');

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const dirs = fs.readdirSync(projectsDir).filter(dir => {
    const fullPath = path.join(projectsDir, dir);
    return fs.statSync(fullPath).isDirectory() &&
           fs.existsSync(path.join(fullPath, 'package.json'));
  });

  return dirs.map(dir => {
    const projectPath = path.join(projectsDir, dir);
    const configPath = path.join(projectPath, 'content', 'landing.yaml');

    return {
      name: dir,
      path: projectPath,
      hasConfig: fs.existsSync(configPath),
    };
  });
}

export function listProjects(): void {
  const projects = getProjects();

  if (projects.length === 0) {
    console.log(chalk.yellow('\n⚠️  No projects found'));
    console.log(chalk.gray('Run "pnpm lpg" and select "Create new project" to get started.\n'));
    return;
  }

  console.log(chalk.cyan('\n📂 Landing Page Projects:\n'));

  projects.forEach((project, index) => {
    const status = project.hasConfig
      ? chalk.green('✓ Configured')
      : chalk.yellow('⚠ Not configured');

    console.log(`  ${index + 1}. ${chalk.white.bold(project.name)} ${status}`);
  });

  console.log();
  console.log(chalk.gray('Run ' + chalk.white('pnpm dev [project-name]') + ' to start a project'));
  console.log(chalk.gray('Run ' + chalk.white('pnpm lpg') + ' to configure a project\n'));
}
