import * as vscode from "vscode";

export async function createReadme() {

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return;
    }

    const projectName = await vscode.window.showInputBox({
        title: "Project Name",
        prompt: "Enter your project name",
        placeHolder: "Expense Tracker"
    });

    if (!projectName) {
        vscode.window.showWarningMessage("Project name is required!");
        return;
    }

    const readmeContent = `# ${projectName}

## Description
Write your project description here.

## Features

- Feature 1
- Feature 2

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Author

DevPilot AI
`;

    const readmeUri = vscode.Uri.joinPath(
        workspaceFolders[0].uri,
        "README.md"
    );

    await vscode.workspace.fs.writeFile(
        readmeUri,
        Buffer.from(readmeContent, "utf8")
    );

    vscode.window.showInformationMessage("README.md created successfully!");
}