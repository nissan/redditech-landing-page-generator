export class ConfigManager {
    constructor(configPath?: string);
    configPath: string;
    load(): void;
    config: unknown;
    get(path: any): unknown;
    set(path: any, value: any): void;
    delete(path: any): void;
    save(): void;
    getAll(): unknown;
}
//# sourceMappingURL=config-manager.d.ts.map