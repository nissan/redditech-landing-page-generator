import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { projectContext } from './project-context.js';

export class ConfigManager {
  private config: any;
  private configPath: string;

  constructor(projectName?: string) {
    // If projectName provided, use it; otherwise use current project context
    if (projectName) {
      projectContext.setCurrentProject(projectName);
    }

    projectContext.ensureContentDir();
    this.configPath = projectContext.getConfigPath();
    this.load();
  }

  private load() {
    try {
      const fileContents = fs.readFileSync(this.configPath, 'utf8');
      this.config = yaml.load(fileContents);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      this.config = {};
    }
  }

  get(path: string): any {
    const keys = path.split('.');
    let current = this.config;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return current;
  }

  set(path: string, value: any): void {
    const keys = path.split('.');
    let current = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  delete(path: string): void {
    const keys = path.split('.');
    let current = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        return;
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    delete current[lastKey];
  }

  save(): void {
    try {
      const yamlStr = yaml.dump(this.config, {
        indent: 2,
        lineWidth: -1,
      });
      fs.writeFileSync(this.configPath, yamlStr, 'utf8');
    } catch (error) {
      console.error('Failed to save configuration:', error);
      throw error;
    }
  }

  getAll(): any {
    return this.config;
  }
}
