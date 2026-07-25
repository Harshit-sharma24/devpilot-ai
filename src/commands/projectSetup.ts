import * as vscode from "vscode";
import { createReadme } from "./createReadme";
import { createGitignore } from "./createGitignore";

export async function projectSetup() {

    vscode.window.showInformationMessage(
        "Welcome to DevPilot AI Project Setup 🚀"
    );

    await createReadme();

    await createGitignore();

    vscode.window.showInformationMessage(
        "Project setup completed successfully! 🎉"
    );
}