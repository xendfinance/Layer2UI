
export const getCurrentSelectedNetwork = () => {
   
   try {
    let connector: any = localStorage.getItem("CONNECTION_DETAILS");
    let { chainId } = JSON.parse(connector);

    console.log("CHAIN ID RETREIVE ",chainId);
    return chainId;

   } catch (error) {
       
   }
}