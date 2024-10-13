"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const networks = [
  {
    name: "Manta Network",
    logo: "/img/atlantic/manta.png",
    color: "text-blue-500",
  },
  {
    name: "Calamari Network",
    logo: "/img/atlantic/download (6).svg",
    color: "text-pink-500",
  },
];

const mantaOptions = [
  { name: "Manta Pacific", logo: "/img/atlantic/manta.png" },
  { name: "Manta Atlantic", logo: "/img/atlantic/manta.png" },
];

const calamariOptions = [
  { name: "Calamari", logo: "/img/atlantic/download (6).svg" },
  { name: "Kusama", logo: "/img/atlantic/download (1).svg" },
];
const mantaOptions2 = [
  { name: "Manta ", logo: "/img/atlantic/manta.png" },
  { name: "Manta ", logo: "/img/atlantic/manta.png" },
];

const calamariOptions2 = [
  { name: "Calamari", logo: "/placeholder.svg?height=24&width=24" },
  { name: "Kusama", logo: "/placeholder.svg?height=24&width=24" },
];

const ecosystemOptions = [
  {
    name: "Staking",
    description: "Stake your $MANTA to secure the network and earn rewards",
    logo: "/img/atlantic/manta-stake.ddb9844a.png",
  },
  {
    name: "MantaDEX",
    description: "Swap and provide liquidity on MantaDex",
    logo: "/img/atlantic/manta-dex.png",
  },
  {
    name: "StellaSwap",
    description:
      "Provide liquidity on Moonbeam network ($MANTA token contract on Moonbeam: 0xfFf...)",
    logo: "/img/atlantic/stella.fa61f674.webp",
  },
  {
    name: "JumboShrimps",
    description:
      "Deposit $MANTA for a chance to win the entire staking reward pool",
    logo: "/img/atlantic/jumbo-shrimps.be05180a.png",
  },
  {
    name: "Bifrost",
    description: "Earn rewards by staking $MANTA and free up your liquidity",
    logo: "/img/atlantic/bifrost.png",
  },
];

