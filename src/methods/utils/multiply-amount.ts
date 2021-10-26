import { getCurrentProtocol } from "./protocol-settings";

function toBigNumber(amount: number) {
    return BigInt(amount * Math.pow(10, 18));
}

function toBigNumberMatic(amount: number) {
    return BigInt(amount * Math.pow(10, 6));
}

function toBigNumberWBTC(amount: number) {
    return BigInt(amount * Math.pow(10, 8));
}




function toBigVenusNumber(amount: number) {
    let activeProtocol = getCurrentProtocol();
    if (activeProtocol === 'venus') {
        amount = Math.round(amount * Math.pow(10, 8));
        return BigInt(amount);
    } else {
        return BigInt(amount * Math.pow(10, 18));
    }
}

function fromBigNumber(amount: number) {
    return amount * Math.pow(10, -18);
}
function fromBigVenusNumber(amount: number) {
    let activeProtocol = getCurrentProtocol();
    if (activeProtocol === 'venus') {
        return amount * Math.pow(10, -8);
    } else {
        return amount * Math.pow(10, -18);
    }
}

export { toBigNumber, fromBigNumber, toBigVenusNumber, fromBigVenusNumber,toBigNumberMatic,toBigNumberWBTC };
