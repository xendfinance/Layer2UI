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

export function GetWithdrawAmountPerFullShare(amount:any,pricePerFullShare:any){
    return BigInt(amount/pricePerFullShare * Math.pow(10, 18));
}

export function GetWithdrawAmountPerFullShareMaticUSDT(amount:any,pricePerFullShare:any){
    const res =  amount/pricePerFullShare; 
    return res;  
}