export default function MantaBridge() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [fromOption, setFromOption] = useState(mantaOptions[0]);
  const [toOption, setToOption] = useState(mantaOptions[1]);
  const [activeTab, setActiveTab] = useState("Bridge");
  const [amount, setAmount] = useState("0.00");

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
    if (network.name === "Manta Network") {
      setFromOption(mantaOptions[0]);
      setToOption(mantaOptions[1]);
    } else {
      setFromOption(calamariOptions[0]);
      setToOption(calamariOptions[1]);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 bg-fixed bg-cover"
      style={{
        backgroundImage: "url('/img/atlantic/background.dff7d577.png')",
      }}
    >
      <header className="bg-white/80 shadow-sm">
        <div className=" mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-[130px]">
            <Select
              onValueChange={(value) =>
                handleNetworkChange(networks.find((n) => n.name === value))
              }
            >
              <SelectTrigger className="w-[180px] border-none shadow-none">
                {/* <img
                  src={selectedNetwork.logo}
                  alt={selectedNetwork.name}
                  className="w-6 h-6 mr-2"
                /> */}
                <SelectValue placeholder={selectedNetwork.name} />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.name} value={network.name}>
                    <div className="flex items-center">
                      <img
                        src={network.logo}
                        alt={network.name}
                        className="w-6 h-6 mr-2"
                      />
                      <span>{network.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <nav className="hidden md:flex gap-[50px]">
              <a
                onClick={() => setActiveTab("Bridge")}
                href="#"
                className={`${
                  activeTab === "Bridge" ? "text-blue-600" : "text-gray-600"
                }  font-medium`}
              >
                Bridge
              </a>
              <a
                onClick={() => setActiveTab("Staking")}
                href="/atlantic/staking"
                className={`${
                  activeTab === "Staking" ? "text-blue-600" : "text-gray-600"
                }  font-medium`}
              >
                Staking
              </a>
              <a
                onClick={() =>
                  window.open("https://forum.manta.network/", "_blank")
                }
                href="#"
                className="text-gray-600 hover:text-blue-500"
              >
                Govern
              </a>
              <a
                onClick={() =>
                  window.open("https://calamari.subscan.io/", "_blank")
                }
                href="#"
                className="text-gray-600 hover:text-blue-500"
              >
                Block Explorer
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-500 to-purple-500 py-5 px-10  text-white"
            >
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              className="border border-blue-500 bg-blue-400/30"
              size="icon"
            >
              <MoreHorizontal className="h-6 w-6 text-blue-700" />
            </Button>
          </div>
        </div>
      </header>

      <div
        onClick={() => window.open("https://cedefi.manta.network/", "_blank")}
        style={{
          backgroundImage: "url('/img/atlantic/bounce-banner.397e2898.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`w-full ${
          selectedNetwork.name === "Calamari Network"
            ? "bg-pink-300"
            : "bg-blue-300"
        } p-4 text-center`}
      >
        <p className="text-sm font-medium flex items-center justify-center">
          Stake your assets on Manta CeDeFi now to earn CeFi/DeFi yield & Manta
          token rewards.
          <div className="ml-1 p-[2px] rounded-full bg-gray-800">
            <ChevronRight className=" h-4 w-4 text-white" />
          </div>
        </p>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div
          className={`${
            selectedNetwork.name === "Calamari Network"
              ? "justify-center items-center"
              : "items-start"
          } flex flex-col  lg:flex-row gap-8`}
        >
          <Card
            className={`${
              selectedNetwork.name === "Calamari Network"
                ? "w-[45%]"
                : " flex-1"
            }  p-6  bg-[#f4f7fe] `}
          >
            {/* <h2 className="text-2xl font-bold mb-4">Bridge</h2> */}
            <div className="space-y-4">
              <div className="flex  justify-between items-center">
                <div className="w-[40%]  p-3 rounded-xl bg-white">
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <Select
                    className="border-none"
                    value={fromOption.name}
                    onValueChange={(value) =>
                      setFromOption(
                        mantaOptions.find((o) => o.name === value) ||
                          calamariOptions.find((o) => o.name === value)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedNetwork.name === "Manta Network"
                        ? mantaOptions
                        : calamariOptions
                      ).map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center">
                            <img
                              src={option.logo}
                              alt={option.name}
                              className="w-6 h-6 mr-2"
                            />
                            <span>{option.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <img
                    src="/img/atlantic/download (4).svg"
                    className="h-9 w-9"
                  />
                </div>
                <div className="w-[40%]  p-3 rounded-xl bg-white">
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <Select
                    value={toOption.name}
                    onValueChange={(value) =>
                      setToOption(
                        mantaOptions.find((o) => o.name === value) ||
                          calamariOptions.find((o) => o.name === value)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedNetwork.name === "Manta Network"
                        ? mantaOptions
                        : calamariOptions
                      ).map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center">
                            <img
                              src={option.logo}
                              alt={option.name}
                              className="w-6 h-6 mr-2"
                            />
                            <span>{option.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-white px-2 py-4 flex  justify-between items-center">
                <div className="">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full focus:outline-none"
                    placeholder="0.00"
                  />
                  <p className="text-lg text-left text-green-400 mt-1 cursor-pointer">
                    Select Max
                  </p>
                </div>
                <div>
                  <Select
                    value={toOption.name}
                    onValueChange={(value) =>
                      setToOption(
                        mantaOptions.find((o) => o.name === value) ||
                          calamariOptions.find((o) => o.name === value)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedNetwork.name === "Manta Network"
                        ? mantaOptions
                        : calamariOptions
                      ).map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center">
                            <img
                              src={option.logo}
                              alt={option.name}
                              className="w-6 h-6 mr-2"
                            />
                            <span>{option.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-right">Balance: --</p>
                </div>
              </div>
              {selectedNetwork.name === "Manta Network" && (
                <div className="flex gap-3">
                  <div className="bg-white w-full p-1">
                    <input
                      type="text"
                      placeholder="Enter Manta Atlantic Address"
                      className="w-full border-transparent bg-transparent p-4 rounded-lg"
                    />
                  </div>
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 py-8 px-10  text-white"
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
              {selectedNetwork.name === "Calamari Network" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Origin fee:</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Destination fee:</span>
                    <span>--</span>
                  </div>
                </div>
              )}

              {selectedNetwork.name === "Manta Network" && (
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Please avoid sending MANTA from Atlantic or Moonbeam
                    (xcMANTA) to centralized exchanges or other wallet addresses
                    that you do not control. YOU WILL HAVE THE RISK OF LOSING
                    YOUR ASSETS. When withdrawing MANTA from centralized
                    exchanges, please withdraw to Manta Pacific network ONLY.
                  </label>
                </div>
              )}
              <Button className="w-full py-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                Connect Wallet
              </Button>
            </div>
          </Card>

          {selectedNetwork.name === "Manta Network" && (
            <Card className="lg:w-[38%] p-6 rounded-lg bg-[#f4f7fe]">
              <h2 className="text-2xl font-bold mb-4">Explore Ecosystem</h2>
              <p className="text-sm text-gray-600 mb-4">
                Explore Manta Atlantic Ecosystem instead of bridge out:
              </p>
              <div className="space-y-4">
                {ecosystemOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex bg-white rounded-lg p-3 items-start space-x-3"
                  >
                    <img
                      src={option.logo}
                      alt={option.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{option.name}</h3>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
