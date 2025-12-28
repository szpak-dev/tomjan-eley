/**
 * Get the base path for the current environment
 * Returns '/tomjan-eley' in GitHub Actions, '' locally
 */
export function getBasePath(): string {
    return process.env.GITHUB_ACTIONS ? '/tomjan-eley' : '';
}
