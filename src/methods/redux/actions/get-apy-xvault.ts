
import reduxStore from "..";
import abiManager from "../../../abiManager";
import _const from "../../_const";
import { getXVaultAPIUSDTV2 } from "./get-highest-apy";


//import exposedWeb3 from "../../../methods/contracts/exposedWeb3";
const Web3 = require('web3');
const BigNumber = require('bignumber.js');

// const { formatUnits } = require('@ethersproject/units');
// const { Zero } = require('@ethersproject/constants');
const vUsdtAbi = require('../../contracts/xvault/abis/vUsdtAbi.json');
const vBUSDAbi = require('../../contracts/xvault/abis/vBusd.abi.json');
const vUSDCAbi = require('../../contracts/xvault/abis/vUsdcABI.json');
const unitrollerAbi = require('../../contracts/xvault/abis/Unitroller.abi.json');

const vUsdtAddress = "0xfd5840cd36d94d7229439859c0112a4185bc0255";
const vBUSDAddress = "0x95c78222B3D6e262426483D42CfA53685A67Ab9D";
const vUSDCAddress = "0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8";
const unitrollerAddress = "0xfD36E2c2a6789Db23113685031d7F16329158384";
const xvs = "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63";

//update 
const usdtStrategyAddress = '0x4bA58C32b994164218BC6a8A76107dcE6d374e07'

const busdStrategyAddress = '0x39D73B75743ba4aFD6d52bc6D766129DC5b2aa54'

const web3 = new Web3('https://bsc-dataseed.binance.org/');

const web3Matic = new Web3('https://polygon-mainnet.public.blastapi.io');

const usdtMantissa = 1e18;
const blocksPerDay = 60 * 60 * 24 / 3;
const daysPerYear = 365;
const CoinGecko = require('coingecko-api');


const ibUsdtAddressUSDTAPY = "0x158Da805682BdC8ee32d52833aD41E74bb951E59";
const poolIDUSDTAPY = 16;

const ibUsdtAddressBUSDAPY = "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f"; //  BUSD
const poolIDBUSDAPY = 3;



const ibUsdtAbi = require('../../../abiManager/V2XVault/IbUsdtABI.json');
const alpacaConfigAbi = require('../../../abiManager/V2XVault/AlpacaConfigABI.json');


const fairLaunch = require('../../../abiManager/V2XVault/FairLaunchABI.json')
const uniswapRouterAbi = require('../../../abiManager/V2XVault/UniswapRouterAbi.json');


const ibBusdAddress = "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f";
const lpTokenAddress = "0xae70e3f6050d6ab05e03a50c655309c2148615be";
const epsPoolID = 25;
const ibTokenPoolId = 3;

const fairLanuchAddress = "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F";
const uniswapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";



const stabilityFee = 0.018;
const collateralFactor = 0.875;



export const getXVaultAPIUSDT = async () => {

    try {
        var ibToken = new web3.eth.Contract(abiManager.IBusdt, ibUsdtAddressUSDTAPY);
        var alpacaConfigAddress = await ibToken.methods.config().call();
        var alpacaConfigContract = new web3.eth.Contract(abiManager.AlpacaConfig, alpacaConfigAddress);
        var alpacaTotalToken = await ibToken.methods.totalToken().call();
        var alpacaVaultDebtVal = await ibToken.methods.vaultDebtVal().call();
        var alpacaBorrowInterest = await alpacaConfigContract.methods.getInterestRate(alpacaVaultDebtVal, new BigNumber(alpacaTotalToken).minus(alpacaVaultDebtVal)).call();
        alpacaBorrowInterest = new BigNumber(alpacaBorrowInterest).multipliedBy(365 * 24 * 3600);
        var performanceFee = await alpacaConfigContract.methods.getReservePoolBps().call();
        performanceFee = new BigNumber(performanceFee).dividedBy(10000);
        var alpacaLendingApr = alpacaBorrowInterest.multipliedBy(alpacaVaultDebtVal).dividedBy(alpacaTotalToken).multipliedBy(new BigNumber(1).minus(performanceFee)).dividedBy(web3.utils.toWei('1'));

        var fairLanuchContract = new web3.eth.Contract(abiManager.FairLaunch, fairLanuchAddress);
        var poolInfo = await fairLanuchContract.methods.poolInfo(poolIDUSDTAPY).call()
        var allocPoint = poolInfo.allocPoint;
        var alpacaPerBlock = await fairLanuchContract.methods.alpacaPerBlock().call();
        var totalAllocPoint = await fairLanuchContract.methods.totalAllocPoint().call();
        var balanceOfIbToken = await ibToken.methods.balanceOf(fairLanuchAddress).call();
        var debtShareToVal = await ibToken.methods.debtShareToVal(web3.utils.toWei('1')).call();
        var valueOfPool = new BigNumber(balanceOfIbToken).multipliedBy(debtShareToVal).dividedBy(web3.utils.toWei('1'))
        var path = ["0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", "0x55d398326f99059ff775485246999027b3197955"];
        var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
        var amountIn = new BigNumber(10).pow(18);
        var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
        var alpacaPrice = amountOut[amountOut.length - 1];
        var stakingApr = new BigNumber(alpacaPerBlock).multipliedBy(allocPoint).dividedBy(totalAllocPoint).multipliedBy(new BigNumber(blocksPerDay)).multipliedBy(daysPerYear).multipliedBy(alpacaPrice).dividedBy(balanceOfIbToken).dividedBy(web3.utils.toWei('1'))

        let apy = 0;
        var totalApr = alpacaLendingApr.plus(1).multipliedBy(stakingApr.plus(1)).minus(1)
        apy = totalApr.dividedBy(daysPerYear).plus(1).pow(daysPerYear).minus(1).multipliedBy(100)

        return apy


    } catch (e) {
        console.log(e)
    }

}


