"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, Twitter, X } from "lucide-react";
import TokenModal from "./components/TokenModal";
// import logo from "/img/Bridge - Manta Pacific/manta-pacific-logo.svg";
// import theCover from "./img/Bridge - Manta Pacific/banner-bounce.png";

const ecosystemProjects = [
  {
    name: "Omni",
    description:
      "Stake your MANTA on Manta Pacific with a 29% floating APR! Start liquid staking and get vMANTA Now",
    icon: "/img/Bridge - Manta Pacific/Omni.png",
    url: "https://omni.ls/",
  },
  {
    name: "QuickSwap",
    description:
      "QuickSwap is a next-gen #DEX for #DeFi. Trade at lightning-fast speeds with near-zero gas fees.",
    icon: "/img/Bridge - Manta Pacific/Quickswap.png",
    url: "https://quickswap.exchange/",
  },
  {
    name: "Aperture Finance",
    description:
      "Pioneering LP management w/ intent-based architectures on @uniswap V3.",
    icon: "/img/Bridge - Manta Pacific/ApertureFinance.png",
    url: "https://app.aperture.finance/",
  },
  {
    name: "ApolloX",
    description:
      "Top Crypto Derivatives DEX Trade On-Chain & Orderbook Futures with leverage",
    icon: "/img/Bridge - Manta Pacific/ApolloX.png",
    url: "https://www.apollox.finance/en",
  },
  {
    name: "KiloEx",
    description:
      "Next generation perp DEX. Lightning-fast trades,risk-neutral positions and LP-friendly solutions.",
    icon: "/img/Bridge - Manta Pacific/KiloEx.png",
    url: "https://app.kiloex.io/#/trade",
  },
  {
    name: "Pacificswap",
    description: "Creating native DEX and other DeFi products.",
    icon: "/img/Bridge - Manta Pacific/Pacificswap.png",
    url: "https://pacificswap.xyz/swap",
  },
  {
    name: "GullNetwork",
    description:
      "The go-to DEX & token launch solution built on @MantaNetwork.",
    icon: "/img/Bridge - Manta Pacific/gullNetwork.png",
    url: "https://www.gullnetwork.com/",
  },
  {
    name: "Izumi",
    description:
      "Liquidity Redefined - A multi-chain DeFi protocol providing One-Stop Liquidity as a Service (LaaS).",
    icon: "/img/Bridge - Manta Pacific/Izumi.png",
    url: "https://izumi.finance/home",
  },
  {
    name: "DoDo",
    description:
      "Decentralized Trading Protocol for Web3, powered by the DODO PMM algorithm; aggregator with deep on-chain liquidity.",
    icon: "/img/Bridge - Manta Pacific/DoDo.png",
    url: "https://app.dodoex.io/swap/network/manta",
  },
  {
    name: "WOWMAX.Exchange",
    description:
      "WOWMAX is the next generation DEX aggregation protocol that uses slippage as an additional source of optimization.",
    icon: "/img/Bridge - Manta Pacific/WOWMAX.png",
    url: "https://wowmax.exchange/",
  },
  {
    name: "OpenOcean",
    description:
      "The first full aggregation protocol for crypto trading that sources liquidity from DeFi and CeFi markets.",
    icon: "/img/Bridge - Manta Pacific/OpenOcean.png",
    url: "https://app.openocean.finance/classic#/MANTA/ETH/USDC",
  },
  {
    name: "Goku.money",
    description:
      "http://Goku.Money is the decentralized reserve bank on @MantaNetwork. Borrow GAI high-capital efficiency stablecoin, using your favorite cryptos!",
    icon: "/img/Bridge - Manta Pacific/Gokumoney.png",
    url: "https://galxe.com/",
  },
  {
    name: "AsMatch",
    description: "The premiere web3 matching app",
    icon: "/img/Bridge - Manta Pacific/AsMatch.png",
    url: "https://www.asmatch.app/",
  },
  {
    name: "zkHoldem",
    description:
      "On-chain Texas Hold'em, powered by #ZKP and #HomomorphicEncryption",
    icon: "/img/Bridge - Manta Pacific/zkHoldem.png",
    url: "https://zkholdem.xyz/",
  },
  {
    name: "Gabby World",
    description: "Ai related full onchain game",
    icon: "/img/Bridge - Manta Pacific/GabbyWorld.png",
    url: "https://www.gabby.world/",
  },
];

