import { bscTokenBalance, polygonTokenBalance, xAutoBSCUserBalance, xAutoMATICUserBalance, xVaultUserBalance } from "./get-balances";
import { xAutoBSCTvl, xAutoMATICTvl, xVaultBSCTvl } from "./get-tvl";
import { getAPRAAVEMatic, getAPRBNBXAutoBSC, getAPRBUSDXAutoBSC, getAPRUSDCMatic, getAPRUSDCXAutoBSC, getAPRUSDTMatic, getAPRUSDTXAutoBSC, getAPRWBTCMatic, getXVaultAPIBUSD, getXVaultAPIUSDC, getXVaultAPIUSDT } from "./redux/actions/get-apy-xvault";
import _const from "./_const";


interface IHydrateTvl {
	network: number
	abi: any
	address: string
	protocol: string
	tokenName: string
}

export const hydrateTvl = async ({
	network,
	abi,
	protocol,
	tokenName,
	address
}: IHydrateTvl) => {
	try {

		if (network === 56 && protocol === 'xVault') {
			let tvl = await xVaultBSCTvl(abi, address);
			if (tvl) return tvl;
		}

		if (network === 56 && protocol === 'xAuto') {
			let tvl = await xAutoBSCTvl(abi, address, tokenName);
			if (tvl) return tvl;
		}

		if (network === 137) {
			let tvl = await xAutoMATICTvl(abi, address, tokenName);
			if (tvl) return tvl;
		}

	} catch (e) {
		console.error(e);
		return null
	}
}

interface IHydrateUsersProtocolBalance {
	network: number
	abi: any
	protocol: string
	protocolAddress: string
	user: string
	tokenName: string
}
export const hydrateUsersProtocolBalance = async ({
	network,
	abi,
	protocol,
	user,
	protocolAddress,
	tokenName
}: IHydrateUsersProtocolBalance) => {

	try {

		if (
			network === 56 &&
			protocol === 'xVault') {
			let balance = await xVaultUserBalance(abi, protocolAddress, user)
			return balance;
		}

		if (
			network === 56 &&
			protocol === 'xAuto') {
			let balance = await xAutoBSCUserBalance(abi, protocolAddress, user)
			return balance;
		}

		if (network === 137) {
			let balance = await xAutoMATICUserBalance(abi, protocolAddress, user, tokenName);
			return balance;
		}

	} catch (e) {
		console.error(e);
		return null
	}
}



interface IHydrateTokenBalance {
	tokenName: string
	network: number
	abi: any
	tokenAddress: string
	user: string
}
export const hydrateTokenBalance = async ({
	network,
	tokenName,
	abi,
	tokenAddress,
	user
}: IHydrateTokenBalance) => {
	try {

		if (network === 56) {
			let balance = await bscTokenBalance(tokenName, abi, tokenAddress, user)
			return balance;
		}


		if (network === 137) {
			let balance = await polygonTokenBalance(tokenName, abi, tokenAddress, user)
			return balance;
		}

	} catch (e) {
		console.error(e);
		return null
	}
}



interface IHydrateApy {
	network: number
	protocol: string
	tokenName: string
}
export const hydrateApy = async ({ network, protocol, tokenName }: IHydrateApy) => {
	try {

		const id = `${network}-${protocol}-${tokenName}`.toUpperCase();
		let apy = null

		switch (id) {
			case "56-XVAULT-USDT":
				apy = await getXVaultAPIUSDT();
				if (apy) {
					return apy;
				} else break;

			case "56-XVAULT-USDC":
				apy = await getXVaultAPIUSDC();
				if (apy) {
					return apy;
				} else break;

			case "56-XVAULT-BUSD":
				apy = await getXVaultAPIBUSD();
				if (apy) {
					return apy;
				} else break;


			// BSC xAUTO
			case "56-XAUTO-BUSD":
				apy = await getAPRBUSDXAutoBSC();
				if (apy) {
					return apy;
				} else break;

			case "56-XAUTO-BNB":
				apy = await getAPRBNBXAutoBSC();
				if (apy) {
					return apy;
				} else break;

			case "56-XAUTO-USDC":
				apy = await getAPRUSDCXAutoBSC();
				if (apy) {
					return apy;
				} else break;

			case "56-XAUTO-USDT":
				apy = await getAPRUSDTXAutoBSC();
				if (apy) {
					return apy;
				} else break;


			// POLYGON
			case "137-XAUTO-USDC":
				apy = await getAPRUSDCMatic();
				if (apy) {
					return apy;
				} else break;

			case "137-XAUTO-AAVE":
				apy = await getAPRAAVEMatic();
				if (apy) {
					return apy;
				} else break;

			case "137-XAUTO-USDT":
				apy = await getAPRUSDTMatic();
				if (apy) {
					return apy;
				} else break;

			case "137-XAUTO-WBTC":
				apy = await getAPRWBTCMatic();
				if (apy) {
					return apy;
				} else break;



			default:
				return 0;
		}

	} catch (e) {
		console.error(e);
		return 0;
	}
}



export const rehydrateVault = () => {
	return (dispatch: Function) => {
		setTimeout(() => {
			dispatch({
				type: _const.REHYDRATE_VAULT,
			})
		}, 1500)
	}
}