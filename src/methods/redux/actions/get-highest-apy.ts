
import reduxStore from "..";
import abiManager from "../../../abiManager";
import _const from "../../_const";

const Web3 = require('web3');
const BigNumber = require('bignumber.js');

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

 export function getHighestAPYModal(array:any){
    return Math.max.apply(null, array);
 }



const getHighestAPY = () => {

	return async (dispatch: Function) => {
      try {
        const apyXAutoBNB = await getAPRBNBXAutoBSC();
        const apyXAutoBUSD = await getAPRBUSDXAutoBSC();
        const apyXAutoUSDT = await getAPRUSDTXAutoBSC();
        const apyXAutoUSDC = await getAPRUSDCXAutoBSC();
    
        const apyArrayXAuto = [Number(apyXAutoBNB),Number(apyXAutoBUSD),Number(apyXAutoUSDT),Number(apyXAutoUSDC)];
    
        const highestAPYXAutoBSC =  getHighestAPYModal(apyArrayXAuto);
      
       
      

        const apyBusd = await getXVaultAPIBUSD();
        const apyUSDT = await getXVaultAPIUSDT();
        const apyUSDC = await getXVaultAPIUSDC();
        const apyArray = [Number(apyBusd),Number(apyUSDT),Number(apyUSDC),Number(apyUSDC)];

        const highestAPYXVaultBSC =  getHighestAPYModal(apyArray);
      
      

        const WbtcApy = Number(await getAPRWBTCMatic()).toFixed(2);
        const UsdtApy = Number(await getAPRUSDTMatic()).toFixed(2);
        const UsdcApy = Number(await getAPRUSDCMatic()).toFixed(2);
        const AaveApy = Number(await getAPRAAVEMatic()).toFixed(2);

        const apyArrayMatic = [Number(WbtcApy),Number(UsdtApy),Number(UsdcApy),Number(AaveApy)];
        const highestAPYXAutoMatic =  getHighestAPYModal(apyArrayMatic);
      

        dispatch({
            type: _const.HIGHESTAPYXVAULT,
            payload: {highestAPYXVaultBSC}
        });

        dispatch({
            type: _const.HIGHESTAPYXAUTOMATIC,
            payload: {highestAPYXAutoMatic}
        });

        dispatch({
            type: _const.HIGHESTAPYXAUTO,
            payload: {highestAPYXAutoBSC}
        });

      } catch (error) {
          
      }
    }
 }


//TVL Matic WBTC APR
const getAPRUSDTMatic = async() => {

    try {
      

       const web3Instance = new web3Matic.eth.Contract(abiManager.APYPoolMatic, '0xecD982D0bc4eF14684FB7Ece34a8543D8329bF47');
        
       if (web3Instance) {
 
       const USDTApy = await web3Instance.methods.recommend('0xc2132D05D31c914a87C6611C10748AEb04B58e8F').call();
     
       
       //const fortubeAPRNumber = Number(USDTApy.fapr); 
      
       const aaveAPR = Number(USDTApy.aapr); 
       const ftAPR = Number(USDTApy.ftapr); 
       
       //const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];
       const apyArray = [aaveAPR,ftAPR];

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
       
       //const fortubeAPRNumber = Number(USDCApy.fapr); 
      
       const aaveAPR = Number(USDCApy.aapr); 
       const ftAPR = Number(USDCApy.ftapr); 
       
       const apyArray = [aaveAPR,ftAPR];
      // const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];

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
       
       //const fortubeAPRNumber = Number(AAveApy.fapr); 
      
       const aaveAPR = Number(AAveApy.aapr); 
       const ftAPR = Number(AAveApy.ftapr); 
       
       //const apyArray = [fortubeAPRNumber,aaveAPR,ftAPR];
       const apyArray = [aaveAPR,ftAPR];

       const finalAaveApy =  getHighestAPYMatic(apyArray);

       const finalAaveAPYConverted = fromBigNumberMatic(finalAaveApy)*100000; 

       //const AaveFinalAPYConverted =finalAaveAPYConverted  *100000

       return finalAaveAPYConverted;
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
      
       
       //const fortubeAPRNumber = Number(WBTCApy.fapr); 
      
       const aaveAPR = Number(WBTCApy.aapr); 
       const ftAPR = Number(WBTCApy.ftapr); 
       
       const apyArray = [aaveAPR,ftAPR];

       const finalWBTCApy =  getHighestAPYMatic(apyArray);

       const finalWBTCAPYConverted = fromBigNumberMatic(finalWBTCApy)*10000000; 

     
   
       return finalWBTCAPYConverted;
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
       //const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted = finalBNBApy * Math.pow(10,-18);
      

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
       //const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,venusAPR];

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
       //const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted = finalBNBApy * Math.pow(10,-18);
     

       return finalBNBAPYConverted;

     
       }


       
    } catch (e) {
        console.log(e)
    }

}



 
//BSC BNB APR
const getAPRBNBXAutoBSC = async() => {

    try {
      

       const web3Instance = new web3.eth.Contract(abiManager.APYPoolBSC, '0x21026da06d8979982D325Fd3321bdcf439cC3bD8');
        
       if (web3Instance) {
 
       const BNBApy = await web3Instance.methods.recommend('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c').call();
      
       const alpcaAPRNumber = Number(BNBApy._alpaca); 
      
       const fortubeAPR = Number(BNBApy._fortube); 
       //const fulcrumAPR = Number(BNBApy._fulcrum); 
       const venusAPR = Number(BNBApy._venus); 
       
       const apyArray = [alpcaAPRNumber,fortubeAPR,venusAPR];

       const finalBNBApy =  getHighestAPYMatic(apyArray);

       const finalBNBAPYConverted =finalBNBApy * Math.pow(10,-18); 
     
       return finalBNBAPYConverted;
       }


       
    } catch (e) {
        console.log(e)
    }

}




export default getHighestAPY;