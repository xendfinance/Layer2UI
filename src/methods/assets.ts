import abiManager from "../abiManager";
import assetsLogo from "../assets/assetsLogo";

// TOKENS
const BUSD_BSC = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const USDC_BSC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const USDT_BSC = "0x55d398326f99059fF775485246999027B3197955";
const BNB_BSC = "";

const AAVE_MATIC = "0xd6df932a45c0f255f85145f286ea0b292b21c90b";
const WBTC_MATIC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
const USDT_MATIC = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDC_MATIC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";



export default [
	{
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xVault",
		protocolAddress: "0xF8604eE08c70389856242dF88b4CCA90a70733a7",
		protocolAbi: abiManager.xvVaultUSDT,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		availableFunds: "0.00",
		decimals: 18
	},
	{
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xVault",
		protocolAddress: "0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E",
		protocolAbi: abiManager.xvVaultBUSD,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		availableFunds: "0.00",
		decimals: 18
	},
	{
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xVault",
		protocolAddress: "0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a",
		protocolAbi: abiManager.xvVaultUSDC,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		availableFunds: "0.00",
		decimals: 18
	},



	{
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xAuto",
		protocolAddress: "0x525A55eBd9464c1081077BCc1d7a53C1c431BD26",
		protocolAbi: abiManager.xvAutoUSDT,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		availableFunds: "0.00",
		decimals: 18
	},



	{
		name: "WBTC",
		logo: assetsLogo.WBTC,
		tokenAddress: WBTC_MATIC,
		tokenAbi: abiManager.xvAutoWBTC,
		protocolName: "xAuto",
		protocolAddress: "0x5b208c6Ed9c95907DC7E1Ef34F0Cac52dd22b9dc",
		protocolAbi: abiManager.xvAutoWBTC,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		availableFunds: "0.00",
		decimals: 18
	}
]