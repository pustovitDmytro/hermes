export function parseRawInput(raw) {
    const [ amount, symbol ] = raw.trim().split(/\s+/);

    return { amount, symbol };
}
