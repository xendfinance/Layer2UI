import { ConsoleSqlOutlined } from "@ant-design/icons";
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
		let apyRes = {
			"apy": null,
			"apyXVault": null
		}

		switch (id) {
			case "56-XVAULT-USDT":
				apyRes.apyXVault = await getXVaultAPIUSDT();
				if (apyRes) {
					return apyRes;
				} else break;

			case "56-XVAULT-USDC":
				apyRes.apyXVault = await getXVaultAPIUSDC();
				if (apyRes) {
					return apyRes;
				} else break;

			case "56-XVAULT-BUSD":
				apyRes.apyXVault = await getXVaultAPIBUSD();
				if (apyRes) {
					return apyRes;
				} else break;


			// BSC xAUTO
			case "56-XAUTO-BUSD":
				apyRes.apy = await getAPRBUSDXAutoBSC();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "56-XAUTO-BNB":
				apyRes.apy = await getAPRBNBXAutoBSC();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "56-XAUTO-USDC":
				apyRes.apy = await getAPRUSDCXAutoBSC();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "56-XAUTO-USDT":
				apyRes.apy = await getAPRUSDTXAutoBSC();
				if (apyRes.apy) {
					return apyRes;
				} else break;


			// POLYGON
			case "137-XAUTO-USDC":
				apyRes.apy = await getAPRUSDCMatic();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "137-XAUTO-AAVE":
				apyRes.apy = await getAPRAAVEMatic();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "137-XAUTO-USDT":
				apyRes.apy = await getAPRUSDTMatic();
				if (apyRes.apy) {
					return apyRes;
				} else break;

			case "137-XAUTO-WBTC":
				apyRes.apy = await getAPRWBTCMatic();
				if (apyRes.apy) {
					return apyRes;
				} else break;



			default:
				return apyRes;
		}

	} catch (e) {
		console.error(e);
		let apyRes = {
			"apy": null,
			"apyXVault": null
		}
		return apyRes;
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