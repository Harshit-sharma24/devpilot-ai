import * as vscode from "vscode";

export async function createPackageJson() {

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return;
    }

    const projectName = await vscode.window.showInputBox({
        title: "Package.json",
        prompt: "Project Name",
        placeHolder: "my-awesome-app"
    });

    if (!projectName) {
        vscode.window.showWarningMessage("Project name is required!");
        return;

    }
    const projectType = await vscode.window.showQuickPick(
    [
        "Node.js",
        "Express",
        "React",
        "Next.js",
        "Vite"
    ],
    {
        title: "Project Type",
        placeHolder: "Select your project type"
    }
);

if (!projectType) {
    vscode.window.showWarningMessage("Project type is required!");
    return;
}

    const description = await vscode.window.showInputBox({
        prompt: "Project Description",
        placeHolder: "A modern Node.js project"
    });

    const author = await vscode.window.showInputBox({
        prompt: "Author Name",
        placeHolder: "Harshit Sharma"
    });

    const license = await vscode.window.showQuickPick(
        ["MIT", "Apache-2.0", "GPL-3.0", "ISC"],
        {
            placeHolder: "Choose License"
        }
    );
    let mainFile = "index.js";

let scripts: { [key: string]: string } = {};

switch (projectType) {

    case "Node.js":
        mainFile = "index.js";

        scripts = {
            start: "node index.js"
        };
        break;

    case "Express":
        mainFile = "src/index.js";

        scripts = {
            dev: "nodemon src/index.js",
            start: "node src/index.js"
        };
        break;

    case "React":
        mainFile = "src/index.tsx";

        scripts = {
            start: "react-scripts start",
            build: "react-scripts build",
            test: "react-scripts test"
        };
        break;

    case "Next.js":
        mainFile = "index.js";

        scripts = {
            dev: "next dev",
            build: "next build",
            start: "next start"
        };
        break;

    case "Vite":
        mainFile = "src/main.ts";

        scripts = {
            dev: "vite",
            build: "vite build",
            preview: "vite preview"
        };
        break;
}

    const packageContent = {
        name: projectName.toLowerCase().replace(/\s+/g, "-"),
        version: "1.0.0",
        description: description || "",
      main: mainFile,

scripts: scripts,
        keywords: [],
        author: author || "",
        license: license || "MIT"
    };

    const folderUri = workspaceFolders[0].uri;

    const packageUri = vscode.Uri.joinPath(folderUri, "package.json");

    await vscode.workspace.fs.writeFile(
        packageUri,
        Buffer.from(JSON.stringify(packageContent, null, 2), "utf8")
    );

    vscode.window.showInformationMessage("package.json created successfully! 📦");
}