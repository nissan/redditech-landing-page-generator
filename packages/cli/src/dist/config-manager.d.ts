export declare class ConfigManager {
    private config;
    private configPath;
    constructor(configPath?: string);
    private load;
    get(path: string): any;
    set(path: string, value: any): void;
    delete(path: string): void;
    save(): void;
    getAll(): any;
}
//# sourceMappingURL=config-manager.d.ts.map