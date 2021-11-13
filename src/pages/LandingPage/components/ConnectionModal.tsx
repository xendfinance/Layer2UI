
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../components/core/Modal';
import styled from 'styled-components';
import connectors from '../../../utils/connector-config';
// import { disconnect } from '../methods/redux/actions/contract-setup';
 import BSC from '../../../assets/images/bsc.svg';
 import Polygon from '../../../assets/icons/polygon.svg';
 import Check from '../../../assets/icons/check.svg';
 import Copy from '../../../assets/icons/copy.svg';
 import Disconnect from '../../../assets/icons/disconnect.svg';
 import Transaction from '../../../assets/icons/transaction.svg';
import { getVaults } from '../../../methods/utils/get-all-vaults';
import { Login } from '../../../utils/useAuth';
import { connectorLocalStorageKey } from '../../../utils/config';
import { getCurrentSelectedNetwork } from '../../../methods/utils/get-current-network-selected';
import { disconnect } from '../../../methods/redux/actions/contract-setup';
import _const from '../../../methods/_const';



interface ConnectionModalProps {
	open: boolean
	setOpen: Function
}


const ConnectionModal: FC<ConnectionModalProps> = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const address = useSelector((store: any) => store.DashboardReducer.address);
	const walletInUse = useSelector((store: any) => store.DashboardReducer.walletInUse);
	
    const highestXAutoBSC = useSelector((store: any) => store.DashboardReducer.highestApyXAutoBsc);
    const highestXVaultBSC = useSelector((store: any) => store.DashboardReducer.highestApyXVaultBsc);
    const highestXAutoMatic = useSelector((store: any) => store.DashboardReducer.highestApyXAutoMatic);
    
    
	let highestAPYXAuto = '0.00';
	let highestAPYXVault = '0.00';
	let highestAPYXAutoMatic= '0.00';

    if(highestXAutoBSC && highestXVaultBSC && highestXAutoMatic){
		 highestAPYXAuto = Number(highestXAutoBSC.highestAPYXAutoBSC).toFixed(2);
		 highestAPYXVault = Number(highestXVaultBSC.highestAPYXVaultBSC).toFixed(2);
		 highestAPYXAutoMatic = Number(highestXAutoMatic.highestAPYXAutoMatic).toFixed(2);
	}
	

    
	const vaults = [
		{
			code: 'X Vault',
			image: BSC,
			name: 'xVault',
			apy: highestAPYXVault,
			chainId: 56,
			network:'bsc',		
		},
		{
			code: 'X Auto',
			image: BSC,
			name: 'xAuto',
			apy: highestAPYXAuto,
			chainId: 56,
            network:'bsc',			
		},
		{
			code: 'X Auto',
			image: Polygon,
			name: 'xAuto',
			apy: highestAPYXAutoMatic,
			chainId: 137,
			network:'polygon'			
		},      
	];
	
    

	const [connectInfo, setConnectInfo] = useState({ network: null, protocol: null, wallet: null, chainId: null })	



	const [currentNetwork, setCurrentNetwork] = useState(getCurrentSelectedNetwork());
	const {chainId} = useSelector((store: any) => store.DashboardReducer)

	const disconnectWallet = () => {		
		setOpen(false);
		dispatch(disconnect());
		setTimeout(() => {
			window.location.reload();
		}, 500)
	}

    
	return (
		<>
	
			{!address ? (
				<Modal
					title="Connect Wallet"
					desc="You can connect your wallet to a different protocol to increase your earning"
					visible={open}
					width="992px"
					close={() => setOpen(false)}>
					<div>
						<InfoWrapper>
							By connecting a wallet, you agree and acknowledge that you have read and accept Xend Finance's
							&nbsp; <a href="#" style={{ textDecoration: "underline", color: "#6F89E4" }}>Terms of Service</a> and <a href="#" style={{ textDecoration: "underline", color: "#6F89E4" }}>Privacy Policy</a>
						</InfoWrapper>
					</div>

					<SectionWrapper>
						<SectionHeader>
							<div className="number">1</div>
							<div className="modal-title">Choose Network</div>
						</SectionHeader>
						<SectionBodyNetwork>
							<CardWrapperNetwork
									onClick={() => {setConnectInfo({
										...connectInfo,
										network: 'bsc',
										chainId: 56,
										protocol: null,										
									})								
								   
								    }									
									}>
                                
								{
									connectInfo.network === 'bsc' &&
									<img className="check" src={Check} alt="check" />
								}
								<img src={BSC} width={40} alt='binance' />
								<div className="chain-name">Binance Smart Chain</div>
							</CardWrapperNetwork>
							<CardWrapperNetwork
								onClick={() => setConnectInfo({
									...connectInfo,
									network: 'polygon',
									protocol: 'XAuto',
									chainId: 137								
								})}>
								{
									connectInfo.network === 'polygon' &&
									<img className="check" src={Check} alt="check" />
								}
								<img src={Polygon} width={40} alt='polygon' />
								<div className="chain-name">Polygon</div>
							</CardWrapperNetwork>
						
						</SectionBodyNetwork>
					</SectionWrapper>

					<SectionWrapper>
						<SectionHeader>
							<div className="number">2</div>
							<div className="modal-title">Choose Protocol</div>
						</SectionHeader>
						<SectionBodyNetwork>

							{
								vaults.map((item, i) => (
                                 <>
								 {
                                 connectInfo.network == item.network &&
								 <CardWrapperNetwork
										key={i}
									
										onClick={() => setConnectInfo({
											...connectInfo,
											protocol: item.code
										})}>
										   {
											connectInfo.protocol === item.code &&
											connectInfo.network === 'bsc' &&
											<img className="check" src={Check} alt="check" />}
											{											
											connectInfo.network === 'polygon' &&										
											<img className="check" src={Check} alt="check" />}
									 
										<img src={item.image} width={40} />
										<div className="chain-name">
											<p>{item.name}</p>
											<p className="apy">{item.apy}%</p>
										</div>
									</CardWrapperNetwork>
                                   
                                 }
									
								</>
								))
							}

						</SectionBodyNetwork>
					</SectionWrapper>

					<SectionWrapper>
						<SectionHeader>
							<div className="number">3</div>
							<div className="modal-title">Choose Wallet</div>
						</SectionHeader>
						<SectionBody>
							{
								connectors.map((entry, i) => (
									<CardWrapper
										key={i}
										disabled={!connectInfo.network || !connectInfo.protocol}
										onClick={() => {

											// 1. should connect to the right network
											// 2. switch to correct address
											// 3. continue with wallet connection

											dispatch(Login(entry.connectorId, connectInfo.chainId,connectInfo.protocol, entry.title));

										    window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
											 setOpen(false);
											//window.location.reload();
										}
										}>
										<img width={40} src={entry.image} alt={entry.title} />
										<div className="chain-name">{entry.title}</div>
									</CardWrapper>
								))
							}
						</SectionBody>
					</SectionWrapper>
				</Modal>
			) : (
				<Modal
					title="Connected account"
					desc={`You are connected with ${walletInUse}`}
					visible={open}
					close={() => setOpen(false)}>
					<CardContainer>
						<ConnectInfoWrapper>
							<div>
								<p style={{ color:'#edecec' }}>Network</p>
								{chainId === 56 ? <p style={{ color:'#edecec' }}>Binance Smart Chain</p> : null}								
								{chainId === 137 ? <p style={{ color:'#edecec' }}>Polygon Mainnet</p> : null}

							</div>
						</ConnectInfoWrapper>

						<AddressInfoWrapper>
							<p style={{ color:'#edecec' }}>Address</p>
							<AddressContainer>
								<div>
									<p style={{ color:'#edecec' }}>{address}</p>
								</div>
								<img style={{ backgroundColor:'#edecec' }} src={Copy} alt="copy" />
							</AddressContainer>
						</AddressInfoWrapper>
					</CardContainer>

					{chainId == 56 ?
					(
						<SectionWrapper>
						<SectionHeader>							
							<div style={{ color:'#edecec' }} className="modal-title">Select Protocol</div>
						</SectionHeader>
						<SectionBodyNetwork>							
								<CardWrapperNetwork
								onClick={() => {
		
									//Switch Vaults
									dispatch({
										type: _const.LENDER,
										payload: { lenderProtocol: 'X Vault'}
									});
									setOpen(false);
								}
								}>
								<img src={BSC} width={40} alt='polygon' />
								<div className="chain-name">
								  <p style={{ color:'#090909' }}>xVault</p>
								  <p className="apy">{highestAPYXVault}%</p>
								</div>
							</CardWrapperNetwork>
		
							<CardWrapperNetwork
								onClick={() => {
		
									//Switch Vaults
									dispatch({
										type: _const.LENDER,
										payload: { lenderProtocol: 'X Auto'}
									});
									setOpen(false);
								}
								}>
								<img src={BSC} width={40} alt='polygon' />
								<div className="chain-name">
								<p style={{ color:'#090909' }}>xAuto</p>
								<p className="apy">{highestAPYXAuto}%</p>	
								</div>
							</CardWrapperNetwork>
						</SectionBodyNetwork>
					</SectionWrapper>
				
					
					) : (<div></div>)
					
                    }

					<ActionContainer>						
						<div onClick={disconnectWallet}>
							<img style={{ backgroundColor:'#edecec' }} src={Disconnect} alt="disconnect" />
							<p style={{ color:'#edecec' }}>Disconnect</p>
						</div>
					</ActionContainer>
                   
				</Modal >
			)}
		</>
	)
}


