"use client";
import React from "react";
import TokenScreen from "../components/TokenScreen";
import Image from "next/image";

const Onramp = () => {
  return (
    <div className="min-h-screen px-3 text-black bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-[55px] ">
        <div className="flex items-center justify-center space-x-2">
          <Image
            src="/img/Manta Network/manta-ramp.png"
            width={350}
            height={100}
            alt=""
          />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-[100px] pt-12">
        <div className=" ">
          {/* Right column */}
          <div className="md:flex justify-between items-center gap-[60px]">
            <div className="mb-8">
              <h2 className="text-sm font-bold mb-2 text-[#2c48f5] uppercase">
                New Token Launch
              </h2>
              <h3 className="md:text-[40px] text-[30px] font-semibold mb-4">
                $MANTA - The modular L2 for ZK applications
              </h3>
              <p className="mb-4 text-xl">
                Manta Network serves as the gateway for ZK applications,
                utilizing a modular blockchain and zkEVM to establish a new
                paradigm for an L2 smart contract platform.
              </p>
            </div>

            {/* Crypto Exchange component */}
            <TokenScreen />
          </div>

          <div className="lg:mt-[150px] mt-12">
            <h2 className="text-lg font-semibold text-center mb-4 text-[#2c48f5] uppercase">
              Manta Network Features
            </h2>
            <h3 className="md:text-[40px] text-[30px]  text-center font-medium mb-8">
              Here's what you get
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-[80px] gap-[50px]">
              <div>
                <Image
                  src="/img/Manta Network/mdi_bank-outline.svg"
                  width={100}
                  height={100}
                  alt="Governance icon"
                  className="w-12 h-12 mb-4"
                />
                <h4 className="text-xl text-[#595f68] font-bold mb-2">
                  Governance
                </h4>
                <p className="text-[#595f68]">
                  MANTA token holders can vote on network governance decisions
                  on Manta Pacific and Manta Atlantic.
                </p>
              </div>
              <div>
                <Image
                  src="/img/Manta Network/blockchain.svg"
                  width={100}
                  height={100}
                  alt="Governance icon"
                  className="w-12 h-12 mb-4"
                />
                <h4 className="text-xl text-[#595f68] font-bold mb-2">
                  Staking
                </h4>
                <p className="text-[#595f68]">
                  MANTA holders have the option to delegate their holdings with
                  collators or stake MANTA to run their own collators to secure
                  the network.
                </p>
              </div>
              <div>
                <Image
                  src="/img/Manta Network/ph_drop-bold.svg"
                  width={100}
                  height={100}
                  alt="Governance icon"
                  className="w-12 h-12 mb-4"
                />
                <h4 className="text-xl text-[#595f68] font-bold mb-2">
                  Native Liquidity & Collateral
                </h4>
                <p className="text-[#595f68]">
                  Advertising is telling the world how great you are, while
                  publicity is having others tell the world.
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex md:pt-[250px] pt-[50px] md:py-[40px] py-[10px] items-center justify-between">
            <div className="md:w-[35%]">
              <h1 className="text-4xl font-semibold mb-4">
                Buy $MANTA with Onramp Money now
              </h1>
              <p className="text-xl md:mb-0 mb-12">
                You can buy $MANTA in over 50+ countries using Onramp Money
              </p>
            </div>

            <div>
              <Image
                src="/img/Manta Network/Manta Network.svg"
                width={550}
                height={100}
                alt=""
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 pb-12 pt-[90px]    bottom-0 w-full">
        <div className="container mx-auto px-[100px]">
          <h3 className="text-lg font-semibold mb-5 text-center uppercase">
            Manta Socials
          </h3>
          <div className="flex justify-between pb-[50px] space-x-8">
            <a href="#" className="text-[#595f68] hover:underline">
              Manta Network website
            </a>
            <a href="#" className="text-[#595f68] hover:underline">
              Telegram
            </a>
            <a href="#" className="text-[#595f68] hover:underline">
              X / Twitter
            </a>
            <a href="#" className="text-[#595f68] hover:underline">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Onramp;
