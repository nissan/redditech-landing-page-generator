import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { getProjects } from './commands/list.js';
import { createProject } from './commands/create.js';
export class ProjectContext {
    static instance = null;
    currentProject = null;
    constructor() { }
    static getInstance() {
        if (!ProjectContext.instance) {
            ProjectContext.instance = new ProjectContext();
        }
        return ProjectContext.instance;
    }
    async selectProject() {
        const projects = getProjects();
        if (projects.length === 0) {
            console.log(chalk.yellow('\n⚠️  No projects found\n'));
            const { createNew } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'createNew',
                    message: 'Would you like to create a new project?',
                    default: true,
                },
            ]);
            if (createNew) {
                const projectName = await createProject();
                if (projectName) {
                    this.currentProject = projectName;
                    return projectName;
                }
            }
            return null;
        }
        // If only one project, select it automatically
        if (projects.length === 1) {
            this.currentProject = projects[0].name;
            console.log(chalk.cyan(`\n📂 Using project: ${chalk.white.bold(projects[0].name)}\n`));
            return projects[0].name;
        }
        // Multiple projects - let user choose
        const choices = projects.map(p => ({
            name: `${p.name} ${p.hasConfig ? chalk.green('✓') : chalk.yellow('⚠')}`,
            value: p.name,
        }));
        choices.push({
            name: chalk.green('➕ Create new project'),
            value: '__create_new__',
        });
        const { selectedProject } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedProject',
                message: chalk.cyan('Select a project:'),
                choices,
            },
        ]);
        if (selectedProject === '__create_new__') {
            const projectName = await createProject();
            if (projectName) {
                this.currentProject = projectName;
                return projectName;
            }
            return null;
        }
        this.currentProject = selectedProject;
        return selectedProject;
    }
    getCurrentProject() {
        return this.currentProject;
    }
    setCurrentProject(projectName) {
        this.currentProject = projectName;
    }
    getProjectPath(projectName) {
        const name = projectName || this.currentProject;
        if (!name) {
            throw new Error('No project selected');
        }
        return path.join(process.cwd(), 'projects', name);
    }
    getContentPath(projectName) {
        return path.join(this.getProjectPath(projectName), 'content');
    }
    getConfigPath(projectName) {
        return path.join(this.getContentPath(projectName), 'landing.yaml');
    }
    ensureContentDir(projectName) {
        const contentPath = this.getContentPath(projectName);
        if (!fs.existsSync(contentPath)) {
            fs.mkdirSync(contentPath, { recursive: true });
        }
    }
}
// Export singleton instance
export const projectContext = ProjectContext.getInstance();
//# sourceMappingURL=project-context.js.map