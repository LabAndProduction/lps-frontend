export function formatFileSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) return "0 Б";

    const kb = bytes / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
        return `${mb.toFixed(2)} МБ`;
    }

    if (kb >= 1) {
        return `${kb.toFixed(2)} КБ`;
    }

    return `${bytes} Б`;
}
