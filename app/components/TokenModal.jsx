"use client";
/* eslint-disable */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { ChevronDown, X } from "lucide-react";

export default function TokenModal({
  isModalOpen,
  setIsModalOpen,
  setSelectedToken,
  selectedToken,
}) {
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

      // Filter tokens to include only those that have a valid image
      const filteredTokenData = tokenData.filter(
        (token) => token.image && token.image.trim() !== ""
      );

      const mappedTokens = filteredTokenData.map((token) => ({
        name: token.name,
        address: token.address,
        symbol: token.symbol,
        image: `https://ethplorer.io${token.image}`,
      }));

      setTokens([selectedToken, ...mappedTokens]);
      setFilteredTokens([selectedToken, ...mappedTokens]);
    } catch (err) {
      console.error("Error fetching tokens:", err);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(term) ||
        token.symbol.toLowerCase().includes(term) ||
        token.address.toLowerCase().includes(term)
    );
    setFilteredTokens(filtered);
    setNoneFound(filtered.length === 0);
  };

  const handleSelectToken = (token) => {
    setSelectedToken(token);
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Token</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter token name or paste address"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="max-h-64 overflow-y-auto">
              {filteredTokens.map((token, index) => (
                <div
                  key={index}
                  className="flex items-center py-4 px-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectToken(token)}
                >
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={32}
                    height={32}
                    className="mr-2 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-sm text-gray-500">{token.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4  px-6 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
