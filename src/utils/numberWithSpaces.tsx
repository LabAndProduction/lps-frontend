export function numberWithSpaces(value: string, pattern: string) {
    let i: number = 0;
    const phone: string = value ? value.toString() : "";
    return pattern.replace(/#/g, () => phone[i++]);
}
