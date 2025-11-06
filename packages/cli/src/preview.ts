import { spawn } from 'child_process';
import chalk from 'chalk';
import boxen from 'boxen';

export async function previewServer(): Promise<void> {
  console.log(chalk.cyan('\n🚀 Starting development server...\n'));

  const devServer = spawn('pnpm', ['dev'], {
    stdio: 'inherit',
    shell: true,
  });

  console.log(
    boxen(
      chalk.green.bold('✓ Server running!\n\n') +
      chalk.white('Local: ') + chalk.cyan('http://localhost:3000\n') +
      chalk.gray('(If port 3000 is busy, check terminal for actual port)\n\n') +
      chalk.yellow('💡 Edit content/landing.yaml to see live changes\n') +
      chalk.gray('Press Ctrl+C to stop the server'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
      }
    )
  );

  return new Promise((resolve) => {
    devServer.on('exit', () => {
      console.log(chalk.yellow('\n👋 Server stopped\n'));
      resolve();
    });

    // Handle Ctrl+C
    process.on('SIGINT', () => {
      devServer.kill('SIGINT');
    });
  });
}
