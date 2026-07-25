import * as vscode from "vscode";

export async function createLicense() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return;
    }

    const licenseType = await vscode.window.showQuickPick(
        ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"],
        {
            placeHolder: "Select a License"
        }
    );

    if (!licenseType) {
        vscode.window.showWarningMessage("License selection cancelled.");
        return;
    }

    let licenseContent = "";

    switch (licenseType) {
        case "MIT":
            licenseContent = `MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.`;
            break;

        case "Apache-2.0":
            licenseContent = `Apache License
Version 2.0, January 2004

https://www.apache.org/licenses/LICENSE-2.0`;
            break;

        case "GPL-3.0":
            licenseContent = `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007`;
            break;

        case "BSD-3-Clause":
            licenseContent = `BSD 3-Clause License`;
            break;
    }

    const folderUri = workspaceFolders[0].uri;
    const licenseUri = vscode.Uri.joinPath(folderUri, "LICENSE");

    await vscode.workspace.fs.writeFile(
        licenseUri,
        Buffer.from(licenseContent, "utf8")
    );

    vscode.window.showInformationMessage("LICENSE created successfully!");
}