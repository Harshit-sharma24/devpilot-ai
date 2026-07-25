import * as vscode from "vscode";
import { scanProject } from "../services/projectScanner";
import { createReadme } from "./createReadme";
import { createGitignore } from "./createGitignore";
import { createLicense } from "./createLicense";

export async function fixProject() {

    const info = await scanProject();

    if (!info) {
        return;
    }

    let fixed = 0;

    if (!info.hasReadme) {
        await createReadme();
        fixed++;
    }

    if (!info.hasGitignore) {
        await createGitignore();
        fixed++;
    }

    if (!info.hasLicense) {
        await createLicense();
        fixed++;
    }

    if (fixed === 0) {
        vscode.window.showInformationMessage(
            "🎉 Your project is already healthy!"
        );
        return;
    }

    vscode.window.showInformationMessage(
        `✅ Fixed ${fixed} project issue(s).`
    );

}