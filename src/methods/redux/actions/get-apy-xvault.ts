import abiManager from "abiManager";
import reduxStore from "..";


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

const web3Matic = new Web3('https://polygon-mainnet.g.alchemy.com/v2/A3s0YpUEWXboRTynlFb0jh4HcT0934ak');

const usdtMantissa = 1e18;
const blocksPerDay = 60 * 60 * 24 / 3;
const daysPerYear = 365;
const CoinGecko = require('coingecko-api');



const getXVaultAPIUSDT = async() => {

		try {
            let extra_profit;
            var vToken = new web3.eth.Contract(vUsdtAbi, vUsdtAddress);
           
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


export function fromBigNumber(amount: any) {
    return amount * Math.pow(10, -18);
}

export function fromBigNumberMatic(amount: any) {
    return amount * Math.pow(10, -32);
}


export function getHighestAPYMatic(array:any){
    return Math.max.apply(null, array);
 }


//BSC BNB APR
const getAPRBNBXAutoBSC = async() => {

    try {
      

       const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSC, '0x21026da06d8979982D325Fd3321bdcf439cC3bD8');
        
       if (web3Instance) {
 
       const BNBApy = await web3Instance.methods.recommend('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c').call();
      
       const alpcaAPRNumber = Number(BNBApy._alpaca); 
      
       const fortubeAPR = Number(BNBApy._fortube); 
       const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,fulcrumAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted =finalBNBApy * Math.pow(10,-18); 
     
       return finalBNBAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}

//BSC BUSD APR
const getAPRBUSDXAutoBSC = async() => {

    try {
      

       const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSC, '0x21026da06d8979982D325Fd3321bdcf439cC3bD8');
        
       if (web3Instance) {
 
       const BNBApy = await web3Instance.methods.recommend('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56').call();
       const alpcaAPRNumber = Number(BNBApy._alpaca); 
      
       const fortubeAPR = Number(BNBApy._fortube); 
       const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,fulcrumAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted = finalBNBApy * Math.pow(10,-18);
     

       return finalBNBAPYConverted;

     
       }


       
    } catch (e) {
        console.log(e)
    }

}

//BSC USDT APR
const getAPRUSDTXAutoBSC = async() => {

    try {
      

       const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSC, '0x21026da06d8979982D325Fd3321bdcf439cC3bD8');
        
       if (web3Instance) {
 
       const BNBApy = await web3Instance.methods.recommend('0x55d398326f99059fF775485246999027B3197955').call();
       const alpcaAPRNumber = Number(BNBApy._alpaca); 
      
       const fortubeAPR = Number(BNBApy._fortube); 
       const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,fulcrumAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted = finalBNBApy * Math.pow(10,-18);
     

       return finalBNBAPYConverted;

     
       }


       
    } catch (e) {
        console.log(e)
    }

}

//BSC USDC APR
const getAPRUSDCXAutoBSC = async() => {

    try {
      

       const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSC, '0x21026da06d8979982D325Fd3321bdcf439cC3bD8');
        
       if (web3Instance) {
 
       const BNBApy = await web3Instance.methods.recommend('0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d').call();
       const alpcaAPRNumber = Number(BNBApy._alpaca); 
      
       const fortubeAPR = Number(BNBApy._fortube); 
       const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,fulcrumAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted = finalBNBApy * Math.pow(10,-18);
      

       return finalBNBAPYConverted;

     
       }


       
    } catch (e) {
        console.log(e)
    }

}


