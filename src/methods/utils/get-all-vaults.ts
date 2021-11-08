import vaultOptions from "../../utils/vault-config";

export const getVaults = () => {
   
   try {
    const vaultProtocols = vaultOptions;
    
    return vaultProtocols;

   } catch (error) {
       
   }
}