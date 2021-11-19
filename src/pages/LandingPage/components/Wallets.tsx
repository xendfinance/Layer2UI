import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Wallet } from '../../../../src/assets/icons/wallet.svg';
import Metamask from '../images/metamask.svg';
import connectors from '../../../utils/connector-config';
import { useWeb3React } from '@web3-react/core';
import truncateAddress from '../../../methods/utils/truncate-address';
import { themeLight } from '../../../theme';
import _const from '../../../methods/_const';
import retrieveAddress from '../../../methods/retrieve-address';
import saveAddress from '../../../methods/utils/save-address';
import { reacquireEmit } from '../../../methods/utils/event-fnc-recall';
import { addSettingsObjectToStorage } from '../../../methods/utils/intro-settings';
import getNativeBalance from '../../../methods/redux/actions/getBalances';
import { assignAddresses } from '../../../methods/utils/protocol-settings';
import getAllBalances from '../../../methods/contracts/getAllBalances';
import BSC from '../../../assets/images/bsc.svg';
import Polygon from '../../../assets/icons/polygon.svg';




interface WalletProps {
	setOpen: Function
}


const Wallets: FC<WalletProps> = ({ setOpen }) => {
	const dispatch = useDispatch();
	const { account } = useWeb3React();

	const { address, walletInUse, nativeBalance, chainId } = useSelector((store: any) => store.DashboardReducer)

	const [width, setWidth] = useState<number>(window.innerWidth);

	const [walletLogo, setWalletLogo] = useState('');
	const [networkLogo, setNetworkLogo] = useState('');




	function addressWork() {
		const localAddress = retrieveAddress();
		if (localAddress) {
			dispatch({
				type: _const.ADDRESS,
				payload: {
					address: localAddress,
				},
			});
		}

	}



	// main function handling the connection into the app
	const insideConnectWallet = (account: any) => {
		//console.log("Account Got ", account);
		saveAddress(account);
		dispatch({
			type: _const.ADDRESS,
			payload: { address: account },
		});

		const connectionDetails = JSON.parse(localStorage.getItem("CONNECTION_DETAILS"));
		if (connectionDetails) {
			dispatch(getNativeBalance(address, connectionDetails.chainId));
			dispatch(getAllBalances(account, connectionDetails.chainId));

			let path = window.location.pathname;
			path = path.length > 1 ? path.substring(1) : path;
			reacquireEmit(path);
		} else {

			dispatch(getNativeBalance(address, chainId));
			dispatch(getAllBalances(account, chainId));
			// dispatch({ type: _const.PRISTINE });
			let path = window.location.pathname;
			path = path.length > 1 ? path.substring(1) : path;
			reacquireEmit(path);
		}

	}




	// whenever address changes
	// useEffect(() => {
	// 	if (typeof account !== 'undefined' && account) {
	// 		insideConnectWallet(account);
	// 		// dispatch(connectWallet());
	// 	}
	// }, [account, address]);




	useEffect(() => {
		if (typeof address !== 'undefined' && address) {
			insideConnectWallet(address);
			// dispatch(connectWallet());
		}
	}, [address]);





	// runs once whenever the account is changed
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('accountsChanged', () => {
				// dispatch(connectWallet());
				if (typeof account !== 'undefined' && account) {
					insideConnectWallet(account);
				}
			});
		}
	}, []);


	// runs once when the network is changed
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('chainChanged', () => {
				// dispatch(connectWallet());
				if (typeof account !== 'undefined' && account) {
					insideConnectWallet(account);
				}
			});
		}
		// eslint-disable-next-line
	}, []);

	// runs once when metamask is disconnected
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum.on('disconnect', () => {

			});
		}
		// eslint-disable-next-line
	}, []);




	useEffect(() => {
		assignAddresses();
		addressWork();
		addSettingsObjectToStorage();

		// eslint-disable-next-line
	}, []);


	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	function handleRejectedCall() {

	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		window.addEventListener('unhandledrejection', handleRejectedCall);

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};

	}, []);


	const isMobile: boolean = width <= 768;
	function checkNetworkChainId() {
		if (isMobile) {
			return true;
		} else {
			if (typeof window.ethereum !== 'undefined') {
				const cc = window.ethereum.chainId;
				const co = _const.NETWORK_CHAINID;
				return !(typeof cc === 'string' && cc !== co);
			} else {
				const cc = 56;
				const co = _const.NETWORK_CHAINID;
				return !(typeof cc === 'string' && cc !== co);
			}
		}
	}




	useEffect(() => {

		const connectedWallet = connectors.filter(x => x.title === walletInUse);
		connectedWallet[0] && setWalletLogo(connectedWallet[0].image);

		const connectionDetails = JSON.parse(localStorage.getItem("CONNECTION_DETAILS"));
		if (connectionDetails) {
			if (connectionDetails.chainId == 56) {
				setNetworkLogo(BSC);
			} else {
				setNetworkLogo(Polygon);
			}
		} else {
			if (chainId == 56) {
				setNetworkLogo(BSC);
			} else {
				setNetworkLogo(Polygon);
			}
		}

	}, [address, walletInUse])




	return (
		<>

			<ConnectWalletStyle onClick={() => setOpen(true)}>

				{!address ?
					(<div className="not-connected">
						<figure>
							<Wallet />
						</figure>
						<p>Connect Wallet</p>
					</div>
					) : (
						<div>
							<span
								className="balance">{nativeBalance}</span>
							<figure
								className="connectedNetwork">
								<img
									src={networkLogo}
									alt="" />
							</figure>
							<div
								className="wallet">
								<figure
									className="connected">
									<img
										src={walletLogo} width={20} alt="" />
								</figure>
								<span
									className='address'>{truncateAddress(address)}</span>
							</div>
						</div>
					)
				}

			</ConnectWalletStyle>
		</>
	)
}

export default Wallets;


const ConnectWalletStyle = styled.button`
	border: none;
	display: flex;
	align-items: center;
	background: linear-gradient(100.89deg, #9C3F00 3.11%, #FF6600 122.62%);;
	min-width: max-content;
	max-height: 46px;
	border-radius: 38px;
	color: white;
	padding: 0;
	font-weight: 600;
	font-size: 12px;
	cursor: pointer;

	& > div {
		display: inline-flex;
		align-items: center;
	}


	& .wallet {
		background-color: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		padding: 10px;
		border-radius: 52px;
		margin-left: 10px;

	}

		& span.balance {
			padding: 2px 10px;
		}

	& figure {
		margin: 0;
		background: transparent;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	& figure.connected {
		background: white;
	}

	

	& figure.connectedNetwork {
		background: white;
		border-radius: 50%;
		height: 28px;
		width: 28px;

		& img {
			width: 24px;
		}
	}

	& .address {
		display: none;
	}


	& .not-connected {
		margin-left: 10px;
		margin-right: 10px;

		& figure + p {
			margin-left: 5px !important;
		}
	}

	@media (min-width: 900px) {
		background: linear-gradient(
			100.89deg, rgb(32, 66, 184) 3.11%, rgb(255, 102, 0) 122.62%);
		font-size: 14px;

		& .address {
			display: block;
			margin-left: 7px;
		}
	}

	@media (min-width: 300px) {
		background: linear-gradient(
			100.89deg, rgb(32, 66, 184) 3.11%, rgb(255, 102, 0) 122.62%);
		font-size: 14px;
	}
`;

