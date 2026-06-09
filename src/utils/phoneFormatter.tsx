export function phoneFormatter(value: string) {
    const digits = value.replace(/\D/g, "");

    if (!digits) return "";

    // Uzbekistan
    if (digits.startsWith("998")) {
        return formatUzPhone(digits);
    }

    // Russia: +7... или 8...
    if (digits.startsWith("7") || digits.startsWith("8")) {
        return formatRuPhone(digits);
    }

    // Uzbekistan local: 90 123 45 67, 99 123 45 67 и т.д.
    if (digits.length <= 9) {
        return formatUzPhone(`998${digits}`);
    }

    return `+${digits}`;
}

function formatUzPhone(digits: string) {
    const normalized = digits.startsWith("998") ? digits : `998${digits}`;

    const country = normalized.slice(0, 3);
    const code = normalized.slice(3, 5);
    const part1 = normalized.slice(5, 8);
    const part2 = normalized.slice(8, 10);
    const part3 = normalized.slice(10, 12);

    let result = `+${country}`;

    if (code) result += ` (${code}`;
    if (code.length === 2) result += ")";
    if (part1) result += ` ${part1}`;
    if (part2) result += `-${part2}`;
    if (part3) result += `-${part3}`;

    return result;
}

function formatRuPhone(digits: string) {
    const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;

    const country = normalized.slice(0, 1);
    const code = normalized.slice(1, 4);
    const part1 = normalized.slice(4, 7);
    const part2 = normalized.slice(7, 9);
    const part3 = normalized.slice(9, 11);

    let result = `+${country}`;

    if (code) result += ` (${code}`;
    if (code.length === 3) result += ")";
    if (part1) result += ` ${part1}`;
    if (part2) result += `-${part2}`;
    if (part3) result += `-${part3}`;

    return result;
}