export const getXVaultAPIUSDC = async () => {

    try {
        let extra_profit;
        var vToken = new web3.eth.Contract(vUSDCAbi, vUSDCAddress);

        var supplyRatePerBlock = await vToken.methods.supplyRatePerBlock().call();
        var borrowRatePerBlock = await vToken.methods.borrowRatePerBlock().call();

        var supplyApy = new BigNumber(supplyRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
        var borrowApy = new BigNumber(borrowRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);

        var unitroller = new web3.eth.Contract(unitrollerAbi, unitrollerAddress);
        var venusSupplySpeed = await unitroller.methods.venusSupplySpeeds(vUsdtAddress).call();
        var venusBorrowSpeed = await unitroller.methods.venusBorrowSpeeds(vUsdtAddress).call();
        var venusSupplyPerYear = venusSupplySpeed / 1e18 * blocksPerDay * daysPerYear;
        var venusBorrowPerYear = venusBorrowSpeed / 1e18 * blocksPerDay * daysPerYear;

        var path = ["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059ff775485246999027b3197955"];
        var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
        var amountIn = new BigNumber(10).pow(18);
        var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
        var price = amountOut[amountOut.length - 1];
        var theSupplyRewardAmount = new BigNumber(price).times(venusSupplyPerYear);
        var theBorrowRewardAmount = new BigNumber(price).times(venusBorrowPerYear);
        var totalBorrows = await vToken.methods.totalBorrows().call();
        var cash = await vToken.methods.getCash().call();
        var totalReserves = await vToken.methods.totalReserves().call();

        var totalSupply = new BigNumber(totalBorrows).plus(new BigNumber(cash)).minus(new BigNumber(totalReserves));
        var supplyRewardApy = new BigNumber(theSupplyRewardAmount).div(totalSupply).times(100);
        var borrowRewardApy = new BigNumber(theBorrowRewardAmount).div(totalBorrows).times(100);

        var apy = 0;

        extra_profit = supplyApy.plus(supplyRewardApy).plus(borrowRewardApy).minus(borrowApy);

        if (extra_profit.toNumber() > 0) {
            apy = supplyApy.plus(supplyRewardApy).plus(extra_profit.times(3));
        } else {
            apy = supplyApy.plus(supplyRewardApy);
        }
        const apyResult = apy.toString(10);
        return apyResult

    } catch (e) {
        console.log(e)
    }

}



export const getXVaultAPIBUSD = async () => {

    try {

        var ibToken = new web3.eth.Contract(ibUsdtAbi, ibBusdAddress);
        var alpacaConfigAddress = await ibToken.methods.config().call();
        var alpacaConfigContract = new web3.eth.Contract(alpacaConfigAbi, alpacaConfigAddress);
        var alpacaTotalToken = await ibToken.methods.totalToken().call();
        var alpacaVaultDebtVal = await ibToken.methods.vaultDebtVal().call();
        var alpacaBorrowInterest = await alpacaConfigContract.methods.getInterestRate(alpacaVaultDebtVal, new BigNumber(alpacaTotalToken).minus(alpacaVaultDebtVal)).call();
        alpacaBorrowInterest = new BigNumber(alpacaBorrowInterest).multipliedBy(365 * 24 * 3600);
        var performanceFee = await alpacaConfigContract.methods.getReservePoolBps().call();
        performanceFee = new BigNumber(performanceFee).dividedBy(10000);
        var alpacaLendingApr = alpacaBorrowInterest.multipliedBy(alpacaVaultDebtVal).dividedBy(alpacaTotalToken).multipliedBy(new BigNumber(1).minus(performanceFee)).dividedBy(web3.utils.toWei('1'));

        var fairLanuchContract = new web3.eth.Contract(fairLaunch, fairLanuchAddress);
        var poolInfo = await fairLanuchContract.methods.poolInfo(epsPoolID).call()
        var allocPoint = poolInfo.allocPoint;
        var alpacaPerBlock = await fairLanuchContract.methods.alpacaPerBlock().call();
        var totalAllocPoint = await fairLanuchContract.methods.totalAllocPoint().call();
        var lpToken = new web3.eth.Contract(ibUsdtAbi, lpTokenAddress);
        var balanceOfLpToken = await lpToken.methods.balanceOf(fairLanuchAddress).call();
        var path = ["0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"];
        var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
        var amountIn = new BigNumber(10).pow(18);
        var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
        var alpacaPrice = amountOut[amountOut.length - 1];
        var stakingAprOfEps = new BigNumber(alpacaPerBlock).multipliedBy(allocPoint).dividedBy(totalAllocPoint).multipliedBy(new BigNumber(blocksPerDay)).multipliedBy(daysPerYear).multipliedBy(alpacaPrice).dividedBy(balanceOfLpToken).dividedBy(web3.utils.toWei('1'))

        poolInfo = await fairLanuchContract.methods.poolInfo(ibTokenPoolId).call()
        allocPoint = poolInfo.allocPoint;
        var balanceOfIbToken = await ibToken.methods.balanceOf(fairLanuchAddress).call();
        var stakingAprOfIbToken = new BigNumber(alpacaPerBlock).multipliedBy(allocPoint).dividedBy(totalAllocPoint).multipliedBy(new BigNumber(blocksPerDay)).multipliedBy(daysPerYear).multipliedBy(alpacaPrice).dividedBy(balanceOfIbToken).dividedBy(web3.utils.toWei('1'))
        let apy = 0;
        var totalApr = alpacaLendingApr.plus(stakingAprOfIbToken).plus(stakingAprOfEps.minus(stabilityFee).multipliedBy(collateralFactor));
        apy = totalApr.dividedBy(daysPerYear).plus(1).pow(daysPerYear).minus(1).multipliedBy(100)                  // apy = (1 + apr/n)^n - 1

        return apy.toFixed(2).toString();

    } catch (e) {
        console.log(e)
    }

}


export function fromBigNumber(amount: any) {
    return amount * Math.pow(10, -18);
}

export function fromBigNumberMatic(amount: any) {
    return amount * Math.pow(10, -32);
}


export function getHighestAPYMatic(array: any) {
    return Math.max.apply(null, array);
}

export function getHighestAPYModal(array: any) {
    return Math.max.apply(null, array);
}

//BSC BNB APR
export const getAPRBNBXAutoBSC = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSCV2, '0x262AFa4F360f1432FB98a0579dc266e3FaDab1D1');

        if (web3Instance) {

            const BNBApy = await web3Instance.methods.recommend('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c').call();

            const alpcaAPRNumber = Number(BNBApy._alpaca);

            const fortubeAPR = Number(BNBApy._fortube);
            //const fulcrumAPR = Number(BNBApy._fulcrum); 
            const venusAPR = Number(BNBApy._venus);

            const apyArray = [alpcaAPRNumber, fortubeAPR, venusAPR];

            const finalBNBApy = getHighestAPYMatic(apyArray);

            const finalBNBAPYConverted = finalBNBApy * Math.pow(10, -18);

            return finalBNBAPYConverted;
        }



    } catch (e) {
        console.log(e)
    }

}

