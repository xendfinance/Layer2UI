import abiManager from "abiManager";
import createContract from "methods/contracts/contract-creator";

//import exposedWeb3 from "../../../methods/contracts/exposedWeb3";
const Web3 = require('web3');
const BigNumber = require('bignumber.js');

// const { formatUnits } = require('@ethersproject/units');
// const { Zero } = require('@ethersproject/constants');
const vUsdtAbi = require('../../contracts/xvault/abis/vUsdtAbi.json');
const vBUSDAbi = require('../../contracts/xvault/abis/vBusd.abi.json');
const vUSDCAbi = require('../../contracts/xvault/abis/vUsdcABI.json');
const unitrollerAbi = require('../../contracts/xvault/abis/Unitroller.abi.json');
const uniswapRouterAbi = require('../../contracts/xvault/abis/UniswapRouterAbi.json');

const vUsdtAddress = "0xfd5840cd36d94d7229439859c0112a4185bc0255";
const vBUSDAddress = "0x95c78222B3D6e262426483D42CfA53685A67Ab9D";
const vUSDCAddress = "0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8";
const unitrollerAddress = "0xfD36E2c2a6789Db23113685031d7F16329158384";
const xvs = "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63";
const uniswapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const web3 = new Web3('https://bsc-dataseed.binance.org/');

const usdtMantissa = 1e18;
const blocksPerDay = 60 * 60 * 24 / 3;
const daysPerYear = 365;


