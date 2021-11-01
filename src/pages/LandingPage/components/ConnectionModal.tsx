
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../components/core/Modal';
import styled from 'styled-components';
import connectors from '../../../utils/connector-config';
// import { disconnect } from '../methods/redux/actions/contract-setup';
 import BSC from '../../../assets/images/bsc.svg';
// import { login } from '../utils/useAuth';
// import { connectorLocalStorageKey } from '../utils/config';
// import { changeProtocol } from '../methods/utils/protocol-settings';
// import { getCurrentSelectedNetwork } from '../methods/utils/get-current-network-selected';


interface ConnectionModalProps {
	open: boolean
	setOpen: Function
}


const ConnectionModal: FC<ConnectionModalProps> = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const address = useSelector((store: any) => store.ConnectWalletReducer.address);
	const walletInUse = useSelector((store: any) => store.ConnectWalletReducer.walletInUse);
	const apys = useSelector((store: any) => store.ConnectWalletReducer.apys);


	const [connectInfo, setConnectInfo] = useState({ network: null, protocol: null, wallet: null, chainId: null })

	//const [currentNetwork, setCurrentNetwork] = useState(getCurrentSelectedNetwork());
	const [currentNetwork, setCurrentNetwork] = useState();


	const disconnectWallet = () => {
		// setOpen(false);
		// dispatch(disconnect());
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 500)
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
						<SectionBody>
							<CardWrapper
								// onClick={() => setConnectInfo({
								// 	...connectInfo,
								// 	network: 'bsc',
								// 	chainId: 56,
								// 	protocol: null
								// })}>
                                >
								{
									connectInfo.network === 'bsc' &&
									<img className="check" src="check.svg" alt="check" />
								}
								<img src={BSC} width={40} alt='binance' />
								<div className="chain-name">Binance Smart Chain</div>
							</CardWrapper>
							<CardWrapper
								// onClick={() => setConnectInfo({
								// 	...connectInfo,
								// 	network: 'ethereum',
								// 	protocol: 'yearn',
								// 	chainId: 1
								// })}>
                                >
								{
									connectInfo.network === 'ethereum' &&
									<img className="check" src="check.svg" alt="check" />
								}
								<img src="eth.svg" width={40} alt='ethereum' />
								<div className="chain-name">Ethereum</div>
							</CardWrapper>
							<CardWrapper
								disabled
								// onClick={() => setConnectInfo({
								// 	...connectInfo,
								// 	network: 'polygon',
								// 	chainId: 137
								// })}>
                                >
								{
									connectInfo.network === 'polygon' &&
									<img className="check" src="check.svg" alt="check" />
								}
								<img src="polygon.svg" width={40} alt='polygon' />
								<div className="chain-name">Polygon</div>
							</CardWrapper>
						</SectionBody>
					</SectionWrapper>

					<SectionWrapper>
						<SectionHeader>
							<div className="number">2</div>
							<div className="modal-title">Choose Protocol</div>
						</SectionHeader>
						<SectionBody>

							{
								// apys.map((item, i) => (

								// 	<CardWrapper
								// 		key={i}
								// 		disabled={connectInfo.network !== 'bsc'}
								// 		onClick={() => setConnectInfo({
								// 			...connectInfo,
								// 			protocol: item.code
								// 		})}>
								// 		{
								// 			connectInfo.protocol === item.code &&
								// 			connectInfo.network === 'bsc' &&
								// 			<img className="check" src="check.svg" alt="check" />}
								// 		<img src={item.image} width={40} />
								// 		<div className="chain-name">
								// 			<p>{item.name}</p>
								// 			<p className="apy">{item.apy}%</p>
								// 		</div>
								// 	</CardWrapper>
								// ))
							}

						</SectionBody>
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

											// dispatch(login(entry.connectorId, connectInfo.chainId, entry.title));

											// window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);

											// if (connectInfo.protocol) {
											// 	changeProtocol(connectInfo.protocol)
											// }

											// setOpen(false);
											window.location.reload();
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
								<p style={{ color: '#959595' }}>Network</p>
								{currentNetwork === 56 ? <p>Binance Smart Chain</p> : null}
								{currentNetwork === 1 ? <p>Etherum Mainnet</p> : null}
								{currentNetwork === 137 ? <p>Polygon Mainnet</p> : null}

							</div>
						</ConnectInfoWrapper>

						<AddressInfoWrapper>
							<p style={{ color: '#959595' }}>Address</p>
							<AddressContainer>
								<div>
									<p>{address}</p>
								</div>
								<img src="copy.svg" alt="copy" />
							</AddressContainer>
						</AddressInfoWrapper>
					</CardContainer>

					<ActionContainer>
						<div>
							<img src="transaction.svg" alt="history" />
							<p>Transaction History</p>
						</div>
						<div onClick={disconnectWallet}>
							<img src="disconnect.svg" alt="disconnect" />
							<p>Disconnect</p>
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
	background: ${p => p.theme.background};
	border-radius: 6px;
	color: ${p => p.theme.fontAlt};
	font-size: 20px;
	font-weight: 600;
	line-height: 138%;
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
	}

	& .modal-title {
		font-weight: 600;
		font-size: 18px;
		margin-left: 20px;
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
	margin-bottom: 24px;

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