const thirdPartyBridges = [
  {
    name: "Binance",
    description: "Bridging ETH to multiple chains in just a few minutes.",
    icon: "/img/Bridge - Manta Pacific/Quickswap.png",
    url: "https://www.binance.com/",
  },
  {
    name: "Layerswap",
    description: "Move crypto across exchanges, blockchains, and wallets.",
    icon: "/img/Bridge - Manta Pacific/Layerswap.png",
    url: "https://www.layerswap.io/app",
  },
  {
    name: "Rhino Fi",
    description:
      "The worlds best multichain DeFi aggregator, from one self-custodial layer 2 wallet. Bridge. Trade. Swap. Invest. Earn.",
    icon: "/img/Bridge - Manta Pacific/RhinoFi.png",
    url: "https://app.rhino.fi/bridge?token=ETH&chainOut=MANTA&chain=ETHEREUM",
  },
  {
    name: "Meson",
    description:
      "Meson provides minute-fast swaps with almost-zero fee & slippage across all chains",
    icon: "/img/Bridge - Manta Pacific/Meson.png",
    url: "https://meson.fi/",
  },
  {
    name: "Orbiter",
    description:
      "Orbiter Finance is a decentralized cross-rollup Layer 2 bridge",
    icon: "/img/Bridge - Manta Pacific/Orbiter.png",
    url: "https://www.orbiter.finance/?source=Ethereum&dest=Manta&token=ETH",
  },
  {
    name: "Owlto",
    description:
      "Owlto Finance is a decentralized cross-rollup bridge that focuses on L2",
    icon: "/img/Bridge - Manta Pacific/Owlto.png",
    url: "https://owlto.finance/",
  },
  {
    name: "Minibridge",
    description:
      "Mini Bridge offers 0 bridge fees and ensures a minimum gas cost",
    icon: "/img/Bridge - Manta Pacific/Minibridge.png",
    url: "https://minibridge.chaineye.tools/",
  },
  {
    name: "Symbiosis",
    description:
      "Symbiosis is a cross-chain DEX that helps to bridge funds to Manta from 25 chains",
    icon: "/img/Bridge - Manta Pacific/Symbiosis.jpeg",
    url: "https://app.symbiosis.finance/swap?amountIn=&chainIn=Ethereum&chainOut=Manta&tokenIn=ETH&tokenOut=0x95CeF13441Be50d20cA4558CC0a27B601aC544E5",
  },
  {
    name: "Oku",
    description:
      "Oku Bridge aggregates 11 of the best bridges onchain to provide the cheapest and fastest crosschain routes.",
    icon: "/img/Bridge - Manta Pacific/oku.webp",
    url: "https://oku.trade/app/manta/bridge",
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [chooseNetwork, setChooseNetwork] = useState("Mainnet");
  const [selectedToken, setSelectedToken] = useState({
    name: "Ethereum",
    address: "",
    symbol: "ETH",
    image: "/img/Bridge - Manta Pacific/ethereum-eth-logo.png",
  });
  const [activeTab, setActivetab] = useState("Deposit");
  const [activeTab2, setActiveTab2] = useState("Withdrawals");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNetwork, setIsOpenNetwork] = useState(false);
  const dropdownRef = useRef(null);

  // Toggles the dropdown menu open and closed
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownNetwork = () => {
    setIsOpenNetwork(!isOpenNetwork);
  };

  // Detects clicks outside the dropdown menu to close it
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
      setIsOpenNetwork(false);
    }
  };

  // Add event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-black">
      {/* Header */}
      <header className=" bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4 py-5 md:flex items-center justify-between">
          <div className="md:flex hidden items-center space-x-2">
            <Image
              src="/img/Bridge - Manta Pacific/manta-pacific-logo.svg"
              alt="Manta Pacific Logo"
              width={202}
              height={32}
            />
            {/* <span className="font-bold text-lg">MANTA PACIFIC</span> */}
          </div>
          <div className="flex items-center md:gap-8 justify-between">
            <div
              onClick={() => setIsBarOpen(!isBarOpen)}
              className="md:hidden block"
            >
              {isBarOpen ? <Menu /> : <X />}
            </div>
            <nav
              ref={dropdownRef}
              className=" flex font-[600] items-center gap-6"
            >
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="md:flex hidden py-2 px-4  cursor-pointer rounded-[10px] hover:bg-[#f4f7fa] items-center"
                >
                  Buy Crypto <ChevronDown className="ml-1 w-4 h-4" />
                </div>
                <div
                  className={`${
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  } transform transition-all z-[30] duration-300 ease-out origin-top-right absolute right-0 mt-3 w-[130px] rounded-lg shadow-lg bg-white`}
                >
                  <ul className="py-1">
                    <li
                      onClick={() => window.open("/onramp", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Onramp Money
                    </li>
                    <li
                      onClick={() => window.open("/alchemy-pay", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400] py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Alchemy Pay
                    </li>
                    <li
                      onClick={() => window.open("/open-crypto", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      OpenCrypto
                    </li>
                    <li
                      onClick={() => window.open("/paybis", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Paybis
                    </li>
                  </ul>
                </div>
              </div>
              <div
                onClick={() =>
                  window.open("https://manta.network/ecosystem.html", "_blank")
                }
                className=" md:block hidden py-2 cursor-pointer rounded-[10px] hover:bg-[#f4f7fa] px-4"
              >
                Ecosystem
              </div>
              <div className="relative">
                <div
                  onClick={toggleDropdownNetwork}
                  className="flex py-2 px-4 rounded-[10px] hover:bg-[#f4f7fa] items-center"
                >
                  {chooseNetwork} <ChevronDown className="ml-1 w-4 h-4" />
                </div>
                <div
                  className={`${
                    isOpenNetwork
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  } transform transition-all z-[30] duration-300 ease-out origin-top-right absolute right-0 mt-3 w-[150px] rounded-lg shadow-lg bg-white`}
                >
                  <ul className="py-1">
                    <li
                      onClick={() => {
                        setIsOpenNetwork(false);
                        setChooseNetwork("Mainnet");
                      }}
                      className={`px-4 cursor-pointer text-[#485160] text-sm ${
                        chooseNetwork === "Mainnet"
                          ? "font-[600]"
                          : "font-[400]"
                      } py-2 hover:bg-gray-100 cursor-pointer`}
                    >
                      Mainnet
                    </li>
                    <li
                      onClick={() => {
                        setIsOpenNetwork(false);
                        setChooseNetwork("Sepolia Testnet");
                      }}
                      className={`px-4 text-[#485160] text-sm ${
                        chooseNetwork === "Sepolia Testnet"
                          ? "font-[600]"
                          : "font-[400]"
                      } py-2 hover:bg-gray-100 cursor-pointer`}
                    >
                      Sepolia Testnet
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:flex hidden gap-4">
                <Image
                  src="/img/Bridge - Manta Pacific/medium-icon.svg"
                  alt="Manta Pacific Logo"
                  width={24}
                  height={24}
                />{" "}
                <Image
                  src="/img/Bridge - Manta Pacific/twitter-icon.svg"
                  alt="Manta Pacific Logo"
                  width={24}
                  height={24}
                />{" "}
                <Image
                  src="/img/Bridge - Manta Pacific/discord-icon.svg"
                  alt="Manta Pacific Logo"
                  width={24}
                  height={24}
                />{" "}
              </div>
            </nav>
            <button className="bg-white text-black border border-black rounded-[10px] px-4 py-2 md:text-lg text-sm font-medium">
              Connect Wallet
            </button>
          </div>
          {!isBarOpen && (
            <div className="md:hidden block py-4 font-semibold">
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="md:hidden flex py-2 px-4  cursor-pointer rounded-[10px] hover:bg-[#f4f7fa] items-center"
                >
                  Buy Crypto <ChevronDown className="ml-1 w-4 h-4" />
                </div>
                <div
                  className={`${
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  } transform transition-all z-[30] duration-300 ease-out origin-top-right absolute right-0 mt-3 w-[130px] rounded-lg shadow-lg bg-white`}
                >
                  <ul className="py-1">
                    <li
                      onClick={() => window.open("/onramp", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Onramp Money
                    </li>
                    <li
                      onClick={() => window.open("/alchemy-pay", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400] py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Alchemy Pay
                    </li>
                    <li
                      onClick={() => window.open("/open-crypto", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      OpenCrypto
                    </li>
                    <li
                      onClick={() => window.open("/paybis", "_blank")}
                      className="px-4 text-[#485160] text-sm font-[400]  py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Paybis
                    </li>
                  </ul>
                </div>
              </div>
              <div
                onClick={() =>
                  window.open("https://manta.network/ecosystem.html", "_blank")
                }
                className=" md:hidden block py-2 cursor-pointer rounded-[10px] hover:bg-[#f4f7fa] px-4"
              >
                Ecosystem
              </div>
              <div className="md:hidden block gap-4 ">
                <div className="flex items-center gap-1 p-4">
                  <Image
                    src="/img/Bridge - Manta Pacific/medium-icon.svg"
                    alt="Manta Pacific Logo"
                    width={24}
                    height={24}
                  />{" "}
                  <p>Medium</p>
                </div>
                <div className="flex items-center gap-1 p-4">
                  <Image
                    src="/img/Bridge - Manta Pacific/twitter-icon.svg"
                    alt="Manta Pacific Logo"
                    width={24}
                    height={24}
                  />{" "}
                  <p>Twitter</p>
                </div>
                <div className="flex items-center gap-1 p-4">
                  <Image
                    src="/img/Bridge - Manta Pacific/discord-icon.svg"
                    alt="Manta Pacific Logo"
                    width={24}
                    height={24}
                  />{" "}
                  <p>Discord</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className=" pb-16">
        {/* Banner */}
        <div
          onClick={() => window.open("https://cedefi.manta.network/", "_blank")}
          className="relative flex items-center justify-center  p-4 text-center"
          style={{
            backgroundImage:
              "url('/img/Bridge - Manta Pacific/banner-bounce.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className="absolute inset-0 bg-black opacity-50"></div>{" "} */}
          {/* Optional overlay */}
          <div className="flex  gap-2 items-center ">
            <p className="relative text-black font-bold text-sm ">
              Stake your assets on Manta CeDefi now to earn CeFi/DeFi yield &
              Manta token rewards.
            </p>
            <Image
              src="/img/Bridge - Manta Pacific/black-arrow.svg"
              alt="Manta Pacific Logo"
              width={20}
              height={20}
            />{" "}
          </div>
        </div>

        <div className="container relative mx-auto md:px-12 mt-[60px]">
          <div className="lg:flex  gap-4">
            <div className=" lg:w-[50%] gap-4">
              {/* Deposit/Withdraw Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActivetab("Deposit")}
                      className={` ${
                        activeTab === "Deposit"
                          ? "font-bold text-black"
                          : "text-gray-400"
                      } md:text-[28px] text-[18px] `}
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => setActivetab("Withdraw")}
                      className={` ${
                        activeTab === "Withdraw"
                          ? "font-bold text-black"
                          : "text-gray-400"
                      } md:text-[28px] text-[18px] `}
                    >
                      Withdraw
                    </button>
                  </div>
                  <button
                    onClick={() => setActivetab("History")}
                    className={` ${
                      activeTab === "History"
                        ? "font-bold text-black"
                        : "text-gray-400"
                    } md:text-[28px] text-[18px] `}
                  >
                    History
                  </button>
                </div>
                {activeTab === "Deposit" ? (
                  <div>
                    <div className="bg-[#f9fafb] p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#a5abb7] font-medium">
                          From: Ethereum Mainnet
                        </span>
                        <span className="font-semibold">Balance: 0</span>
                      </div>
                      <div className="bg-transprent mt-6 rounded flex justify-between items-center mb-4">
                        <input
                          type="text"
                          placeholder="0.00"
                          className="text-4xl w-full text-[#a7adb9] bg-transparent font-[700] outline-none"
                        />
                        <div
                          className="bg-[#e5e7eb] hover:bg-[#9d9d9e] cursor-pointer py-1 px-3 flex items-center gap-1 rounded-lg font-semibold text-lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Image
                            src={selectedToken.image}
                            alt={selectedToken.name}
                            width={24}
                            height={24}
                          />
                          {selectedToken.symbol}
                          <ChevronDown className="text-black" size={38} />
                        </div>
                        <TokenModal
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                          setSelectedToken={setSelectedToken}
                          selectedToken={selectedToken}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="/img/Bridge - Manta Pacific/icon-arrow-down.svg"
                        alt="Manta Pacific Logo"
                        width={50}
                        height={50}
                        className="mb-4"
                      />{" "}
                    </div>
                    <div className="bg-[#f9fafb] p-4 rounded  mb-4">
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        To: Manta Pacific Mainnet
                      </p>
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        You will receive: 0 ETH
                      </p>
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        Balance on L2: 0 ETH
                      </p>
                    </div>
                    <button className="w-full border hover:bg-black hover:text-white mt-4 border-black  text-black rounded-lg py-3 text-3xl font-bold">
                      Connect Wallet
                    </button>
                    <p className="text-lg font-bold hover:text-black text-center mt-6 text-[#9fa6b2]">
                      Add chain to Metamask
                    </p>
                    <p className="text-sm font-medium  text-center mt-6 text-[#9fa6b2]">
                      Note: You need to add the chain to Metamask before
                      bridging from the chain.
                    </p>
                  </div>
                ) : activeTab === "Withdraw" ? (
                  <div>
                    <div className="bg-[#f9fafb] p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#a5abb7] font-medium">
                          From: Manta Pacific Mainnet
                        </span>
                        <span className="font-semibold">Balance: 0</span>
                      </div>
                      <div className="bg-transprent mt-6 rounded flex justify-between items-center mb-4">
                        <input
                          type="text"
                          placeholder="0.00"
                          className="text-4xl w-full text-[#a7adb9] bg-transparent font-[700] outline-none"
                        />
                        <div
                          className="bg-[#e5e7eb] hover:bg-[#9d9d9e] cursor-pointer py-1 px-3 flex items-center gap-1 rounded-lg font-semibold text-lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Image
                            src={selectedToken.image}
                            alt={selectedToken.name}
                            width={24}
                            height={24}
                          />
                          {selectedToken.symbol}
                          <ChevronDown className="text-black" size={38} />
                        </div>
                        <TokenModal
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="/img/Bridge - Manta Pacific/icon-arrow-down.svg"
                        alt="Manta Pacific Logo"
                        width={50}
                        height={50}
                        className="mb-4"
                      />{" "}
                    </div>
                    <div className="bg-[#f9fafb] p-4 rounded  mb-4">
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        To: Ethereum Mainnet
                      </p>
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        You will receive: 0 ETH
                      </p>
                      <p className="text-[#a5abb7] mb-1 font-medium">
                        Balance on L1: 0 ETH
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-[#a5abb7] gap-1  font-medium">
                          Estimated Time of Arrival: 3 Days
                        </p>
                        <div className="relative group">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <button className="text-gray-400 pb-[-10px] hover:text-gray-600 focus:outline-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.75h-1.5v4.5h1.5v-4.5zM9.5 13h1v1h-1v-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              {/* Tooltip on hover */}
                              <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[350px] p-3 bg-[#383838] rounded-2xl text-white text-xs  shadow-lg z-10">
                                <p>
                                  To withdraw your assets successfully, please
                                  follow these steps:
                                </p>
                                <p>
                                  Step 1: Submit your withdrawal transaction.
                                </p>
                                <p>
                                  Step 2: Wait 45 minutes for your transaction
                                  to be initiated. Go to "History" and click
                                  "Ready to Prove" to prove your transaction.
                                </p>
                                <p>
                                  Step 3: Wait 3 days. Go to "History" and click
                                  "Ready to Claim" to finalize your transaction.
                                  Your assets will then arrive in your Ethereum
                                  account.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full border hover:bg-black hover:text-white mt-4 border-black  text-black rounded-lg py-3 text-3xl font-bold">
                      Connect Wallet
                    </button>
                    <p className="text-lg font-bold hover:text-black text-center mt-6 text-[#9fa6b2]">
                      Add chain to Metamask
                    </p>
                    <p className="text-sm font-medium  text-center mt-6 text-[#9fa6b2]">
                      Note: You need to add the chain to Metamask before
                      bridging from the chain.
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-[#f9fafb] rounded-lg  max-w-lg mx-auto">
                    {/* Tabs */}
                    <div className="flex items-center justify-center ">
                      <button
                        className={`px-9  rounded-tl-md rounded-bl-md py-1 text-sm font-medium ${
                          activeTab2 === "Deposits"
                            ? "bg-[#383838] text-white font-semibold"
                            : "bg-transparent text-[#383838] bg-white"
                        } border  border-transparent ${
                          activeTab2 === "Deposits" ? "border-gray-300" : ""
                        }`}
                        onClick={() => setActiveTab2("Deposits")}
                      >
                        Deposits
                      </button>
                      <button
                        className={`px-9 rounded-tr-md rounded-br-md py-1 text-sm font-medium ${
                          activeTab2 === "Withdrawals"
                            ? "bg-[#383838] text-white font-semibold"
                            : "bg-transparent text-[#383838] bg-white"
                        } border  border-transparent ${
                          activeTab2 === "Withdrawals" ? "border-gray-300" : ""
                        }`}
                        onClick={() => setActiveTab2("Withdrawals")}
                      >
                        Withdrawals
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className=" mt-4 rounded-b-md">
                      {activeTab2 === "Deposits" && (
                        <p className="text-gray-500">
                          Please connect your wallet to view account
                          information.
                        </p>
                      )}
                      {activeTab2 === "Withdrawals" && (
                        <p className="text-gray-500">
                          Please connect your wallet to view account
                          information.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Third Party Bridge Section */}
              <div className=" bg-white py-8 px-6 rounded-2xl mt-4 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Third Party Bridge
                </h2>
                <div className="space-y-4">
                  {thirdPartyBridges.map((bridge, index) => (
                    <div
                      onClick={() => {
                        window.location.href = bridge.url;
                      }}
                      key={index}
                      className="flex items-center cursor-pointer space-x-4 bg-[#f9fafb] p-4 rounded-lg "
                    >
                      <Image
                        src={bridge.icon}
                        alt={bridge.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-xl">{bridge.name}</h3>
                        <p className="text-sm text-gray-500">
                          {bridge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 mt-4">
                    These are independent service providers that Manta is
                    linking to for your convenience. Manta has no responsibility
                    for their operation.
                  </p>
                </div>
              </div>
            </div>
            {/* Ecosystem Featured Projects */}
            <div className="bg-white lg:w-[50%] md:mt-0 mt-4 py-4 px-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Ecosystem Featured Projects
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Explore the ecosystem featured projects with your assets
              </p>
              <div className="space-y-4">
                {ecosystemProjects.map((project, index) => (
                  <div
                    onClick={() => {
                      window.location.href = project.url;
                    }}
                    key={index}
                    className="flex items-center cursor-pointer space-x-4 bg-[#f9fafb] p-4 rounded-lg "
                  >
                    <Image
                      src={project.icon}
                      alt={project.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-xl">{project.name}</h3>
                      <p className="text-sm text-gray-500">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Image src="" wi />
          </div>
        </div>
      </main>

      {/* Fixed Icon */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full p-2 shadow-lg">
        <Image
          src="/img/Bridge - Manta Pacific/manta_widget-1713770272.png"
          alt="Chat Icon"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
