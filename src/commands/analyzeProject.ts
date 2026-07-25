import * as vscode from "vscode";
import { scanProject } from "../services/projectScanner";
import { calculateHealth } from "../services/healthScore";

export async function analyzeProject() {

    const info = await scanProject();

    if (!info) {
        return;
    }

    const health = calculateHealth(info);

    let report = "";

    // ===========================
    // Health
    // ===========================

    report += "# ⭐ Project Health\n\n";
    report += `Score : ${health.score}/100\n`;
    report += `Grade : ${health.grade}\n\n`;

    // ===========================
    // Basic Info
    // ===========================

    report += "# 📊 Project Analysis\n\n";

    report += `Project : ${info.projectName}\n`;
    report += `Framework : ${info.framework}\n`;
    report += `Language : ${info.language}\n\n`;

    // ===========================
    // Files
    // ===========================

    report += "## 📁 Files\n\n";

    report += `README : ${info.hasReadme ? "✅ Present" : "❌ Missing"}\n`;
    report += `LICENSE : ${info.hasLicense ? "✅ Present" : "❌ Missing"}\n`;
    report += `.gitignore : ${info.hasGitignore ? "✅ Present" : "❌ Missing"}\n`;
    report += `package.json : ${info.hasPackageJson ? "✅ Present" : "❌ Missing"}\n\n`;

    // ===========================
    // Dependencies
    // ===========================

    report += "## 📦 Dependencies\n\n";

    if (info.dependencies.length === 0) {

        report += "No dependencies found.\n";

    } else {

        info.dependencies.forEach(dep => {

            report += `• ${dep}\n`;

        });

    }

    report += "\n";

    // ===========================
    // Dev Dependencies
    // ===========================

    report += "## 🛠 Dev Dependencies\n\n";

    if (info.devDependencies.length === 0) {

        report += "No dev dependencies found.\n";

    } else {

        info.devDependencies.forEach(dep => {

            report += `• ${dep}\n`;

        });

    }

    report += "\n";

    // ===========================
    // Project Tools
    // ===========================

    report += "## ⚙ Project Tools\n\n";

    report += `Git : ${info.hasGit ? "✅ Present" : "❌ Missing"}\n`;
    report += `Docker : ${info.hasDocker ? "✅ Present" : "❌ Missing"}\n`;
    report += `Tailwind CSS : ${info.hasTailwind ? "✅ Present" : "❌ Missing"}\n`;
    report += `ESLint : ${info.hasESLint ? "✅ Present" : "❌ Missing"}\n`;
    report += `Prettier : ${info.hasPrettier ? "✅ Present" : "❌ Missing"}\n\n`;

    // ===========================
    // Suggestions
    // ===========================

    report += "## 💡 Suggestions\n\n";

    let hasSuggestion = false;

    if (!info.hasReadme) {

        report += "• Add a README.md\n";
        hasSuggestion = true;

    }

    if (!info.hasLicense) {

        report += "• Add a LICENSE\n";
        hasSuggestion = true;

    }

    if (!info.hasGitignore) {

        report += "• Add a .gitignore\n";
        hasSuggestion = true;

    }

    if (!info.hasDocker) {

        report += "• Consider adding Docker support.\n";
        hasSuggestion = true;

    }

    if (!info.hasGit) {

        report += "• Initialize a Git repository.\n";
        hasSuggestion = true;

    }

    if (!info.hasESLint) {

        report += "• Add ESLint for better code quality.\n";
        hasSuggestion = true;

    }

    if (!info.hasPrettier) {

        report += "• Add Prettier for automatic code formatting.\n";
        hasSuggestion = true;

    }

    if (info.framework === "Unknown") {

        report += "• Framework could not be detected.\n";
        hasSuggestion = true;

    }

    if (info.dependencies.length === 0) {

        report += "• No dependencies found.\n";
        hasSuggestion = true;

    }

    if (!hasSuggestion) {

        report += "🎉 Excellent project setup! No suggestions.\n";

    }

    // ===========================
    // Show Report
    // ===========================

    vscode.window.showInformationMessage("Project Analysis Completed!");

    const doc = await vscode.workspace.openTextDocument({

        language: "markdown",
        content: report

    });

    vscode.window.showTextDocument(doc);

}