import { bscTokenBalance, xAutoBSCUserBalance, xAutoMATICUserBalance, xVaultUserBalance } from "./get-balances";
import { xAutoBSCTvl, xAutoMATICTvl, xVaultBSCTvl } from "./get-tvl";


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
		console.log('came to calc')
		if (network === 56 && protocol === 'xVault') {
			let tvl = await xVaultBSCTvl(abi, address);
			if (tvl) return tvl;
		}

		if (network === 56 && protocol === 'xAuto') {
			let tvl = await xAutoBSCTvl(abi, address, tokenName);
			if (tvl) return tvl;
		}

		if (network === 137) {
			let tvl = await xAutoMATICTvl(abi, address);
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
}
export const hydrateUsersProtocolBalance = async ({
	network, abi, protocol, user, protocolAddress
}: IHydrateUsersProtocolBalance) => {
	try {

		if (network === 56 && protocol === 'xVault') {
			let balance = await xVaultUserBalance(abi, protocolAddress, user)
			return balance;
		}

		if (network === 56 && protocol === 'xAuto') {
			let balance = await xAutoBSCUserBalance(abi, protocolAddress, user)
			return balance;
		}

		if (network === 137) {
			let balance = await xAutoMATICUserBalance(abi, protocolAddress, user);
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
			let balance = await bscTokenBalance(tokenName, abi, tokenAddress, user)
			return balance;
		}

	} catch (e) {
		console.error(e);
		return null
	}
}