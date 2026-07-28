export function getApiBaseUrl(codespaceName = process.env.CODESPACE_NAME, port = 8000) {
    const normalizedName = typeof codespaceName === 'string' ? codespaceName.trim() : '';
    if (normalizedName && !normalizedName.includes('localhost')) {
        return `https://${normalizedName}-${port}.app.github.dev`;
    }
    return `http://localhost:${port}`;
}
