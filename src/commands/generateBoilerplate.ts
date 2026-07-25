import * as vscode from "vscode";

export async function generateBoilerplate() {

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder is open!");
        return;
    }

    const type = await vscode.window.showQuickPick(
        [
            "React Component",
            "Express Route",
            "Express Controller",
            "Express Model",
            "Next.js Page"
        ],
        {
            placeHolder: "Select Boilerplate"
        }
    );

    if (!type) {
        return;
    }

    const name = await vscode.window.showInputBox({
        prompt: "File Name"
    });

    if (!name) {
        return;
    }

    const folder = workspaceFolders[0].uri;

    let fileName = "";
    let content = "";

    switch (type) {

        case "React Component":

            fileName = `${name}.tsx`;

            content = `type Props = {};

export default function ${name}(props: Props) {
    return (
        <div>
            ${name}
        </div>
    );
}
`;

            break;

        case "Express Route":

            fileName = `${name}.routes.js`;

            content = `const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.send("${name} Route");

});

module.exports = router;
`;

            break;

        case "Express Controller":

            fileName = `${name}.controller.js`;

            content = `exports.index = async (req, res) => {

    res.json({
        message: "${name} Controller"
    });

};
`;

            break;

        case "Express Model":

            fileName = `${name}.model.js`;

            content = `module.exports = {

};
`;

            break;

        case "Next.js Page":

            fileName = `${name}.tsx`;

            content = `export default function ${name}() {

    return (
        <div>
            ${name}
        </div>
    );

}
`;

            break;
    }

    const fileUri = vscode.Uri.joinPath(folder, fileName);

    await vscode.workspace.fs.writeFile(
        fileUri,
        Buffer.from(content)
    );

    vscode.window.showInformationMessage(
        `${type} created successfully 🚀`
    );
}