export default ConnectionModal;




const InfoWrapper = styled.div`
	padding: 28px;
	background:beige;
	border-radius: 6px;
	color: ${p => p.theme.fontAlt};
	font-size: 20px;
	font-weight: 600;
	line-height: 138%;
`


const CardWrapperNetwork = styled.button`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	margin-right: 15px;
  	height: 78px;
	font-size: 18px;
	font-weight: 500;
	background: ${p => p.theme.cardBg};
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 16px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background: ${p => p.theme.disabledBtnBg};
	}

	@media (min-width: 768px){
		width: 32%;
	}

	& .chain-name {
		margin-left: 16px;
		color: ${p => p.theme.fontAlt};
	}

	& .apy {
		color: ${p => p.theme.fontAlt};
		font-size: 14px;
		font-weight: 600;
	}

	& .check {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(30%, -30%);
	}
`

const CardWrapper = styled.button`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
  	height: 78px;
	font-size: 18px;
	font-weight: 500;
	background: ${p => p.theme.cardBg};
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 16px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background: ${p => p.theme.disabledBtnBg};
	}

	@media (min-width: 768px){
		width: 32%;
	}

	& .chain-name {
		margin-left: 16px;
		color: ${p => p.theme.fontAlt};
	}

	& .apy {
		color: ${p => p.theme.fontAlt};
		font-size: 14px;
		font-weight: 600;
	}

	& .check {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(30%, -30%);
	}
`

