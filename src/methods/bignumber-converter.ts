export function toBigNumber(amount: number) {
    return BigInt(amount * Math.pow(10, 18));
}

export function toBigVenusNumber(amount: number) {
    return BigInt(amount * Math.pow(10, 8));
}

export function fromBigNumber(amount: any) {
    return amount * Math.pow(10, -18);
}

export function fromBigVenusNumber(amount: number) {
    return amount * Math.pow(10, -8);
}