//BSC BUSD APR
export const getAPRBUSDXAutoBSC = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSCV2, '0x262AFa4F360f1432FB98a0579dc266e3FaDab1D1');

        if (web3Instance) {

            const BNBApy = await web3Instance.methods.recommend('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56').call();
            const alpcaAPRNumber = Number(BNBApy._alpaca);

            const fortubeAPR = Number(BNBApy._fortube);
            //const fulcrumAPR = Number(BNBApy._fulcrum); 
            const venusAPR = Number(BNBApy._venus);

            const apyArray = [alpcaAPRNumber, fortubeAPR, venusAPR];

            const finalBNBApy = getHighestAPYMatic(apyArray);

            const finalBNBAPYConverted = finalBNBApy * Math.pow(10, -18);


            return finalBNBAPYConverted;


        }



    } catch (e) {
        console.log(e)
    }

}

//BSC USDT APR
export const getAPRUSDTXAutoBSC = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSCV2, '0x262AFa4F360f1432FB98a0579dc266e3FaDab1D1');

        if (web3Instance) {

            const BNBApy = await web3Instance.methods.recommend('0x55d398326f99059fF775485246999027B3197955').call();
            const alpcaAPRNumber = Number(BNBApy._alpaca);

            const fortubeAPR = Number(BNBApy._fortube);
            //const fulcrumAPR = Number(BNBApy._fulcrum); 
            const venusAPR = Number(BNBApy._venus);

            const apyArray = [alpcaAPRNumber, fortubeAPR, venusAPR];

            const finalBNBApy = getHighestAPYMatic(apyArray);

            const finalBNBAPYConverted = finalBNBApy * Math.pow(10, -18);


            return finalBNBAPYConverted;


        }



    } catch (e) {
        console.log(e)
    }

}

