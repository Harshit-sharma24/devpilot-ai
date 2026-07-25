import { ProjectInfo } from "./projectScanner";

export interface HealthResult {
    score: number;
    grade: string;
}

export function calculateHealth(
    info: ProjectInfo
): HealthResult {

    let score = 0;

    // ==========================
    // Project Files
    // ==========================

    if (info.hasPackageJson) score += 10;
    if (info.hasReadme) score += 10;
    if (info.hasGitignore) score += 10;
    if (info.hasLicense) score += 10;

    // ==========================
    // Framework & Language
    // ==========================

    if (info.framework !== "Unknown") score += 15;
    if (info.language === "TypeScript") score += 10;

    // ==========================
    // Dependencies
    // ==========================

    if (info.dependencies.length > 0) score += 10;
    if (info.devDependencies.length > 0) score += 10;

    // ==========================
    // Project Tools
    // ==========================

    if (info.hasGit) score += 5;
    if (info.hasDocker) score += 5;
    if (info.hasESLint) score += 5;
    if (info.hasPrettier) score += 5;
    if (info.hasTailwind) score += 5;

    // Maximum 100
    if (score > 100) {
        score = 100;
    }

    let grade = "F";

    if (score >= 95) {
        grade = "A+";
    } else if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else if (score >= 70) {
        grade = "C";
    } else if (score >= 60) {
        grade = "D";
    }

    return {
        score,
        grade
    };
}