const getXVaultAPIUSDT = async() => {

		try {
            let extra_profit;
            var vToken = new web3.eth.Contract(vUsdtAbi, vUsdtAddress);
            console.log("VTOKEN CONTRACT IS",vToken);
            var supplyRatePerBlock = await vToken.methods.supplyRatePerBlock().call();
            var borrowRatePerBlock = await vToken.methods.borrowRatePerBlock().call();
        
            var supplyApy = new BigNumber(supplyRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
            var borrowApy = new BigNumber(borrowRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
            
            var unitroller = new web3.eth.Contract(unitrollerAbi, unitrollerAddress);
            var venusSpeed = await unitroller.methods.venusSpeeds(vUsdtAddress).call();
            var venusPerYear = venusSpeed / 1e18 * blocksPerDay * daysPerYear;
            
            var path = ["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059ff775485246999027b3197955"];
            var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
            var amountIn = new BigNumber(10).pow(18);
            var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
            var price = amountOut[amountOut.length - 1];
            var theAmount = new BigNumber(price).times(venusPerYear);
            var totalBorrows = await vToken.methods.totalBorrows().call();
            var cash = await vToken.methods.getCash().call();
            var totalReserves = await vToken.methods.totalReserves().call();
        
            var totalSupply = new BigNumber(totalBorrows).plus(new BigNumber(cash)).minus(new BigNumber(totalReserves));
            var supplyRewardApy = new BigNumber(theAmount).div(totalSupply).times(100);
            var borrowRewardApy = new BigNumber(theAmount).div(totalBorrows).times(100);
        
            var apy = 0;
            
            extra_profit = supplyApy.plus(supplyRewardApy).plus(borrowRewardApy).minus(borrowApy);
            console.log('extra_profit', extra_profit.toString(10));
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


const getXVaultAPIUSDC = async() => {

    try {
        let extra_profit;
        var vToken = new web3.eth.Contract(vUSDCAbi, vUSDCAddress);
        console.log("VTOKEN CONTRACT IS",vToken);
        var supplyRatePerBlock = await vToken.methods.supplyRatePerBlock().call();
        var borrowRatePerBlock = await vToken.methods.borrowRatePerBlock().call();
    
        var supplyApy = new BigNumber(supplyRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
        var borrowApy = new BigNumber(borrowRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
        
        var unitroller = new web3.eth.Contract(unitrollerAbi, unitrollerAddress);
        var venusSpeed = await unitroller.methods.venusSpeeds(vUsdtAddress).call();
        var venusPerYear = venusSpeed / 1e18 * blocksPerDay * daysPerYear;
        
        var path = ["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059ff775485246999027b3197955"];
        var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
        var amountIn = new BigNumber(10).pow(18);
        var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
        var price = amountOut[amountOut.length - 1];
        var theAmount = new BigNumber(price).times(venusPerYear);
        var totalBorrows = await vToken.methods.totalBorrows().call();
        var cash = await vToken.methods.getCash().call();
        var totalReserves = await vToken.methods.totalReserves().call();
    
        var totalSupply = new BigNumber(totalBorrows).plus(new BigNumber(cash)).minus(new BigNumber(totalReserves));
        var supplyRewardApy = new BigNumber(theAmount).div(totalSupply).times(100);
        var borrowRewardApy = new BigNumber(theAmount).div(totalBorrows).times(100);
    
        var apy = 0;
        
        extra_profit = supplyApy.plus(supplyRewardApy).plus(borrowRewardApy).minus(borrowApy);
        console.log('extra_profit', extra_profit.toString(10));
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



const getXVaultAPIBUSD = async() => {

    try {
        let extra_profit;
        var vToken = new web3.eth.Contract(vBUSDAbi, vBUSDAddress);
        console.log("VTOKEN CONTRACT IS",vToken);
        var supplyRatePerBlock = await vToken.methods.supplyRatePerBlock().call();
        var borrowRatePerBlock = await vToken.methods.borrowRatePerBlock().call();
    
        var supplyApy = new BigNumber(supplyRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
        var borrowApy = new BigNumber(borrowRatePerBlock).div(new BigNumber(usdtMantissa)).times(blocksPerDay).plus(1).pow(daysPerYear).minus(1).times(100);
        
        var unitroller = new web3.eth.Contract(unitrollerAbi, unitrollerAddress);
        var venusSpeed = await unitroller.methods.venusSpeeds(vUsdtAddress).call();
        var venusPerYear = venusSpeed / 1e18 * blocksPerDay * daysPerYear;
        
        var path = ["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059ff775485246999027b3197955"];
        var routerContract = new web3.eth.Contract(uniswapRouterAbi, uniswapRouterAddress);
        var amountIn = new BigNumber(10).pow(18);
        var amountOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
        var price = amountOut[amountOut.length - 1];
        var theAmount = new BigNumber(price).times(venusPerYear);
        var totalBorrows = await vToken.methods.totalBorrows().call();
        var cash = await vToken.methods.getCash().call();
        var totalReserves = await vToken.methods.totalReserves().call();
    
        var totalSupply = new BigNumber(totalBorrows).plus(new BigNumber(cash)).minus(new BigNumber(totalReserves));
        var supplyRewardApy = new BigNumber(theAmount).div(totalSupply).times(100);
        var borrowRewardApy = new BigNumber(theAmount).div(totalBorrows).times(100);
    
        var apy = 0;
        
        extra_profit = supplyApy.plus(supplyRewardApy).plus(borrowRewardApy).minus(borrowApy);
        console.log('extra_profit', extra_profit.toString(10));
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



	



const getTVLBalance = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3.eth.Contract(abiManager.XVault, '0xc8561ec37fBf2BDe992Dc746c2777dc792bfeF8C');
        
       if (web3Instance) {
 
       const usdtTVLBalance = await web3Instance.methods.totalAssets().call();       
 

       const FinalTVL = web3.utils.fromWei(usdtTVLBalance.toString(), 'ether');     
       return FinalTVL;
       }


       
    } catch (e) {
        console.log(e)
    }

}



const getXVaultAPI = async() => {

    try {
        const apyBusd = await getXVaultAPIBUSD();
        const apyUSDT = await getXVaultAPIUSDT();
        const apyUSDC = await getXVaultAPIUSDC();
        const TVLUsdtBalance = await getTVLBalance();

        const data={
            busd:apyBusd,
            usdt:apyUSDT,
            usdc:apyUSDC,
            TVL:TVLUsdtBalance
        };
        return data


       
    } catch (e) {
        console.log(e)
    }

}



export default getXVaultAPI;