//BSC USDC APR
export const getAPRUSDCXAutoBSC = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSCV2, '0x262AFa4F360f1432FB98a0579dc266e3FaDab1D1');

        if (web3Instance) {

            const BNBApy = await web3Instance.methods.recommend('0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d').call();
            const alpcaAPRNumber = Number(BNBApy._alpaca);

            const fortubeAPR = Number(BNBApy._fortube);
            //const fulcrumAPR = Number(BNBApy._fulcrum); 
            const venusAPR = Number(BNBApy._venus);

            const apyArray = [alpcaAPRNumber, fortubeAPR, venusAPR];

            const finalBNBApy = getHighestAPYMatic(apyArray);

            const finalBNBAPYConverted = finalBNBApy * Math.pow(10, -18);


            return finalBNBAPYConverted;


        }



    } catch (e) {
        console.log(e)
    }

}


//Matic WBTC APR
export const getAPRWBTCMatic = async () => {

    try {


        const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMaticV2, '0xb9e2346462553e8Ab2Ef5c298b20E0Ef1C7A05b5');

        if (web3Instance) {

            const WBTCApy = await web3Instance.methods.recommend('0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6').call();


            //const fortubeAPRNumber = Number(WBTCApy.fapr); 

            const aaveAPR = Number(WBTCApy.aapr);
            const ftAPR = Number(WBTCApy.ftapr);

            const apyArray = [aaveAPR, ftAPR];

            const finalWBTCApy = getHighestAPYMatic(apyArray);

            const finalWBTCAPYConverted = fromBigNumberMatic(finalWBTCApy) * 10000000;



            return finalWBTCAPYConverted;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL Matic WBTC APR
export const getAPRUSDTMatic = async () => {

    try {


        const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMaticV2, '0xb9e2346462553e8Ab2Ef5c298b20E0Ef1C7A05b5');

        if (web3Instance) {

            const USDTApy = await web3Instance.methods.recommend('0xc2132D05D31c914a87C6611C10748AEb04B58e8F').call();


            //const fortubeAPRNumber = Number(USDTApy.fapr); 

            const aaveAPR = Number(USDTApy.aapr);
            const ftAPR = Number(USDTApy.ftapr);

            //const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];
            const apyArray = [aaveAPR, ftAPR];

            const finalUSDTApy = getHighestAPYMatic(apyArray);

            const finalUSDTAPYConverted = fromBigNumberMatic(finalUSDTApy) * 10000000;

            return finalUSDTAPYConverted;
        }



    } catch (e) {
        console.log(e)
    }

}



//TVL Matic WBTC APR
export const getAPRUSDCMatic = async () => {

    try {


        const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMaticV2, '0xb9e2346462553e8Ab2Ef5c298b20E0Ef1C7A05b5');

        if (web3Instance) {

            const USDCApy = await web3Instance.methods.recommend('0x2791bca1f2de4661ed88a30c99a7a9449aa84174').call();

            //const fortubeAPRNumber = Number(USDCApy.fapr); 

            const aaveAPR = Number(USDCApy.aapr);
            const ftAPR = Number(USDCApy.ftapr);

            const apyArray = [aaveAPR, ftAPR];
            // const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

            const finalUSDCApy = getHighestAPYMatic(apyArray);

            const finalUSDCAPYConverted = fromBigNumberMatic(finalUSDCApy) * 10000000;


            return finalUSDCAPYConverted;
        }



    } catch (e) {
        console.log(e)
    }

}



