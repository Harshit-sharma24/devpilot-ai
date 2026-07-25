import * as vscode from "vscode";

import { createReadme } from "./commands/createReadme";
import { createGitignore } from "./commands/createGitignore";
import { projectSetup } from "./commands/projectSetup";
import { createLicense } from "./commands/createLicense";
import { createPackageJson } from "./commands/createPackageJson";
import { analyzeProject } from "./commands/analyzeProject";
import { generateBoilerplate } from "./commands/generateBoilerplate";
import { fixProject } from "./commands/fixProject";
import { smartReadme } from "./commands/smartReadme";

export function activate(context: vscode.ExtensionContext) {

    console.log("DevPilot AI Activated!");

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "devpilot-ai.createReadme",
            createReadme
        )
    );

    context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.createLicense",
        createLicense
    )
);
context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.generateBoilerplate",
        generateBoilerplate
    )
);
context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.smartReadme",
        smartReadme
    )
);

context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.fixProject",
        fixProject
    )
);

context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.analyzeProject",
        analyzeProject
    )
);
context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.createPackageJson",
        createPackageJson
    )
);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "devpilot-ai.createGitignore",
            createGitignore
        )
    );

	context.subscriptions.push(
    vscode.commands.registerCommand(
        "devpilot-ai.projectSetup",
        projectSetup
    )
);
}

export function deactivate() {}