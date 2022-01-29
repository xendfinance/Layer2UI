import abiManager from "../abiManager";
import assetsLogo from "../assets/assetsLogo";

// TOKENS
const BUSD_BSC = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const USDC_BSC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const USDT_BSC = "0x55d398326f99059fF775485246999027B3197955";

const AAVE_MATIC = "0xd6df932a45c0f255f85145f286ea0b292b21c90b";
const WBTC_MATIC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
const USDT_MATIC = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDC_MATIC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

interface Strategy {
	name: string
	code: string
}
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
	previousProtocol?: string
	strategy?: Strategy
	deprecated?: boolean
	version?: string
}

const assets: Asset[] = [

	// XVAULT BSC
	{
		version:"V2",
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xVault",
		protocolAddress: "0x454d6F10B18f391adD499cE39aCD5bFCD424B601",
		protocolAbi: abiManager.xvVaultUSDTV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x454d6F10B18f391adD499cE39aCD5bFCD424B601#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0xcF2E6928EeD4399Ac6664b84D068050cBF24B475",
		strategy: {
			name: "Strategy UgoHawkVenusUSDTFarm v4",
			code: "https://bscscan.com/address/0x0D87591801E26F516000a659aCc5417D6772a85D#code"
		}
	},
	{
		version:"V2",
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xVault",
		protocolAddress: "0x3de1Fe0039EC99773DBEE5608823FECDeFB8D9D0",
		protocolAbi: abiManager.xvVaultBUSDV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x3de1Fe0039EC99773DBEE5608823FECDeFB8D9D0#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0x0b20d359204221DC850f2Af7fc88A38812eA8Fd5",
		strategy: {
			name: "Strategy UgoHawkVenusBUSDFarm v4",
			code: "https://bscscan.com/address/0x6B6209192443221FE137Fb30E4363FC737D3C4d6#code"
		}
	},
	{
		version:"V2",
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xVault",
		protocolAddress: "0x50c9fBf77CBC8FF1b23a8ED61725C325bedC3C86",
		protocolAbi: abiManager.xvVaultUSDCV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x50c9fBf77CBC8FF1b23a8ED61725C325bedC3C86#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0x1973C8D13B02934c13593590940F9BEDbbECc41f",
		strategy: {
			name: "Strategy UgoHawkVenusUSDCFarm v4",
			code: "https://bscscan.com/address/0xDA2969621B5c8bcEa32712455051AEf4f066F6a1#code"
		}
	},
	{
		version:"V1",
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xVault",
		protocolAddress: "0xcF2E6928EeD4399Ac6664b84D068050cBF24B475",
		protocolAbi: abiManager.xvVaultUSDT,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xcF2E6928EeD4399Ac6664b84D068050cBF24B475#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0xF8604eE08c70389856242dF88b4CCA90a70733a7",
		strategy: {
			name: "Strategy UgoHawkVenusUSDTFarm v4",
			code: "https://bscscan.com/address/0x4bA58C32b994164218BC6a8A76107dcE6d374e07#code"
		}
	},	
	{
		version:"V1",
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xVault",
		protocolAddress: "0x0b20d359204221DC850f2Af7fc88A38812eA8Fd5",
		protocolAbi: abiManager.xvVaultBUSD,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x0b20d359204221DC850f2Af7fc88A38812eA8Fd5#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E",
		strategy: {
			name: "Strategy UgoHawkVenusBUSDFarm v4",
			code: "https://bscscan.com/address/0x964407337aA2b8D2aB96B596651Ba9F5F53c4035#code"
		}
	},	
	{
		version:"V1",
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xVault",
		protocolAddress: "0x1973C8D13B02934c13593590940F9BEDbbECc41f",
		protocolAbi: abiManager.xvVaultUSDC,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x1973C8D13B02934c13593590940F9BEDbbECc41f#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a",
		strategy: {
			name: "Strategy UgoHawkVenusUSDCFarm v4",
			code: "https://bscscan.com/address/0x16911E3d5354725349C355EA0d24Fc6845Aa13Eb#code"
		}
	},
	{
		version:"V1",
		deprecated: true,
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
		smartContract: "https://bscscan.com/address/0xF8604eE08c70389856242dF88b4CCA90a70733a7#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		strategy: {
			name: "Strategy UgoHawkVenusUSDTFarm v3",
			code: "https://bscscan.com/address/0x9Ba4A8C5CE226A1daC42B9D2ba5bFe62eF545Fc9#code"
		}
	},
	{
		version:"V1",
		deprecated: true,
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
		smartContract: "https://bscscan.com/address/0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		previousProtocol: "",
		strategy: {
			name: "Strategy UgoHawkVenusBUSDFarm v2",
			code: "https://bscscan.com/address/0x7D6E27AbAd389F09535ba4c15719f5f16DBDc3Fc#code"
		}
	},
	{
		version:"V1",
		deprecated: true,
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
		smartContract: "https://bscscan.com/address/0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'pricePerShare',
		strategy: {
			name: "Strategy UgoHawkVenusUSDCFarm v2",
			code: "https://bscscan.com/address/0x998d139B7e9Ce5e98741aD75305fE6f2D81Aa2D9#code"
		}
	},


	// XAUTO BSC
	{
		version:"V2",
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xAuto",
		protocolAddress: "0x9607be08acFeB47Ea7e66b494Dd5dAb88Dda59cf",
		protocolAbi: abiManager.xvAutoBSCUSDTV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x9607be08acFeB47Ea7e66b494Dd5dAb88Dda59cf#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "BUSD",
		logo: assetsLogo.BUSD,
		tokenAddress: BUSD_BSC,
		tokenAbi: abiManager.BUSD,
		protocolName: "xAuto",
		protocolAddress: "0x0f28698FD6A0771CB099482305BeEd0EeCB458D5",
		protocolAbi: abiManager.xvAutoBSCBUSDV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x0f28698FD6A0771CB099482305BeEd0EeCB458D5#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "BNB",
		logo: assetsLogo.BNB,
		tokenAddress: "",
		tokenAbi: abiManager.BNB,
		protocolName: "xAuto",
		protocolAddress: "0x8C709c792700d73e37D8B0A4CD3bcc995d03f084",
		protocolAbi: abiManager.xvAutoBSCBNBV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0x8C709c792700d73e37D8B0A4CD3bcc995d03f084#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_BSC,
		tokenAbi: abiManager.USDC,
		protocolName: "xAuto",
		protocolAddress: "0xa3003c67C0C8fF2280b282F0A821e95fEBA47293",
		protocolAbi: abiManager.xvAutoBSCUSDCV2,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xa3003c67C0C8fF2280b282F0A821e95fEBA47293#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V1",
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_BSC,
		tokenAbi: abiManager.USDT,
		protocolName: "xAuto",
		protocolAddress: "0xCfD45F5Fc42aFc63Fa9fcBfc21E640A00c5B7Ba3",
		protocolAbi: abiManager.xvAutoUSDT,
		network: 56,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://bscscan.com/address/0xCfD45F5Fc42aFc63Fa9fcBfc21E640A00c5B7Ba3#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},	
	{
		version:"V1",
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
		version:"V1",
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
		version:"V1",
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
	{
		version:"V1",
		deprecated: true,
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


	// POLYGON
	{
		version:"V2",
		name: "USDT",
		logo: assetsLogo.USDT,
		tokenAddress: USDT_MATIC,
		tokenAbi: abiManager.USDTMatic,
		protocolName: "xAuto",
		protocolAddress: "0x143afc138978Ad681f7C7571858FAAA9D426CecE",
		protocolAbi: abiManager.xvAutoUSDTV2,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0x143afc138978Ad681f7C7571858FAAA9D426CecE#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 24,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "USDC",
		logo: assetsLogo.USDC,
		tokenAddress: USDC_MATIC,
		tokenAbi: abiManager.USDCMatic,
		protocolName: "xAuto",
		protocolAddress: "0xd01a0971F03D0ddC8D621048d92A1632b2dB7356",
		protocolAbi: abiManager.xvAutoUSDCV2,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0xd01a0971F03D0ddC8D621048d92A1632b2dB7356#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 24,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "AAVE",
		logo: assetsLogo.AAVE,
		tokenAddress: AAVE_MATIC,
		tokenAbi: abiManager.AAVEMatic,
		protocolName: "xAuto",
		protocolAddress: "0xDD3afc5D5476FC327812B84ae2ccf66C011e6d67",
		protocolAbi: abiManager.xvAutoAAVEV2,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0xDD3afc5D5476FC327812B84ae2ccf66C011e6d67#code",
		availableFunds: "0.00",
		decimals: 18,
		widthdrawDecimals: 36,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V2",
		name: "WBTC",
		logo: assetsLogo.WBTC,
		tokenAddress: WBTC_MATIC,
		tokenAbi: abiManager.WBTCMatic,
		protocolName: "xAuto",
		protocolAddress: "0x0b26E76D8617b20Ec9fe0811BE2dCbF3438cc27F",
		protocolAbi: abiManager.xvAutoWBTCV2,
		network: 137,
		balance: "0.00",
		apy: "0.00",
		tvl: "0.00",
		auditStatus: "audited",
		smartContract: "https://polygonscan.com/address/0x0b26E76D8617b20Ec9fe0811BE2dCbF3438cc27F#code",
		availableFunds: "0.00",
		decimals: 8,
		widthdrawDecimals: 26,
		ppfsMethod: 'getPricePerFullShare'
	},
	{
		version:"V1",
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
		version:"V1",
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
		version:"V1",
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
		version:"V1",
		name: "WBTC",
		logo: assetsLogo.WBTC,
		tokenAddress: WBTC_MATIC,
		tokenAbi: abiManager.WBTCMatic,
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