//TVL Matic WBTC APR
export const getAPRAAVEMatic = async () => {

    try {


        const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMaticV2, '0xb9e2346462553e8Ab2Ef5c298b20E0Ef1C7A05b5');

        if (web3Instance) {

            const AAveApy = await web3Instance.methods.recommend('0xd6df932a45c0f255f85145f286ea0b292b21c90b').call();

            //const fortubeAPRNumber = Number(AAveApy.fapr); 

            const aaveAPR = Number(AAveApy.aapr);
            const ftAPR = Number(AAveApy.ftapr);

            //const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];
            const apyArray = [aaveAPR, ftAPR];

            const finalAaveApy = getHighestAPYMatic(apyArray);

            const finalAaveAPYConverted = fromBigNumberMatic(finalAaveApy) * 100000;

            //const AaveFinalAPYConverted =finalAaveAPYConverted  *100000

            return finalAaveAPYConverted;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL BSC 
const getTVLBalanceUSDTBSCXAuto = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCUSDT, '0x525A55eBd9464c1081077BCc1d7a53C1c431BD26');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = usdtTVLBalance * Math.pow(10, -18);

            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL BSC 
const getTVLBalanceUSDCBSCXAuto = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCUSDC, '0x3058d344C8F845754F0C356881772788c128eA22');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = usdtTVLBalance * Math.pow(10, -18);
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}

//TVL BSC 
const getTVLBalanceBUSDBSCXAuto = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCBUSD, '0xa25dec88B81a94Ca951f3a4ff4AAbC32B3759E6C');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL BSC 
const getTVLBalanceBNBBSCXAuto = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCBNB, '0x2dABAeB84cACFEF30e95896301CEF65cb24b3176');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');

            const coinGeckoClient = new CoinGecko();
            const binanceCoin = await coinGeckoClient.coins.fetch('binancecoin', {});

            let bnbPriceCurrent = parseFloat(binanceCoin.data.market_data.current_price.usd);


            const USDResultBNB = (Number(FinalTVL) * bnbPriceCurrent);

            return USDResultBNB;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL Matic
const getTVLBalanceUSDTMatic = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoUSDT, '0x6842E453ad9e7847a566876B8A2967FE9d155485');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'mwei');
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL Matic
const getTVLBalanceUSDCMatic = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoUSDC, '0x418b8D697e72B90cBdF5Cb58015384b9016794F9');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'mwei');
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL Matic
const getTVLBalanceAAVEMatic = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoAAVE, '0x0B12E60084816ed83c519a1fFd01022d5A50fcaC');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');
            const coinGeckoClient = new CoinGecko();
            const aavePrice = await coinGeckoClient.coins.fetch('aave', {});

            let aavePriceCurrent = parseFloat(aavePrice.data.market_data.current_price.usd);


            const USDResultAAVE = (Number(FinalTVL) * aavePriceCurrent) / 100;

            const FinalAvvePrice = USDResultAAVE * 100;

            return FinalAvvePrice;
        }



    } catch (e) {
        console.log(e)
    }

}


//TVL Matic
const getTVLBalanceWBTCMatic = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoWBTC, '0x5b208c6Ed9c95907DC7E1Ef34F0Cac52dd22b9dc');

        if (web3Instance) {

            const wbtcTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();


            const FinalTVL = wbtcTVLBalance / Math.pow(10, 8);


            const coinGeckoClient = new CoinGecko();
            const wbtcPrice = await coinGeckoClient.coins.fetch('wrapped-bitcoin', {});

            let wbtcPriceCurrent = parseFloat(wbtcPrice.data.market_data.current_price.usd);


            const USDResultWBTC = (parseFloat(FinalTVL.toString()) * wbtcPriceCurrent);

            return USDResultWBTC;
        }



    } catch (e) {
        console.log(e)
    }

}


