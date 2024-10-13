"use client";
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
import React, { useState } from "react";

const AtlanticNavbar = () => {
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

  const [activeTab, setActiveTab] = useState("Bridge");
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [fromOption, setFromOption] = useState(mantaOptions[0]);
  const [toOption, setToOption] = useState(mantaOptions[1]);

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
              <SelectValue placeholder={selectedNetwork} />
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
  );
};

export default AtlanticNavbar;
