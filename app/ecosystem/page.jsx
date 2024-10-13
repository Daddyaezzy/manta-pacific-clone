"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

const categories = [
  "All",
  "DeFi/Payments",
  "Infrastructure/Bridges",
  "Social",
  "Identity",
  "Gaming/Metaverse",
  "Auditors",
  "Incubator/Accelerators",
  "Investors",
  "Media/Education",
  "Atlantic Ecosystem",
  "Research Partners",
  "Wallets",
  "Tooling",
  "zkSBT Partner",
];

const projects = [
  {
    name: "Alchemy Pay",
    categories: ["DeFi/Payments"],
    website: "https://alchemypay.org/",
    description:
      "Alchemy Pay (ACH) is a payment solutions provider that seamlessly connects fiat and crypto economies for global consumers, merchants, developers, and institutions.",
    image: "/img/Ecosystem/alchemypay-logo.jpg",
  },
  {
    name: "Alliance DAO",
    categories: ["Incubator/Accelerators"],
    website: "https://www.alliancedao.com/",
    description:
      "Alliance is the leading Web3 accelerator and founder community.",
    image: "/img/Ecosystem/alliance-dao-logo.png",
  },
  {
    name: "Aperture",
    categories: ["DeFi/Payments"],
    website: "https://aperture.finance/",
    description:
      "Pioneering LP management w/ intent-based architectures on @uniswap V3.",
    image: "/img/Ecosystem/Aperture.svg",
    liveOnPacific: true,
  },
  {
    name: "Omni Network",
    categories: ["Infrastructure/Bridges", "zkSBT Partner"],
    website: "https://omni.network/",
    description:
      "Omni is a layer 1 blockchain built to connect all rollups. Using Omni, developers can build global applications that are available across all rollups.",
    image: "/img/Ecosystem/omni-network-logo.png",
    liveOnPacific: true,
  },
  {
    name: "BNB chain",
    categories: ["Infrastructure/Bridges", "zkSBT Partner"],
    website: "https://www.bnbchain.org/",
    description:
      "BNB Chain is a global, decentralized network with developers, validators, users, HODLers and enthusiasts.",
    image: "/img/Ecosystem/bnb-chain-logo.png",
  },
  {
    name: "AsMatch",
    categories: ["Social"],
    website: "https://asmatch.com/",
    description:
      "AsMatch is a Web3 Socialfi matching app that brings a whole new level of security, authenticity, and fun to making friends.",
    image: "/img/Ecosystem/AsMatch.png",
    liveOnPacific: true,
  },
  {
    name: "Aspecta",
    categories: ["Identity"],
    website: "https://aspecta.id/",
    description:
      "Transform Web2 & Web3 footprints into AI-generated identity for BUILDERS and BEYOND",
    image: "/img/Ecosystem/aspecta-logo.jpeg",
  },
  {
    name: "Beacon",
    categories: ["Incubator/Accelerators"],
    website: "https://www.beaconaccelerator.xyz/",
    description:
      "Beacon is an accelerator built by web3 founders for web3 founders.",
    image: "/img/Ecosystem/beacon-logo.png",
  },
  {
    name: "Berkeley Xcelerator",
    categories: ["Incubator/Accelerators"],
    website: "https://xcelerator.berkeley.edu/",
    description:
      "Berkeley Blockchain Xcelerator is the newest lab at the Center for Entrepreneurship in the School of Engineering.",
    image: "/img/Ecosystem/berkeley-x-logo.png",
  },
  {
    name: "Binance Labs",
    categories: ["Investors"],
    website: "https://labs.binance.com/",
    description:
      "Binance Labs identifies, invests, and empowers viable blockchain entrepreneurs, startups, and communities.",
    image: "/img/Ecosystem/binance-labs-logo.png",
  },
  {
    name: "Bifrost",
    categories: ["Atlantic Ecosystem"],
    website: "https://thebifrost.io/",
    description: "Bifrost is a cross-chain liquidity for Staking",
    image: "/img/Ecosystem/bifrost-logo.png",
  },
  {
    name: "Binance Academy",
    categories: ["Media/Education"],
    website: "https://academy.binance.com/",
    description:
      "Binance Academy is on a mission to educate the masses on the transformative potential of cryptocurrency and blockchain technology.",
    image: "/img/Ecosystem/binance-academy-logo.png",
  },
  {
    name: "Cysic",
    categories: ["Research Partners"],
    website: "https://cysic.xyz/",
    description:
      "Cysic, incorporated in August 2022, focuses on hardware acceleration for zero-knowledge proof (ZKP).",
    image: "/img/Ecosystem/cysic-logo.png",
  },
  {
    name: "Divergence",
    categories: ["Investors"],
    website: "https://www.divergence.xyz/",
    description:
      "Divergence Ventures is a the crypto operator fund founded in 2020 by George Lambeth.",
    image: "/img/Ecosystem/divergence-logo.png",
  },
  {
    name: "CyberConnect",
    categories: ["Social", "zkSBT Partner"],
    website: "https://cyberconnect.me/",
    description:
      "CyberConnect is web3's earliest and biggest decentralized social network.",
    image: "/img/Ecosystem/cyberconnect-logo.jpg",

    liveOnPacific: true,
  },
  {
    name: "Dmail",
    categories: ["Social", "Infrastructure/Bridges", "Tooling"],
    website: "https://dmail.ai/",
    description:
      "Dmail Network is building an AI-powered decentralized infrastructure which provides seamless, anonymous messaging and notification services across multiple chain",
    image: "/img/Ecosystem/Dmail.png",

    liveOnPacific: true,
  },
  {
    name: "Free Company",
    categories: ["Investors"],
    website: "https://www.freecompany.capital/",
    description:
      "Free Company is a syndicate of experienced crypto operators deploying capital into early stage companies.",
    image: "/img/Ecosystem/freecompany-logo.png",
  },
  {
    name: "Galxe",
    categories: ["Infrastructure/Bridges", "Tooling"],
    website: "https://galxe.com/",
    description: "SocialFi platform to build and grow web3 community",
    image: "/img/Ecosystem/Galxe.png",

    liveOnPacific: true,
  },
  {
    name: "Halborn",
    categories: ["Auditors"],
    website: "https://halborn.com/",
    description:
      "Elite Blockchain Security Solutions trusted by Solana, Avalanche, and more.",
    image: "/img/Ecosystem/halborn-logo.png",
  },
  {
    name: "GoSleep",
    categories: ["Social"],
    website: "https://gosleep.io/",
    description:
      "Your future depends on your dreams. So GoSleep. Sleep, Earn, Repeat.",
    image: "/img/Ecosystem/gosleep-logo.jpeg",
  },
  {
    name: "Getaverse",
    categories: ["Gaming/Metaverse", "zkSBT Partner"],
    website: "https://getaverse.com/",
    description:
      "Getaverse is a metaverse ecological service platform based on the Web3 digital authentication engine protocol.",
    image: "/img/Ecosystem/getaverse-logo.jpg",

    liveOnAtlantic: true,
  },
  {
    name: "Global Coin Ventures",
    categories: ["Investors"],
    website: "https://www.globalcoinventures.com/",
    description:
      "Global Coin Research (GCR) is a Commupngnity of Investors & Researchers in Web3.",
    image: "/img/Ecosystem/gcr-logo.png",
  },
  {
    name: "KaratDAO",
    categories: ["Identity", "zkSBT Partner"],
    website: "https://karatdao.com/",
    description:
      "Karat DAO is building a decentralized credit score that quantifies lending risk at scale, bringing trust and transparency to web3",
    image: "/img/Ecosystem/karatdao-logo.png",

    liveOnAtlantic: true,
  },
  {
    name: "Hypersphere",
    categories: ["Investors"],
    website: "https://hypersphere.capital/",
    description:
      "Hypersphere is an investment group leveraging on-chain treasuries, decentralized communities, and deep crypto expertise.",
    image: "/img/Ecosystem/hypersphere-logo.png",
  },
  {
    name: "Instap",
    categories: ["Social"],
    website: "https://instap.io/",
    description: "Make friends, Earn Crypto. The Ultimate Web3 Social Network.",
    image: "/img/Ecosystem/instap-logo.png",
  },
  {
    name: "Jump Crypto",
    categories: ["Research Partners"],
    website: "https://jumpcrypto.com/",
    description:
      "Jump Crypto is committed to building and standing up critical infrastructure needed to catalyze the growth of the crypto ecosystem.",
    image: "/img/Ecosystem/jump-crypto-logo.png",
  },
  {
    name: "Caldera",
    categories: ["Infrastructure/Bridges", "Tooling"],
    website: "https://caldera.xyz/",
    description:
      "The modular blockchain platform: deploy a rollup in one click.",
    image: "/img/Ecosystem/Caldera.png",

    liveOnPacific: true,
  },
  {
    name: "Celer Network",
    categories: ["Infrastructure/Bridges", "Tooling"],
    website: "https://www.celer.network/",
    description:
      "Building the best inter-blockchain and cross-layer communication platform.",
    image: "/img/Ecosystem/CelerNetwork.png",

    liveOnPacific: true,
  },
  {
    name: "Clover",
    categories: ["Wallets"],
    website: "https://clover.finance/",
    description:
      "A wallet created for the next 100M crypto users with user privacy as a cornerstone. Provides a full range of multi-chain & cross-chain solutions.",
    image: "/img/Ecosystem/clover-logo.png",
  },
  {
    name: "CoinFund",
    categories: ["Investors"],
    website: "https://www.coinfund.io/",
    description:
      "CoinFund is a cryptonative investment firm and registered investment adviser. The team specializes in portfolio management, token design, decentralized network research, trading, market structure, engineering, brand strategy, law, and regulation.",
    image: "/img/Ecosystem/coinfund-logo.png",
  },
  {
    name: "Continue Capital",
    categories: ["Investors"],
    website: "https://continue.capital/",
    description:
      "We invest in crypto startups that will bring the next 1 billion users to the web 3.0 economy.",
    image: "/img/Ecosystem/continuecapital-logo.png",
  },
  {
    name: "Celestia",
    categories: ["Infrastructure/Bridges"],
    website: "https://celestia.org/",
    description:
      "Celestia is a modular consensus and data network, built to enable anyone to easily deploy their own blockchain with minimal overhead.",
    image: "/img/Ecosystem/celestia-logo.png",
  },
  {
    name: "Cointelegraph",
    categories: ["Media/Education"],
    website: "https://cointelegraph.com/",
    description:
      "Cointelegraph is the leading independent digital media resource covering a wide range of news on blockchain technology, crypto assets, and emerging fintech trends.",
    image: "/img/Ecosystem/cointelegraph-logo.png",
  },
  {
    name: "Cred Protocol",
    categories: ["Identity"],
    website: "https://www.cred.xyz/",
    description:
      "Cred Protocol is a decentralized credit score that quantifies lending risk at scale, bringing trust and transparency to web3",
    image: "/img/Ecosystem/cred-logo.jpg",

    liveOnAtlantic: true,
  },
  {
    name: "SevenX Ventures",
    categories: ["Investors"],
    website: "https://www.7xvc.com/",
    description:
      "SevenX Ventures is a Research-driven Crypto Venture Capital founded in 2020.",
    image: "/img/Ecosystem/seven-x-logo.jpeg",
  },
  {
    name: "Qiming Venture",
    categories: ["Investors"],
    website: "https://www.qimingvc.com/",
    description:
      "Qiming Venture Partners is a top-tier VC firm with outstanding reputation.",
    image: "/img/Ecosystem/qiming-logo.jpeg",
  },
  {
    name: "BingoOx",
    categories: ["Gaming/Metaverse"],
    website: "https://bingoox.com/",
    description:
      "A casual competition platform where players can compete with each other and win stablecoins and other cryptocurrencies.",
    image: "/img/Ecosystem/Bingo0x.png",

    liveOnPacific: true,
  },
  {
    name: "CMS Holdings",
    categories: ["Investors"],
    website: "https://cmsholdings.io/",
    description:
      "CMS is a principal investment firm focused on making investments across the cryptoasset ecosystem. We look to deploy capital in liquid and illiquid crypto tokens, as well as, equity stakes in selective companies.",
    image: "/img/Ecosystem/cms-logo.png",
  },
  {
    name: "LongHashX",
    categories: ["Incubator/Accelerators"],
    website: "https://longhashx.com/",
    description:
      "LongHash Ventures specializes in bootstrapping Web3 ecosystems.",
    image: "/img/Ecosystem/long-hash-logo.png",
  },
  {
    name: "Longhash Ventures",
    categories: ["Investors"],
    website: "https://www.longhash.vc/",
    description:
      "Longhash Ventures specializes in bootstrapping Web3 ecosystems.",
    image: "/img/Ecosystem/long-hash-logo.png",
  },
  {
    name: "Kevin Hu (BH Digital)",
    categories: ["Investors"],
    website: "https://www.linkedin.com/in/kevin-hu-75699719/",
    description: "Angel investor at BH Digital. Formerly at Dragonfly Capital.",
    image: "/img/Ecosystem/kevinhu-logo.png",
  },
  {
    name: "Let's Meme",
    categories: ["Social"],
    website: "https://letsmeme.com/",
    description: "Let's Meme is a degen web3 community management tool.",
    image: "/img/Ecosystem/letsmeme-logo.png",
  },
  {
    name: "Moonshot Commons",
    categories: ["Incubator/Accelerators"],
    website: "https://www.moonshotcommons.com/",
    description:
      "Where top Gen-Z engineers learn, build, and scale from 0 to ∞.",
    image: "/img/Ecosystem/moonshot-logo.png",
  },
  {
    name: "Moonbeam",
    categories: ["Atlantic Ecosystem"],
    website: "https://moonbeam.network/",
    description:
      "Moonbeam, an Ethereum-compatible smart contract parachain on Polkadot.",
    image: "/img/Ecosystem/moonbeam-logo.png",
  },
  {
    name: "Moonrock Capital",
    categories: ["Incubator/Accelerators"],
    website: "https://www.moonrockcapital.io/",
    description:
      "Moonrock Capital is a crypto native advisory and venture capital firm incubating and accelerating blockchain and web3 startups.",
    image: "/img/Ecosystem/moonrock-logo.png",
  },
  {
    name: "Maple Leaf Capital",
    categories: ["Investors"],
    website: "https://www.mapleleafcap.com/",
    description: "Founder of Folius Ventures.",
    image: "/img/Ecosystem/mapleleaf-logo.png",
  },
  {
    name: "OpenZL",
    categories: ["Research Partners"],
    website: "https://openzl.org/",
    description:
      "OpenZL is an open-source library for development of secure, high-performance, zero-knowledge applications.",
    image: "/img/Ecosystem/openzl-logo.png",

    liveOnAtlantic: true,
  },
  {
    name: "Optimism",
    categories: ["Infrastructure/Bridges", "zkSBT Partner"],
    website: "https://www.optimism.io/",
    description:
      "OP Pacific is a Layer 2 Optimistic Rollup network designed to utilize the strong security guarantees of Ethereum while reducing its cost and latency.",
    image: "/img/Ecosystem/optimism-logo.jpg",

    liveOnAtlantic: true,
  },
  {
    name: "Virtual Labs",
    categories: ["Infrastructure/Bridges"],
    website: "https://www.virtuallabs.xyz/",
    description:
      '"Virtual Rollups: Instant, Seamless Transactions on Any Chain. Welcome to the future of web3 data transactions and the end of oracles and bridges! Virtual Labs allows users to validate their own data through an off-chain consensus client called Proof of Result. Proof of Result will decentralize information in the same way that Proof of Stake decentralized financial transactions."',
    image: "/img/Ecosystem/aspecta-logo.jpeg",
  },
  {
    name: "Azuki",
    categories: ["zkSBT Partner"],
    website: "https://www.azuki.com/",
    description: "A brand for the metaverse, built by the community.",
    image: "/img/Ecosystem/azuki-logo.jpeg",

    liveOnAtlantic: true,
  },
];

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeMenu, setActiveMenu] = useState("Ecosystem");
  const [showSide, setShowSide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className=" bg-white">
      {showSide && (
        <div className="bg-white/90 p-4 overflow-y-scroll h-full absolute w-full  z-[99]">
          <X
            onClick={() => setShowSide(false)}
            className="absolute top-7 md:hidden block cursor-pointer left-5 text-black"
            size={30}
          />
          <div className="mt-[100px] flex flex-col text-lg text-black items-center justify-center gap-4">
            <a href="#" className={`text-purple-500 hover:text-gray-900`}>
              Ecosystem
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Developers
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Documentation
            </a>
            <p className={`text-black font-semibold hover:text-gray-900`}>
              Explorers
            </p>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Blockscout
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Socialscan
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              OKLink
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Dex Screener
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              GeckoTerminal
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Dex Guru
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Blio
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Coinmarket Cap
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Route Scan
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              VfatScan
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Arkham
            </a>
            <p className={`text-black font-semibold hover:text-gray-900`}>
              On-Chain Data
            </p>
            <a href="#" className={`text-black hover:text-gray-900`}>
              DefiLiama
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Dune
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              L2BEAT
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Web3Go
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Token Terminal
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Arkham
            </a>

            <a
              onClick={() =>
                window.open("https://foundation.manta.network/", "_blank")
              }
              href="#"
              className={`text-black hover:text-gray-900`}
            >
              Foundation
            </a>
            <a href="#" className={`text-black hover:text-gray-900`}>
              Learn
            </a>
          </div>

          <div className="md:hidden flex px-4 gap-2">
            <img
              src="/img/Bridge - Manta Pacific/medium-icon.svg"
              alt="Manta Pacific Logo"
              className="w-[44px]"
            />{" "}
            <img
              src="/img/Bridge - Manta Pacific/twitter-icon.svg"
              alt="Manta Pacific Logo"
              className="w-[44px]"
            />{" "}
            <img
              src="/img/Bridge - Manta Pacific/discord-icon.svg"
              alt="Manta Pacific Logo"
              className="w-[44px]"
            />{" "}
          </div>

          <div className=" px-4 pt-9 gap-4">
            <button
              className="block text-white w-full mt-2 font-medium py-2 px-3 rounded-3xl md:hidden"
              style={{
                backgroundImage: "url('/img/Ecosystem/header-button-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => window.open("/", "_blank")}
            >
              Bridge to Pacific
            </button>
            <button
              className="block text-white w-full mt-2 font-medium py-2 px-3 rounded-3xl md:hidden"
              style={{
                backgroundImage: "url('/img/Ecosystem/bridge-to-altantic.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => window.open("/atlantic", "_blank")}
            >
              Bridge to Atlantic
            </button>
            <button className="text-[#3b80b0] w-full mt-2 md:hidden block border border-[#3b80b0] py-2 px-3 rounded-3xl">
              Stake Manta
            </button>
          </div>

          <div></div>
        </div>
      )}
      <header className=" relative px-6 bg-white">
        <Menu
          onClick={() => setShowSide(true)}
          className="absolute top-7 md:hidden block cursor-pointer left-5 text-black"
          size={30}
        />
        <div className="flex items-center md:justify-between justify-center">
          <img
            src="/img/Ecosystem/logo.svg"
            alt="Manta Network Logo"
            className="h-8"
          />
          <nav className="hidden md:flex gap-7">
            <div className="flex gap-6">
              <a
                href="#"
                className={`text-purple-500 py-6 hover:text-gray-900`}
              >
                Ecosystem
              </a>
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="py-6 relative "
              >
                <a href="#" className={`text-gray-600  hover:text-gray-900`}>
                  Developers
                </a>
                {isOpen && (
                  <div
                    className="absolute left-0 top-[60px] mt-2 w-[150px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <div className="py-1 text-center">
                      {[
                        "Documentation",
                        "Explorers",
                        "Blockscout",
                        "SocialScan",
                        "OKLink",
                        "DEX Screener",
                        "GeckoTerminal",
                        "Dex Guru",
                        "Blio",
                        "CoinMarketCap",
                        "RouteScan",
                        "VfatScan",
                        "Arkham",
                        "On-chain Data",
                        "DefiLlama",
                        "Dune",
                        "L2BEAT",
                        "Web3Go",
                        "Token Terminal",
                      ].map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-2 text-center text-sm text-black hover:bg-gray-100"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                onClick={() =>
                  window.open("https://foundation.manta.network/", "_blank")
                }
                href="#"
                className={`text-gray-600 py-6 hover:text-gray-900`}
              >
                Foundation
              </a>
              <div
                onMouseEnter={() => setIsOpen2(true)}
                onMouseLeave={() => setIsOpen2(false)}
                className="py-6 relative "
              >
                <a href="#" className={`text-gray-600  hover:text-gray-900`}>
                  Learn
                </a>
                {isOpen2 && (
                  <div
                    className="absolute left-0 top-[60px] mt-2 w-[150px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <div className="py-1 text-center">
                      {["Tokenomics", "About Manta", "Career"].map(
                        (item, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block px-4 py-2 text-center text-sm text-black hover:bg-gray-100"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="md:flex hidden py-6 gap-2">
                <img
                  src="/img/Bridge - Manta Pacific/medium-icon.svg"
                  alt="Manta Pacific Logo"
                  className="w-[24px]"
                />{" "}
                <img
                  src="/img/Bridge - Manta Pacific/twitter-icon.svg"
                  alt="Manta Pacific Logo"
                  className="w-[24px]"
                />{" "}
                <img
                  src="/img/Bridge - Manta Pacific/discord-icon.svg"
                  alt="Manta Pacific Logo"
                  className="w-[24px]"
                />{" "}
              </div>
            </div>
          </nav>

          <div className="flex gap-4">
            <button
              className="hidden text-white font-medium py-2 px-3 rounded-3xl md:inline-flex"
              style={{
                backgroundImage: "url('/img/Ecosystem/header-button-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => window.open("/", "_blank")}
            >
              Bridge to Pacific
            </button>
            <button
              className="hidden text-white font-medium py-2 px-3 rounded-3xl md:inline-flex"
              style={{
                backgroundImage: "url('/img/Ecosystem/bridge-to-altantic.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => window.open("/atlantic", "_blank")}
            >
              Bridge to Atlantic
            </button>
            <button className="text-[#3b80b0] md:block hidden border border-[#3b80b0] py-2 px-3 rounded-3xl">
              Stake Manta
            </button>
          </div>
        </div>
      </header>

      <div
        style={{
          backgroundImage: "url('/img/Ecosystem/omni-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-orange-500 text-white p-8 text-center"
      >
        <p className="flex items-center font-semibold justify-center">
          Join Manta's MEMEta szn with BONK and earn rewards from a pool of 1m
          MANTA
          <ChevronRight className="ml-2" />
        </p>
      </div>

      <main className="">
        <section
          style={{
            backgroundImage: "url('/img/Ecosystem/ecosystem-hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="text-center bg-[#d2ebfc] bg-gradient-to-r from-[#d2ebfc] to-[#f4dff2]  flex items-center justify-center mb-12 h-[100vh]"
        >
          <div>
            <h1 className="text-4xl  font-[400] text-black mb-4">
              <span className="text-3xl">The Gateway to</span>
              <br />
              <span className="text-3xl">Modular ZK Dapp</span>
              <br />
              <span className="text-[48px] mt-4">in One Place</span>
            </h1>
            <div
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLScfy4-fG7WxjtE8ebLrfhSflK2qKBt2bIbB79QO69oSAhWeUA/viewform",
                  "_blank"
                )
              }
              className="flex flex-wrap justify-center mt-12 gap-4"
            >
              <button className="bg-gradient-to-r font-semibold flex items-center gap-4 p-6 rounded-full from-teal-400 to-blue-500 text-white">
                Submit Your Project
                <div className="p-1 rounded-full border border-white">
                  <ArrowRight size={12} className="text-white " />
                </div>
              </button>
              <div
                onClick={() =>
                  window.open("https://accelerator.manta.network/")
                }
                className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 "
              >
                <button
                  variant="outline"
                  className="bg-[#ede3f4] text-purple-600 p-6 rounded-full flex items-center gap-4 font-semibold"
                >
                  Join Accelerator
                  <div className="p-1 rounded-full text-purple-600 border border-purple-600">
                    <ArrowRight size={12} className="text-purple-600 " />
                  </div>
                </button>
              </div>
              <div
                onClick={() =>
                  window.open(
                    "https://docs.llama.fi/list-your-project/submit-a-project"
                  )
                }
                className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 "
              >
                <button
                  variant="outline"
                  className="bg-[#ede3f4] text-purple-600 p-6 rounded-full flex items-center gap-4 font-semibold"
                >
                  List Your project on DefiLlama
                  <div className="p-1 rounded-full text-purple-600 border border-purple-600">
                    <ArrowRight size={12} className="text-purple-600 " />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="  ">
          <div className="bg-[#fff] ">
            <div className="lg:flex bg-[#eef6fa] container mx-auto  rounded-[40px] gap-[200px] py-[55px] px-12 text-black  relative items-center mb-4">
              <h2 className="text-[45px] text-center font-normal">
                Ecosystem <br className="md:block hidden" /> Grants
              </h2>

              <button className=" font-semibold flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white">
                Apply for an Ecosystem Grant
                <div className="p-1 rounded-full border border-white">
                  <ArrowRight size={12} className="text-white " />
                </div>
              </button>
              <div className="absolute lg:block hidden bottom-[-60px] right-[30px]">
                <img
                  src="/img/Ecosystem/ecosystem-grants.png"
                  alt="Manta Network Logo"
                  className="h-[250px]"
                />
              </div>
            </div>
          </div>
          <div className="mt-[75px] md:px-[100px] px-10 bg-[#eef6fa]">
            <div className="flex pt-12 flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full text-white px-4 py-1 text-sm bg-gradient-to-r  from-teal-400 to-blue-500"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-12 columns-1 sm:columns-2 lg:columns-3  text-black gap-4">
              {projects
                .filter(
                  (project) =>
                    selectedCategory === "All" ||
                    project.categories.includes(selectedCategory)
                )
                .map((project, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid  mb-4 border p-4 bg-white rounded-3xl relative"
                  >
                    {project.liveOnPacific && (
                      <span className="flex items-center gap-1  absolute top-4 right-3 text-black text-xs px-2 py-1 rounded-full">
                        <div className="bg-blue-500 h-2 w-2 rounded-full"></div>
                        Live on Pacific
                      </span>
                    )}
                    {project.liveOnAtlantic && (
                      <span className="flex items-center gap-1 absolute top-4 right-3 text-black text-xs px-2 py-1 rounded-full">
                        <div className="bg-blue-500 h-2 w-2 rounded-full"></div>
                        Live on Atlantic
                      </span>
                    )}

                    <div className=" mb-1">
                      <img
                        src={project.image}
                        alt={`${project.name} logo`}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white font-[700]  text-xs px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-semibold pt-1 text-lg">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-black mb-4">
                      {project.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