const getUSDValueOfTVL = async (tvlUsdt: any, tvlUsdc: any, tvlAave: any, tvlWBTC: any) => {

    const finalTvlInUSDValue = tvlAave + tvlWBTC + tvlUsdt + tvlUsdc;

    return finalTvlInUSDValue;
}


const getUSDValueOfTVLXAuto = async (tvlUsdt: any, tvlUsdc: any, tvlBNB: any, tvlBUSD: any) => {



    const finalTvlInUSDValue = Number(tvlBNB) + Number(tvlBUSD) + Number(tvlUsdt) + Number(tvlUsdc);


    return finalTvlInUSDValue;
}



//TVL BSC
const getTVLBalanceUSDT = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.xvVaultUSDT, '0xF8604eE08c70389856242dF88b4CCA90a70733a7');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.totalAssets().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}



const getTVLBalanceBUSD = async () => {

    try {


        const web3Instance = new web3.eth.Contract(abiManager.xvVaultBUSD, '0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.totalAssets().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');

            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}


const getTVLBalanceUSDC = async () => {

    try {
        //const web3Instance = window.APPWEB3;

        const web3Instance = new web3.eth.Contract(abiManager.xvVaultUSDC, '0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a');

        if (web3Instance) {

            const usdtTVLBalance = await web3Instance.methods.totalAssets().call();


            const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');
            return FinalTVL;
        }



    } catch (e) {
        console.log(e)
    }

}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

});

