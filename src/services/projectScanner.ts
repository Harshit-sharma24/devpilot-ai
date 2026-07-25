import * as vscode from "vscode";

export interface ProjectInfo {
    projectName: string;
    framework: string;
    language: string;

    hasReadme: boolean;
    hasLicense: boolean;
    hasGitignore: boolean;
    hasPackageJson: boolean;

    dependencies: string[];
    devDependencies: string[];

    hasTailwind: boolean;
    hasDocker: boolean;
    hasGit: boolean;
    hasESLint: boolean;
    hasPrettier: boolean;
}

export async function scanProject(): Promise<ProjectInfo | null> {

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return null;
    }

    const folder = workspaceFolders[0].uri;

    const files = await vscode.workspace.fs.readDirectory(folder);

    const fileNames = files.map(file => file[0]);

    const hasPackageJson = fileNames.includes("package.json");
    const hasReadme = fileNames.includes("README.md");

    const hasLicense =
        fileNames.includes("LICENSE") ||
        fileNames.includes("LICENSE.txt");

    const hasGitignore = fileNames.includes(".gitignore");

    let projectName = folder.path.split("/").pop() || "Project";
    let framework = "Unknown";
    let language = "JavaScript";

    let dependencies: string[] = [];
    let devDependencies: string[] = [];

    let hasTailwind = false;
    let hasDocker = false;
    let hasGit = false;
    let hasESLint = false;
    let hasPrettier = false;

    // -----------------------------
    // Language Detection
    // -----------------------------

    if (fileNames.includes("tsconfig.json")) {
        language = "TypeScript";
    }

    // -----------------------------
    // Framework Detection (Files)
    // -----------------------------

    if (
        fileNames.includes("next.config.js") ||
        fileNames.includes("next.config.ts")
    ) {
        framework = "Next.js";
    }

    if (
        fileNames.includes("vite.config.js") ||
        fileNames.includes("vite.config.ts")
    ) {
        framework = "Vite";
    }

    // -----------------------------
    // package.json Detection
    // -----------------------------

    if (hasPackageJson) {

        try {

            const packageUri = vscode.Uri.joinPath(folder, "package.json");

            const bytes = await vscode.workspace.fs.readFile(packageUri);

            const content = Buffer.from(bytes).toString("utf8");

            const packageJson = JSON.parse(content);

            if (packageJson.name) {
                projectName = packageJson.name;
            }

            dependencies = Object.keys(packageJson.dependencies || {});

            devDependencies = Object.keys(packageJson.devDependencies || {});

            // Framework
// Framework

if (
    packageJson.engines?.vscode ||
    devDependencies.includes("@types/vscode")
) {
    framework = "VS Code Extension";
}

if (dependencies.includes("react")) {
    framework = "React";
}

if (dependencies.includes("next")) {
    framework = "Next.js";
}

if (dependencies.includes("express")) {
    framework = "Express";
}

            // Language

         if (
    fileNames.includes("tsconfig.json") ||
    dependencies.includes("typescript") ||
    devDependencies.includes("typescript")
) {
    language = "TypeScript";
}

            // Extra Tools

            hasTailwind =
                dependencies.includes("tailwindcss") ||
                devDependencies.includes("tailwindcss");

            hasESLint =
                dependencies.includes("eslint") ||
                devDependencies.includes("eslint");

            hasPrettier =
                dependencies.includes("prettier") ||
                devDependencies.includes("prettier");

        } catch {

            console.log("Unable to read package.json");

        }

    }

    // -----------------------------
    // Docker Detection
    // -----------------------------

    hasDocker =
        fileNames.includes("Dockerfile") ||
        fileNames.includes("docker-compose.yml") ||
        fileNames.includes("docker-compose.yaml");

    // -----------------------------
    // Git Detection
    // -----------------------------

    hasGit = files.some(file => file[0] === ".git");

    // -----------------------------
    // Return
    // -----------------------------

    return {

        projectName,

        framework,

        language,

        hasReadme,

        hasLicense,

        hasGitignore,

        hasPackageJson,

        dependencies,

        devDependencies,

        hasTailwind,

        hasDocker,

        hasGit,

        hasESLint,

        hasPrettier

    };

}