import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { createProjectScaffold } from '../templates/project-scaffold.js';
import { spawn } from 'child_process';

export async function createProject(): Promise<string | null> {
  console.log(chalk.cyan('\n📂 Create New Landing Page Project\n'));

  // Get project name
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (input: string) => {
        if (!input || input.trim() === '') {
          return 'Project name is required';
        }
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Project name must contain only lowercase letters, numbers, and hyphens';
        }

        const projectPath = path.join(process.cwd(), 'projects', input);
        if (fs.existsSync(projectPath)) {
          return `Project "${input}" already exists`;
        }

        return true;
      },
    },
  ]);

  const projectPath = path.join(process.cwd(), 'projects', projectName);

  // Create spinner
  const spinner = createSpinner('Creating project structure...').start();

  try {
    // Create project scaffold
    await createProjectScaffold({
      projectName,
      projectPath,
    });

    spinner.success({ text: chalk.green('Project structure created!') });

    // Ask if user wants to install dependencies
    const { installDeps } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies now?',
        default: true,
      },
    ]);

    if (installDeps) {
      const installSpinner = createSpinner('Installing dependencies...').start();

      await new Promise<void>((resolve, reject) => {
        const install = spawn('pnpm', ['install'], {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        });

        install.on('close', (code) => {
          if (code === 0) {
            installSpinner.success({ text: chalk.green('Dependencies installed!') });
            resolve();
          } else {
            installSpinner.error({ text: chalk.red('Failed to install dependencies') });
            reject(new Error('Installation failed'));
          }
        });

        install.on('error', (error) => {
          installSpinner.error({ text: chalk.red(`Error: ${error.message}`) });
          reject(error);
        });
      });
    }

    // Success message
    console.log(chalk.green('\n✅ Project created successfully!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.gray(`  1. Run ${chalk.white('pnpm lpg')} to configure your landing page`));
    console.log(chalk.gray(`  2. Run ${chalk.white('pnpm dev ' + projectName)} to start the dev server`));
    console.log();

    return projectName;
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to create project') });
    console.error(error);
    return null;
  }
}