const getXVaultAPI = async (chainId: any, lender: string, setLoading: Function) => {

    try {

        setLoading(true)


        if (chainId == 56) {
            const apyBusd = await getXVaultAPIBUSD();
            const apyUSDT = await getXVaultAPIUSDTV2();
            const apyUSDC = await getXVaultAPIUSDC();
            const apyArray = [Number(apyBusd), Number(apyUSDT), Number(apyUSDC)];

            const highestAPYXVaultBSC = getHighestAPYModal(apyArray);



            const TVLUsdtBalance = Number(await getTVLBalanceUSDT());
            const TVLBusdBalance = Number(await getTVLBalanceBUSD());
            const TVLUsdcBalance = Number(await getTVLBalanceUSDC());

            const TVLUsdtBalanceFinal = formatter.format(TVLUsdtBalance);
            const TVLBusdBalanceFinal = formatter.format(TVLBusdBalance);
            const TVLUsdcBalanceFinal = formatter.format(TVLUsdcBalance);
            const totalTVLXVault = TVLUsdtBalance + TVLBusdBalance + TVLUsdcBalance;
            const totalTVLXVaultFinal = formatter.format(totalTVLXVault);



            const apyXAutoBNB = await getAPRBNBXAutoBSC();
            const apyXAutoBUSD = await getAPRBUSDXAutoBSC();
            const apyXAutoUSDT = await getAPRUSDTXAutoBSC();
            const apyXAutoUSDC = await getAPRUSDCXAutoBSC();

            const apyArrayXAuto = [Number(apyXAutoBNB), Number(apyXAutoBUSD), Number(apyXAutoUSDT), Number(apyXAutoUSDC)];

            const highestAPYXAutoBSC = getHighestAPYModal(apyArrayXAuto);


            const tvlXAutoUSDTBSC = await getTVLBalanceUSDTBSCXAuto();
            const tvlXAutoUSDCBSC = await getTVLBalanceUSDCBSCXAuto();
            const tvlXAutoBUSDBSC = await getTVLBalanceBUSDBSCXAuto();
            const tvlXAutoBNBBSC = await getTVLBalanceBNBBSCXAuto();


            const tvlXAutoUSDTBSCFinal = formatter.format(tvlXAutoUSDTBSC);
            const tvlXAutoUSDCBSCFinal = formatter.format(tvlXAutoUSDCBSC)
            const tvlXAutoBUSDBSCFinal = formatter.format(tvlXAutoBUSDBSC)
            const tvlXAutoBNBBSCFinal = formatter.format(tvlXAutoBNBBSC)

            const finalTvlXauto = await getUSDValueOfTVLXAuto(tvlXAutoUSDTBSC, tvlXAutoUSDCBSC, tvlXAutoBNBBSC, tvlXAutoBUSDBSC);
            const finalTvlXautoFinal = formatter.format(finalTvlXauto)


            const data = {
                busd: apyBusd,
                usdt: apyUSDT,
                usdc: apyUSDC,
                usdtXauto: apyXAutoUSDT,
                bnbXauto: apyXAutoBNB,
                busdXauto: apyXAutoBUSD,
                usdcXauto: apyXAutoUSDC,
                tvlUSDTBsc: TVLUsdtBalanceFinal,
                tvlBUSDBsc: TVLBusdBalanceFinal,
                tvlUSDCBsc: TVLUsdcBalanceFinal,
                tvlUSDCBscXAuto: tvlXAutoUSDCBSCFinal,
                tvlBUSDBscXAuto: tvlXAutoBUSDBSCFinal,
                tvlUSDTBscXAuto: tvlXAutoUSDTBSCFinal,
                tvlVBNBBscXAuto: tvlXAutoBNBBSCFinal,
                TVL: totalTVLXVaultFinal,
                TVLXAuto: finalTvlXautoFinal,
                lendingProtocol: lender,
                HighestXVaultAPY: highestAPYXVaultBSC,
                HighestXAutoAPY: highestAPYXAutoBSC,
            };
            setLoading(false)
            return data
        }
        else if (chainId == 137) {
            const TVLUsdtBalanceMatic = Number(await getTVLBalanceUSDTMatic());
            const TVLUsdcBalanceMatic = Number(await getTVLBalanceUSDCMatic());
            const TVLAaveBalanceMatic = Number(await getTVLBalanceAAVEMatic());
            const TVLWbtcBalanceMatic = Number(await getTVLBalanceWBTCMatic());


            const TVLUsdtBalanceMaticFinal = formatter.format(TVLUsdtBalanceMatic);
            const TVLUsdcBalanceMaticFinal = formatter.format(TVLUsdcBalanceMatic);
            const TVLAaveBalanceMaticFinal = formatter.format(TVLAaveBalanceMatic);
            const TVLWbtcBalanceMaticFinal = formatter.format(TVLWbtcBalanceMatic);

            const usdtValueOfTvl = await getUSDValueOfTVL(TVLUsdtBalanceMatic, TVLUsdcBalanceMatic, TVLAaveBalanceMatic, TVLWbtcBalanceMatic)
            const totalTVLXVault = formatter.format(usdtValueOfTvl);

            const WbtcApy = Number(await getAPRWBTCMatic()).toFixed(2);
            const UsdtApy = Number(await getAPRUSDTMatic()).toFixed(2);
            const UsdcApy = Number(await getAPRUSDCMatic()).toFixed(2);
            const AaveApy = Number(await getAPRAAVEMatic()).toFixed(2);

            const data = {
                wbtcApyMatic: WbtcApy,
                usdtApyMatic: UsdtApy,
                usdcApyMatic: UsdcApy,
                aaveApyMatic: AaveApy,
                tvlUSDTMatic: TVLUsdtBalanceMaticFinal,
                tvlUSDCMatic: TVLUsdcBalanceMaticFinal,
                tvlAAVE: TVLAaveBalanceMaticFinal,
                tvlWBTC: TVLWbtcBalanceMaticFinal,
                TVL: totalTVLXVault,
                TVLXAuto: '',
                lendingProtocol: lender
            };
            setLoading(false)
            return data
        } else {
            const data = {
                busd: '0.00',
                usdt: '0.00',
                usdc: '0.00',
                usdtXauto: '0.00',
                bnbXauto: '0.00',
                busdXauto: '0.00',
                usdcXauto: '0.00',
                wbtcApyMatic: '0.00',
                usdcApyMatic: '0.00',
                usdtApyMatic: '0.00',
                aaveApyMatic: '0.00',
                tvlUSDCBscXAuto: '0.00',
                tvlBUSDBscXAuto: '0.00',
                tvlUSDTBscXAuto: '0.00',
                tvlVBNBBscXAuto: '0.00',
                tvlUSDTBsc: '0.00',
                tvlBUSD: '0.00',
                tvlUSDCBsc: '0.00',
                tvlUSDTMAtic: '0.00',
                tvlUSDCMatic: '0.00',
                tvlAAVEMatic: '0.00',
                tvlWBTCMatic: '0.00',
                TVL: '0.00',
                TVLXAuto: '0.00',
                lendingProtocol: '0.00',
                HighestXVaultAPY: '0.00',
                HighestXAutoAPY: '0.00',
            };

            setLoading(false)

            return data
        }





    } catch (e) {
        console.log(e)
        setLoading(false)
    }

}



export default getXVaultAPI;