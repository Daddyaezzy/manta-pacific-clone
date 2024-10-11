"use client";
/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ChevronDown,
  ArrowDown,
  X,
  ArrowRight,
  Minus,
} from "lucide-react";
import Image from "next/image";

const dummyCurrencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "AMD", name: "Armenian Dram", flag: "🇦🇲" },
  { code: "AOA", name: "Angolan Kwanza", flag: "🇦🇴" },
  { code: "AZN", name: "Azerbaijani Manat", flag: "🇦🇿" },
  { code: "BGN", name: "Bulgarian Lev", flag: "🇧🇬" },
  { code: "BMD", name: "Bermudian Dollar", flag: "🇧🇲" },
  { code: "BND", name: "Brunei Dollar", flag: "🇧🇳" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
];

export default function CryptoSwap() {
  const [activeTab, setActiveTab] = useState("buy");
  const [currentScreen, setCurrentScreen] = useState("main");
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState(
    dummyCurrencies[0]
  );
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: "USDT",
    name: "Tether",
    image: "/placeholder.svg?height=24&width=24",
  });
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOtherTokens();
  }, []);

  const getOtherTokens = async () => {
    try {
      const apiKey = "EK-g5Pzu-jCzu51S-5sNww";
      const response = await axios.get(
        `https://api.ethplorer.io/getTopTokens?apiKey=${apiKey}`
      );

      const tokenData = response.data.tokens || [];
      const filteredTokenData = tokenData.filter(
        (token) => token.image && token.image.trim() !== ""
      );

      console.log(tokenData);

      const mappedTokens = filteredTokenData.map((token) => ({
        name: token.name,
        address: token.address,
        symbol: token.symbol,
        image: `https://ethplorer.io${token.image}`,
      }));

      setTokens([selectedCrypto, ...mappedTokens]);
      setFilteredTokens([selectedCrypto, ...mappedTokens]);
    } catch (err) {
      console.error("Error fetching tokens:", err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (currentScreen === "selectCrypto") {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(term.toLowerCase()) ||
          token.symbol.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else if (currentScreen === "selectFiat") {
      const filtered = dummyCurrencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(term.toLowerCase()) ||
          currency.code.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTokens(filtered);
    }
  };

  const renderMainScreen = () => (
    <div className="bg-white rounded-3xl">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-4 w-full rounded-tl-3xl text-lg font-semibold ${
            activeTab === "buy"
              ? "text-black bg-white"
              : "text-gray-500 bg-gray-100 rounded-br-3xl"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-4 w-full text-lg rounded-tr-3xl font-semibold ${
            activeTab === "sell"
              ? "text-black bg-white "
              : "text-gray-500 bg-gray-100 rounded-bl-3xl"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell
        </button>
      </div>
      <div className="px-6 pb-6  text-black relative rounded-lg h-[450px] shadow-lg w-[408px] mx-auto">
        <div className="">
          <div className="relative">
            <p className="text-sm p-[1px] left-2 top-[-14px] absolute  bg-white text-teal-500 mb-1">
              {activeTab === "buy" ? "I want to Pay" : "I want to Sell"}
            </p>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="flex-1 p-3 outline-none"
                placeholder="0"
              />
              <button
                onClick={() =>
                  setCurrentScreen(
                    activeTab === "buy" ? "selectFiat" : "selectCrypto"
                  )
                }
                className="bg-gray-100 px-4 py-2 flex items-center"
              >
                {activeTab === "buy" ? (
                  <>
                    <span className="mr-2">{selectedFiatCurrency.flag}</span>
                    {selectedFiatCurrency.code}
                  </>
                ) : (
                  <>
                    <img
                      src={selectedCrypto.image}
                      alt={selectedCrypto.name}
                      className="w-6 h-6 mr-2"
                    />
                    {selectedCrypto.symbol}
                  </>
                )}
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="pl-5">
            <Image
              src="/img/Alchemy Pay Ramp/Group253.2d94608a.svg"
              width={20}
              height={20}
              alt=""
              className=""
            />
          </div>
          <div className="relative mt-4">
            <p className="text-sm p-[1px] left-2 top-[-14px] absolute  bg-white text-teal-500 mb-1">
              I will Receive ≈
            </p>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="number"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="flex-1 p-3 outline-none"
                placeholder="0"
              />
              <button
                onClick={() =>
                  setCurrentScreen(
                    activeTab === "buy" ? "selectCrypto" : "selectFiat"
                  )
                }
                className="bg-gray-100 px-4 py-2 flex items-center"
              >
                {activeTab === "buy" ? (
                  <>
                    <img
                      src={selectedCrypto.image}
                      alt={selectedCrypto.name}
                      className="w-6 h-6 mr-2"
                    />
                    {selectedCrypto.symbol}
                  </>
                ) : (
                  <>
                    <span className="mr-2">{selectedFiatCurrency.flag}</span>
                    {selectedFiatCurrency.code}
                  </>
                )}
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Reference price 1 {selectedCrypto.symbol} = 1{" "}
            {selectedFiatCurrency.code}
          </p>
          <div className="flex items-center justify-center">
            <button className="w-[90%]  absolute bottom-10 bg-teal-500 text-white py-3 rounded-lg font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrencySelection = () => (
    <div className="p-6 relative bg-white text-black rounded-lg shadow-lg w-[408px] mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-gray-400 font-semibold mb-4">
          Select a currency
        </h2>
      </div>
      <div
        onClick={() => setCurrentScreen("main")}
        className="absolute top-3 right-3 p-2 cursor-pointer rounded-full bg-gray-300"
      >
        <X size={15} className="  text-white " />
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {(currentScreen === "selectCrypto"
          ? filteredTokens
          : dummyCurrencies
        ).map((item) => (
          <div
            key={item.symbol || item.code}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => {
              if (currentScreen === "selectCrypto") {
                setSelectedCrypto(item);
              } else {
                setSelectedFiatCurrency(item);
              }
              setCurrentScreen("main");
            }}
          >
            <div className="flex items-center ">
              {currentScreen === "selectCrypto" ? (
                <div className="flex text-sm items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      className=""
                      width={15}
                      height={15}
                      alt=""
                    />
                    <div>{item.name} - Ethereum</div>
                  </div>
                </div>
              ) : (
                <div className="flex text-sm items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>{item.flag}</div>
                    <div>{item.name}</div>
                  </div>
                </div>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {currentScreen === "main"
        ? renderMainScreen()
        : renderCurrencySelection()}
      <div className="absolute bottom-4 right-4 text-black cursor-pointer flex items-center gap-2 px-5 py-2 rounded-3xl bg-teal-500">
        <div className="p-1 rounded-full border h-5 w-5 flex items-center justify-center border-black">
          ?
        </div>
        Help
      </div>
    </div>
  );
}