//Matic WBTC APR
const getAPRWBTCMatic = async() => {

    try {
      

       const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMatic, '0xecD982D0bc4eF14684FB7Ece34a8543D8329bF47');
        
       if (web3Instance) {
 
       const WBTCApy = await web3Instance.methods.recommend('0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6').call();
      
       
       const fortubeAPRNumber = Number(WBTCApy.fapr); 
      
       const aaveAPR = Number(WBTCApy.aapr); 
       const ftAPR = Number(WBTCApy.ftapr); 
       
       const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

       const finalWBTCApy =  getHighestAPYMatic(apyArray);

       const finalWBTCAPYConverted = fromBigNumberMatic(finalWBTCApy)*10000000; 

     
   
       return finalWBTCAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//TVL Matic WBTC APR
const getAPRUSDTMatic = async() => {

    try {
      

       const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMatic, '0xecD982D0bc4eF14684FB7Ece34a8543D8329bF47');
        
       if (web3Instance) {
 
       const USDTApy = await web3Instance.methods.recommend('0xc2132D05D31c914a87C6611C10748AEb04B58e8F').call();
     
       
       const fortubeAPRNumber = Number(USDTApy.fapr); 
      
       const aaveAPR = Number(USDTApy.aapr); 
       const ftAPR = Number(USDTApy.ftapr); 
       
       const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

       const finalUSDTApy =  getHighestAPYMatic(apyArray);

       const finalUSDTAPYConverted = fromBigNumberMatic(finalUSDTApy)*10000000; 

       return finalUSDTAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}



//TVL Matic WBTC APR
const getAPRUSDCMatic = async() => {

    try {
      

       const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMatic, '0xecD982D0bc4eF14684FB7Ece34a8543D8329bF47');
        
       if (web3Instance) {
 
       const USDCApy = await web3Instance.methods.recommend('0x2791bca1f2de4661ed88a30c99a7a9449aa84174').call();      
       
       const fortubeAPRNumber = Number(USDCApy.fapr); 
      
       const aaveAPR = Number(USDCApy.aapr); 
       const ftAPR = Number(USDCApy.ftapr); 
       
       const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

       const finalUSDCApy =  getHighestAPYMatic(apyArray);

       const finalUSDCAPYConverted = fromBigNumberMatic(finalUSDCApy)*10000000; 

     
       return finalUSDCAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}



//TVL Matic WBTC APR
const getAPRAAVEMatic = async() => {

    try {
      

       const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMatic, '0xecD982D0bc4eF14684FB7Ece34a8543D8329bF47');
        
       if (web3Instance) {
 
       const AAveApy = await web3Instance.methods.recommend('0xd6df932a45c0f255f85145f286ea0b292b21c90b').call();      
       
       const fortubeAPRNumber = Number(AAveApy.fapr); 
      
       const aaveAPR = Number(AAveApy.aapr); 
       const ftAPR = Number(AAveApy.ftapr); 
       
       const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

       const finalAaveApy =  getHighestAPYMatic(apyArray);

       const finalAaveAPYConverted = fromBigNumberMatic(finalAaveApy)*100000; 

       const AaveFinalAPYConverted =finalAaveAPYConverted  *100000

       return AaveFinalAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//TVL BSC 
const getTVLBalanceUSDTBSCXAuto = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCUSDT, '0x22501e8d4F766351CB63545BbfcBA1dFe3BaC6E5');
        
       if (web3Instance) {
 
       const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();       
      

       const FinalTVL = usdtTVLBalance * Math.pow(10,-18); 
      
       return FinalTVL;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//TVL BSC 
const getTVLBalanceUSDCBSCXAuto = async() => {

    try {
       

       const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCUSDC, '0x2C7a0FD397D20eb85b7c7F179015833f3dBfa665');
        
       if (web3Instance) {
 
       const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();       
      

       const FinalTVL = usdtTVLBalance * Math.pow(10,-18); 
       return FinalTVL;
       }


       
    } catch (e) {
        console.log(e)
    }

}

//TVL BSC 
const getTVLBalanceBUSDBSCXAuto = async() => {

    try {
       

       const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCBUSD, '0x4b75C26aC7E7b3DB22a67b74741fC965427Ae7eb');
        
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
const getTVLBalanceBNBBSCXAuto = async() => {

    try {
       

       const web3Instance = new web3.eth.Contract(abiManager.xvAutoBSCBNB, '0x0682B619734f059c7255D3e08726DAb000dB4b62');
        
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
const getTVLBalanceUSDTMatic = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoUSDT, '0x05b1d524671CA541c3457c0550a09f71604C2dEC');
        
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
const getTVLBalanceUSDCMatic = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoUSDC, '0x3b1D848B20735B030D8ea85d2f516eb75c8e0e56');
        
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
const getTVLBalanceAAVEMatic = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoAAVE, '0x7103D2aa877624fA2d5AFc6A6728A8dfF71bDC82');
        
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
const getTVLBalanceWBTCMatic = async() => {

    try {
        //const web3Instance = window.APPWEB3;

       const web3Instance = new web3Matic.eth.Contract(abiManager.xvAutoWBTC, '0x0D81fF82f99eaCbc67E2404DD7FD8896905dF0f9');
        
       if (web3Instance) {
 
       const usdtTVLBalance = await web3Instance.methods.calcPoolValueInToken().call();       
      

       const FinalTVL = usdtTVLBalance / Math.pow(10,8);

       const coinGeckoClient = new CoinGecko();
       const wbtcPrice = await coinGeckoClient.coins.fetch('wrapped-bitcoin', {});
   
       let wbtcPriceCurrent = parseFloat(wbtcPrice.data.market_data.current_price.usd);
   
   
       const USDResultWBTC = (Number(FinalTVL) * wbtcPriceCurrent) * 100;   
   
       return USDResultWBTC;
       }


       
    } catch (e) {
        console.log(e)
    }

}
	

const getUSDValueOfTVL = async(tvlUsdt:any,tvlUsdc :any,tvlAave:any,tvlWBTC:any) =>{
    //const coinGeckoClient = new CoinGecko();
    // const aavePrice = await coinGeckoClient.coins.fetch('aave', {});
    // const wbtcPrice = await coinGeckoClient.coins.fetch('wrapped-bitcoin', {});

    // let aavePriceCurrent = parseFloat(aavePrice.data.market_data.current_price.usd);
    // let wbtcPriceCurrent = parseFloat(wbtcPrice.data.market_data.current_price.usd);


    // const USDResultAAVE = (Number(tvlAave) * aavePriceCurrent) / 100;
    // const USDResultWBTC = (Number(tvlWBTC) * wbtcPriceCurrent) * 100;

    // const FinalAvvePrice = USDResultAAVE * 100;

    const finalTvlInUSDValue = tvlAave + tvlWBTC + tvlUsdt + tvlUsdc;

    return finalTvlInUSDValue;
}


const getUSDValueOfTVLXAuto = async(tvlUsdt:any,tvlUsdc :any,tvlBNB:any,tvlBUSD:any) =>{
    // const coinGeckoClient = new CoinGecko();
    // const binanceCoin = await coinGeckoClient.coins.fetch('binancecoin', {});    

    // let bnbPriceCurrent = parseFloat(binanceCoin.data.market_data.current_price.usd); 


    // const USDResultBNB = (Number(tvlBNB) * bnbPriceCurrent) * 100;  


    const finalTvlInUSDValue = Number(tvlBNB) + Number(tvlBUSD) + Number(tvlUsdt) + Number(tvlUsdc);
    

    return finalTvlInUSDValue;
}



//TVL BSC
const getTVLBalanceUSDT = async() => {

    try {
        //const web3Instance = window.APPWEB3;

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



const getTVLBalanceBUSD = async() => {

    try {
        //const web3Instance = window.APPWEB3;

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


const getTVLBalanceUSDC = async() => {

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



const getXVaultAPI = async(chainId :any ) => {

    try {
        const ConnectWalletReducerAction: any = await reduxStore();
        const reduxStateCurrent = ConnectWalletReducerAction.getState().DashboardReducer;
        

        if(chainId==56){
            const apyBusd = await getXVaultAPIBUSD();
            const apyUSDT = await getXVaultAPIUSDT();
            const apyUSDC = await getXVaultAPIUSDC();
          
            const TVLUsdtBalance = Number(await getTVLBalanceUSDT());
            const TVLBusdBalance = Number(await getTVLBalanceBUSD());
            const TVLUsdcBalance = Number(await getTVLBalanceUSDC());
            const totalTVLXVault = TVLUsdtBalance +TVLBusdBalance+TVLUsdcBalance
            
            
            const apyXAutoBNB = await getAPRBNBXAutoBSC();
            const apyXAutoBUSD = await getAPRBUSDXAutoBSC();
            const apyXAutoUSDT = await getAPRUSDTXAutoBSC();
            const apyXAutoUSDC = await getAPRUSDCXAutoBSC();

            const tvlXAutoUSDTBSC = await getTVLBalanceUSDTBSCXAuto();
            const tvlXAutoUSDCBSC = await getTVLBalanceUSDCBSCXAuto();
            const tvlXAutoBUSDBSC = await getTVLBalanceBUSDBSCXAuto();
            const tvlXAutoBNBBSC = await getTVLBalanceBNBBSCXAuto();

            const finalTvlXauto = await (await getUSDValueOfTVLXAuto(tvlXAutoUSDTBSC,tvlXAutoUSDCBSC,tvlXAutoBNBBSC,tvlXAutoBUSDBSC)).toFixed(2);
    
    
           
            const data={
                busd:apyBusd,
                usdt:apyUSDT,
                usdc:apyUSDC,
                usdtXauto:apyXAutoUSDT,
                bnbXauto:apyXAutoBNB,
                busdXauto:apyXAutoBUSD,
                usdcXauto:apyXAutoUSDC,
                tvlUSDTBsc:TVLUsdtBalance,
                tvlBUSDBsc:TVLBusdBalance,
                tvlUSDCBsc:TVLUsdcBalance,
                tvlUSDCBscXAuto:tvlXAutoUSDCBSC,
                tvlBUSDBscXAuto:tvlXAutoBUSDBSC,
                tvlUSDTBscXAuto:tvlXAutoUSDTBSC,
                tvlVBNBBscXAuto:tvlXAutoBNBBSC,
                TVL:totalTVLXVault,
                TVLXAuto:finalTvlXauto,
                lendingProtocol:reduxStateCurrent.lender
            };
            return data
        }
        else if(chainId==137){
            const TVLUsdtBalanceMatic = Number(await getTVLBalanceUSDTMatic());
            const TVLUsdcBalanceMatic = Number(await getTVLBalanceUSDCMatic());
            const TVLAaveBalanceMatic = Number(await getTVLBalanceAAVEMatic());
            const TVLWbtcBalanceMatic = Number(await getTVLBalanceWBTCMatic());

            const usdtValueOfTvl = await getUSDValueOfTVL(TVLUsdtBalanceMatic,TVLUsdcBalanceMatic,TVLAaveBalanceMatic,TVLWbtcBalanceMatic)
            const totalTVLXVault = usdtValueOfTvl;

            const WbtcApy = Number(await getAPRWBTCMatic()).toFixed(2);
            const UsdtApy = Number(await getAPRUSDTMatic()).toFixed(2);
            const UsdcApy = Number(await getAPRUSDCMatic()).toFixed(2);
            const AaveApy = Number(await getAPRAAVEMatic()).toFixed(2);

            const data={
                wbtcApyMatic:WbtcApy,
                usdtApyMatic:UsdtApy,
                usdcApyMatic:UsdcApy,
                aaveApyMatic:AaveApy,               
                tvlUSDTMatic:TVLUsdtBalanceMatic,
                tvlUSDCMatic:TVLUsdcBalanceMatic,
                tvlAAVE:TVLAaveBalanceMatic,
                tvlWBTC:TVLWbtcBalanceMatic,
                TVL:totalTVLXVault,
                TVLXAuto:'',
                lendingProtocol:reduxStateCurrent.lender
            };
            return data
        }else{
            const data={
                busd:'',
                usdt:'',
                usdc:'',
                usdtXauto:'',
                bnbXauto:'',
                busdXauto:'',
                usdcXauto:'',
                wbtcApyMatic:'',
                usdcApyMatic:'',
                usdtApyMatic:'',
                aaveApyMatic:'',
                tvlUSDCBscXAuto:'',
                tvlBUSDBscXAuto:'',
                tvlUSDTBscXAuto:'',
                tvlVBNBBscXAuto:'',
                tvlUSDTBsc:'',
                tvlBUSD:'',
                tvlUSDCBsc:'',
                tvlUSDTMAtic:'',
                tvlUSDCMatic:'',
                tvlAAVEMatic:'',
                tvlWBTCMatic:'',
                TVL:'',                
                TVLXAuto:'',
                lendingProtocol:''
            };
            return data
        }
       
       


       
    } catch (e) {
        console.log(e)
    }

}



export default getXVaultAPI;