const SectionWrapper = styled.div`
	margin-top: 40px;
`

const SectionHeader = styled.div`
	display: flex;
	margin: 16px 0px;
	align-items: center;

	& .number {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		width: 26px;
		background: ${p => p.theme.background};
		color: ${p => p.theme.fontAlt};
		font-weight: 600;
		font-size: 18px;
		border-radius: 50%;
		color:#edecec;
	}

	& .modal-title {
		font-weight: 600;
		font-size: 18px;
		margin-left: 20px;
		color:#edecec;
	}
`

const SectionBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;

	@media (min-width: 768px){
		flex-direction: row;
		justify-content: space-between;
	}
`


const SectionBodyNetwork = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;

	@media (min-width: 768px){
		flex-direction: row;
		
	}
`


const CardContainer = styled.div`	
	margin-top: 32px;
	border: 1px solid ${p => p.theme.border};
	box-sizing: border-box;
	box-shadow: 0px 3.51724px 36.0517px rgba(0, 0, 0, 0.06);
	border-radius: 14.7847px;
	padding: 24px;
`

const ConnectInfoWrapper = styled.div`
	display: flex;
	margin-bottom: 60px;

	& > div {
		height: 48px;
		display: flex;
		flex-direction: column;
		flex: auto;
		justify-content: space-between;
	}
`


const AddressInfoWrapper = styled.div`
	margin: 8px 0;

	& p {
		margin-bottom: 16px;
	}
`

const AddressContainer = styled.div`
	display: flex;
	align-items: center;

	& > div {
		border: 1px solid ${p => p.theme.border};
		box-sizing: border-box;
		flex-grow: 1;
		border-radius: 34px;
		padding: 16px;
		display: flex;
		margin-right: 16px;
		overflow-x: auto;
		justify-content: center;
		align-items: center;
		
		& > p {
			margin: 0;
			color: ${p => p.theme.fontAlt};
		}
	}
`

const ActionContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;

	& div {
		cursor: pointer;
		display: flex;
		align-items: center; 
		margin-bottom: 10px;

		& p {
			margin-left: 8px
		}
	}

	@media (min-width: 768px){
		flex-direction: row;
		justify-content: space-between;
	}
`