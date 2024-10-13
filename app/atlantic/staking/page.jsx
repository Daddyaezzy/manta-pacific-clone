"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const resources = [
  { name: "Collator Guidance", url: "#" },
  { name: "Manta block explorer", url: "#" },
];

// Generate 30 dummy collators
const dummyCollators = Array.from({ length: 30 }, (_, i) => ({
  name: `Collator${i + 1}`,
  id: `d${Math.random().toString(36).substr(2, 9)}`,
  amountStaked: (Math.random() * 2500000 + 1000000).toFixed(2),
  minimumStake: (Math.random() * 2000 + 500).toFixed(2),
  aprEstimate: (Math.random() * 20 + 10).toFixed(0),
  delegations: `${Math.floor(Math.random() * 50 + 50)} / 100`,
}));

export default function MantaStaking() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [fromOption, setFromOption] = useState(mantaOptions[0]);
  const [toOption, setToOption] = useState(mantaOptions[1]);
  const [activeTab, setActiveTab] = useState("Bridge");
  const [amount, setAmount] = useState("0.00");

  const [collatorFilter, setCollatorFilter] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");

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
        <h1 className="text-3xl font-bold mb-4">Staking</h1>
        <p className="mb-2">Please connect your wallet</p>
        <p className="mb-8 text-sm text-gray-600">
          polkadot.js, SubWallet, or Talisman wallet must be connected to see
          your balance and rewards
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-semibold mb-2">Total Balance</h2>
                <p className="text-2xl font-bold">--</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-semibold mb-2">Available Balance</h2>
                <p className="text-2xl font-bold">--</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-semibold mb-2">Total Staked</h2>
                <p className="text-2xl font-bold">--</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-semibold mb-2">Rewards Last Round</h2>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-100 p-4 rounded-lg h-full">
                <h2 className="font-semibold mb-2">Bind your EVM Address</h2>
                <Button className="bg-blue-600 text-white w-full mb-4">
                  Connect Polkadot Wallet
                </Button>
                <h3 className="font-semibold mt-4 mb-2">Resources</h3>
                <ul className="space-y-1">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        className="text-blue-600 hover:underline"
                      >
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 text-white mt-4">Start staking</Button>
          <p className="text-sm text-gray-600 mt-4">
            Please note: Staking rewards will be sent to your address every 6
            hours. Unstaking process will take a period of 7 days to complete.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Collators</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search Collators"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <Select value={collatorFilter} onValueChange={setCollatorFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 text-white w-full sm:w-auto">
              Launch your own collator
            </Button>
          </div>
          <div className="overflow-x-auto">
            <div className="h-[80vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collator</TableHead>
                    <TableHead>Amount Staked</TableHead>
                    <TableHead>Minimum Stake</TableHead>
                    <TableHead>APR Estimate</TableHead>
                    <TableHead>Delegations</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyCollators
                    .filter(
                      (collator) =>
                        collator.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        (collatorFilter === "All" ||
                          (collatorFilter === "Active" &&
                            collator.aprEstimate > 0) ||
                          (collatorFilter === "Inactive" &&
                            collator.aprEstimate === 0))
                    )
                    .map((collator, index) => (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <img
                              src="/placeholder.svg?height=24&width=24"
                              alt="Collator icon"
                              className="w-6 h-6"
                            />
                            <div>
                              <div>{collator.name}</div>
                              <div className="text-xs text-gray-500">
                                {collator.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{collator.amountStaked} MANTA</TableCell>
                        <TableCell>{collator.minimumStake} MANTA</TableCell>
                        <TableCell>{collator.aprEstimate}%</TableCell>
                        <TableCell>{collator.delegations}</TableCell>
                        <TableCell>
                          <Button className="bg-blue-600 text-white">
                            Stake
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
