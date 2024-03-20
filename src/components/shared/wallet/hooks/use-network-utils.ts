"use client";

import { networkAtom } from "@/components/bridge/state/atoms";
import { ChainInfo } from "@/components/shared/enums/chain-info";
import { Tokens } from "@/components/shared/tokens/tokens";
import {
	mainnet as L2Mainnet,
	sepolia as L2Sepolia,
} from "@starknet-react/chains";
import { useAtom } from "jotai";
import { mainnet as L1Mainnet, sepolia as L1Sepolia } from "wagmi/chains";

export const networkOptions: NetworkType[] = ["mainnet", "sepolia"];
export type NetworkType = "mainnet" | "sepolia";

export const useNetworkUtils = () => {
	const [network, setNetwork] = useAtom(networkAtom);

	const isSepolia = network === "sepolia";
	const isMainnet = network === "mainnet";
	const isTestnet = isSepolia;
	const setSepolia = () => setNetwork("sepolia");
	const setMainnet = () => setNetwork("mainnet");
	const setL1NetworkByChainId = (chainId: number) => {
		switch (chainId) {
			case L1Sepolia.id:
				setSepolia();
				break;
			case L1Mainnet.id:
				setMainnet();
				break;
			default:
				throw new Error("Unsupported chainId");
		}
	};
	const isL1NetworkByChainId = (chainId: number) => {
		switch (chainId) {
			case L1Sepolia.id:
				return isSepolia;
			case L1Mainnet.id:
				return isMainnet;
			default:
				return false;
		}
	};

	const getCurrentL1NetworkId = () => {
		switch (network) {
			case "sepolia":
				return L1Sepolia.id;
			case "mainnet":
				return L1Mainnet.id;
			default:
				throw new Error("Unsupported network");
		}
	};

	const isL2NetworkByChainId = (chainId: bigint) => {
		switch (chainId) {
			case L2Sepolia.id:
				return isSepolia;
			case L2Mainnet.id:
				return isMainnet;
			default:
				return false;
		}
	};

	// etherscan.com/tx/0x...
	const getL1ExplorerUrl = (hash: string) => {
		switch (network) {
			case "sepolia":
				return `${ChainInfo.L1.sepolia.EXPLORER_URL}tx/${hash}`;
			case "mainnet":
				return `${ChainInfo.L1.mainnet.EXPLORER_URL}tx/${hash}`;
			default:
				throw new Error("Unsupported network");
		}
	};

	// starkscan.com/eth-tx/0x...
	const getL1ToL2ExplorerUrl = (hash: string) => {
		switch (network) {
			case "sepolia":
				return `${ChainInfo.L2.sepolia.EXPLORER_URL}eth-tx/${hash}`;
			case "mainnet":
				return `${ChainInfo.L2.mainnet.EXPLORER_URL}eth-tx/${hash}`;
			default:
				throw new Error("Unsupported network");
		}
	};

	// starkscan.com/tx/0x...
	const getL2ExplorerUrl = (hash: string) => {
		switch (network) {
			case "sepolia":
				return `${ChainInfo.L2.sepolia.EXPLORER_URL}tx/${hash}`;
			case "mainnet":
				return `${ChainInfo.L2.mainnet.EXPLORER_URL}tx/${hash}`;
			default:
				throw new Error("Unsupported network");
		}
	};

	const getL1EstimatedTime = () => {
		return isTestnet ? 5 : 2;
	};

	const getL2EstimatedTime = () => {
		return 12;
	};

	// ESCROW_CONTRACT_ADDRESS
	const getWithdrawalAddress = (): string => {
		return process.env.NEXT_PUBLIC_WITHDRAWAL_ADDRESS as string;
	};

	// STARKGATE_BRIDGE_ADDRESS
	const getDepositAddress = (): `0x${string}` => {
		return process.env.NEXT_PUBLIC_DEPOSIT_ADDRESS as `0x${string}`;
	};

	/**
		Tokens.L1.ETH.bridgeAddress.goerli,
		Tokens.L2.ETH.bridgeAddress.goerli
	 */
	const getStarkgateAddressData = (): {
		l1EthBridgeAddress: string;
		l2EthBridgeAddress: string;
	} => {
		switch (network) {
			case "sepolia":
				return {
					l1EthBridgeAddress: Tokens.L1.ETH.bridgeAddress.sepolia,
					l2EthBridgeAddress: Tokens.L2.ETH.bridgeAddress.sepolia,
				};
			case "mainnet":
				return {
					l1EthBridgeAddress: Tokens.L1.ETH.bridgeAddress.mainnet,
					l2EthBridgeAddress: Tokens.L2.ETH.bridgeAddress.mainnet,
				};
			default:
				throw new Error("Unsupported network");
		}
	};

	return {
		network,
		isSepolia,
		isMainnet,
		isTestnet,
		setSepolia,
		setMainnet,
		setNetwork,
		setL1NetworkByChainId,
		isL1NetworkByChainId,
		isL2NetworkByChainId,
		getCurrentL1NetworkId,
		getL1ExplorerUrl,
		getL1ToL2ExplorerUrl,
		getL2ExplorerUrl,
		getL1EstimatedTime,
		getL2EstimatedTime,
		getWithdrawalAddress,
		getDepositAddress,
		getStarkgateAddressData,
	};
};
