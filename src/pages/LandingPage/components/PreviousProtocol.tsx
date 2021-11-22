import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Asset } from "../../../methods/assets";
import { hydrateUsersProtocolBalance } from "../../../methods/hydrate";
import commas from "../../../methods/utils/commas";
import DepositeModal from "./DepositeModal";

interface IPreviousVersion {
	asset: Asset
	state: any
}
const PreviousVersion = ({ asset, state }: IPreviousVersion) => {
	const { address, hydrateSwitch } = useSelector((store: any) => store.DashboardReducer);

	const [balance, setBalance] = useState('0');
	const [open, setOpen] = useState(false);

	const getBalance = async () => {

		let userBalance = await hydrateUsersProtocolBalance({
			network: asset.network,
			abi: asset.protocolAbi,
			protocol: asset.protocolName,
			protocolAddress: asset.previousProtocol,
			user: address,
			tokenName: asset.name
		})
		setBalance(userBalance);
	}

	useEffect(() => {
		if (asset.previousProtocol) {
			getBalance();
		}

	}, [hydrateSwitch, asset, state])


	return (
		<>
			{
				asset.previousProtocol &&
				Number(balance) > 0.001 &&
				<V1Style>
					<Tooltip title="Withdraw from xVault V1">
						<QuestionCircleOutlined style={{ color: "#FF6600" }} />
					</Tooltip>
					<Tooltip title="Withdraw your funds from xVault V1">
						<button onClick={() => setOpen(true)}>{commas(balance)}</button>
					</Tooltip>
				</V1Style>
			}

			<DepositeModal
				asset={{ ...asset, protocolAddress: asset.previousProtocol }}
				open={open}
				setOpen={setOpen}
				balance={balance}
				vaultasset={state.vaultAsset}
				netAPY={state.apy}
				availableDeposite={state.availableFunds}
				notice="You should only withdraw your funds from this vault as it is deprecated." />
		</>
	)
}

export default PreviousVersion;


const V1Style = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	& button {
		border:none;
		margin-left: 5px;
		cursor: pointer;
		color:white;
		background: #FF6600;
		font-size: 16px;
		padding: 5px 10px;
		border-radius: 5px;
	}
`;