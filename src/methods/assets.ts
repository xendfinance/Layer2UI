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

export interface Asset {
	name: string
	logo: any
	tokenAddress: string
	tokenAbi: any
	protocolName: string
	protocolAddress: string
	protocolAbi: any
	network: number
	balance: string
	apy: string
	tvl: string
	auditStatus: string
	smartContract: string
	availableFunds: string
	decimals: number
	widthdrawDecimals: number
	ppfsMethod: string
}

const assets: Asset[] = [

	// XVAULT BSC
	{
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xVault",
		protocolAddress: "0x40f3f93795dA825c5DD353e3850685ed8fFe3b55",
		protocolAbi: abiManager.xvVaultUSDT,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x40f3f93795dA825c5DD353e3850685ed8fFe3b55#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare'
	},
	{
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xVault",
		protocolAddress: "0xEef340100b77b1574147A30D11B2bD76b26eD19C",
		protocolAbi: abiManager.xvVaultBUSD,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xEef340100b77b1574147A30D11B2bD76b26eD19C#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare'
	},
	{
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xVault",
		protocolAddress: "0xe9629a6dcaaB278aAFDEf20cd85e94B7Bb93990c",
		protocolAbi: abiManager.xvVaultUSDC,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xe9629a6dcaaB278aAFDEf20cd85e94B7Bb93990c#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare'
	},


	// XAUTO BSC
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
		smartContract: "https://bscscan.com/address/0x525A55eBd9464c1081077BCc1d7a53C1c431BD26#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xAuto",
		protocolAddress: "0xa25dec88B81a94Ca951f3a4ff4AAbC32B3759E6C",
		protocolAbi: abiManager.xvAutoBSCBUSD,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xa25dec88B81a94Ca951f3a4ff4AAbC32B3759E6C#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		name: "BNB",
		logo: assetsLogo.BNB,
		tokenAddress: "",
		tokenAbi: abiManager.BNB,
		protocolName: "xAuto",
		protocolAddress: "0x2dABAeB84cACFEF30e95896301CEF65cb24b3176",
		protocolAbi: abiManager.xvAutoBSCBNB,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x2dABAeB84cACFEF30e95896301CEF65cb24b3176#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xAuto",
		protocolAddress: "0x3058d344C8F845754F0C356881772788c128eA22",
		protocolAbi: abiManager.xvAutoBSCUSDC,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x3058d344C8F845754F0C356881772788c128eA22#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},


	// POLYGON
	{
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_MATIC,
		tokenAbi: abiManager.USDTMatic,
		protocolName: "xAuto",
		protocolAddress: "0x6842E453ad9e7847a566876B8A2967FE9d155485",
		protocolAbi: abiManager.xvAutoUSDT,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0x6842E453ad9e7847a566876B8A2967FE9d155485#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 24,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_MATIC,
		tokenAbi: abiManager.USDCMatic,
		protocolName: "xAuto",
		protocolAddress: "0x418b8D697e72B90cBdF5Cb58015384b9016794F9",
		protocolAbi: abiManager.xvAutoUSDC,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0x418b8D697e72B90cBdF5Cb58015384b9016794F9#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 24,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		name: "AAVE",
		logo: assetsLogo.AAVE,
		tokenAddress: AAVE_MATIC,
		tokenAbi: abiManager.AAVEMatic,
		protocolName: "xAuto",
		protocolAddress: "0x0B12E60084816ed83c519a1fFd01022d5A50fcaC",
		protocolAbi: abiManager.xvAutoAAVE,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0x0B12E60084816ed83c519a1fFd01022d5A50fcaC#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
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
		smartContract: "https://polygonscan.com/address/0x5b208c6Ed9c95907DC7E1Ef34F0Cac52dd22b9dc#code",
		availableFunds: "0.00",
		decimals: 8,
		widthdrawDecimals: 26,
		ppfsMethod: 'getPricePerFullShare'
	}
]


export default assets;