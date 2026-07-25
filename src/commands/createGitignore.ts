import * as vscode from "vscode";

export async function createGitignore() {

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return;
    }

    const option = await vscode.window.showQuickPick(
        [
            "Node.js",
            "React",
            "Express",
            "Next.js",
            "Python"
        ],
        {
            title: "Select Project Type",
            placeHolder: "Choose your project type"
        }
    );

    if (!option) {
        return;
    }

    let content = "";

    switch (option) {

        case "Node.js":
        case "Express":
            content = `node_modules
.env
dist
coverage
*.log`;
            break;

        case "React":
            content = `node_modules
build
.env
*.log`;
            break;

        case "Next.js":
            content = `.next
node_modules
.env
*.log`;
            break;

        case "Python":
            content = `__pycache__
*.pyc
.env
venv`;
            break;

        default:
            content = "";
    }

    const gitignoreUri = vscode.Uri.joinPath(
        workspaceFolders[0].uri,
        ".gitignore"
    );

    await vscode.workspace.fs.writeFile(
        gitignoreUri,
        Buffer.from(content, "utf8")
    );

    vscode.window.showInformationMessage(".gitignore created successfully!");
}