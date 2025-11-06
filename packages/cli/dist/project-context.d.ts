export declare class ProjectContext {
    private static instance;
    private currentProject;
    private constructor();
    static getInstance(): ProjectContext;
    selectProject(): Promise<string | null>;
    getCurrentProject(): string | null;
    setCurrentProject(projectName: string): void;
    getProjectPath(projectName?: string): string;
    getContentPath(projectName?: string): string;
    getConfigPath(projectName?: string): string;
    ensureContentDir(projectName?: string): void;
}
export declare const projectContext: ProjectContext;
//# sourceMappingURL=project-context.d.ts.map