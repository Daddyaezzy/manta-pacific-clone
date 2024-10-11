"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  NotebookPen,
  MessageCircleMore,
  Shield,
  BadgeCheck,
  X,
  ArrowLeft,
  Mail,
  CreditCard,
  Search,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";

export default function Paybis() {
  const [spendAmount, setSpendAmount] = useState("0.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [showFees, setShowFees] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("main");

  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState({
    code: "NGN",
    name: "Nigerian Naira",
    flag: "🇳🇬",
  });
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: "BTC",
    name: "Bitcoin",
    image: "/placeholder.svg?height=24&width=24",
  });
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const dummyCurrencies = [
    { code: "USD", name: "United States dollar", flag: "🇺🇸" },
    { code: "NGN", name: "Nigeria", flag: "🇳🇬" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "Pound sterling", flag: "🇬🇧" },
    { code: "JPY", name: "Japanese yen", flag: "🇯🇵" },
    { code: "AUD", name: "Australian dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian dollar", flag: "🇨🇦" },
    { code: "CHF", name: "Swiss franc", flag: "🇨🇭" },
    { code: "CNY", name: "Chinese yuan", flag: "🇨🇳" },
    { code: "SEK", name: "Swedish krona", flag: "🇸🇪" },
    { code: "NZD", name: "New Zealand dollar", flag: "🇳🇿" },
  ];

  console.log(filteredTokens);

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

  useEffect(() => {
    getOtherTokens();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(term.toLowerCase()) ||
        token.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTokens(filtered);
  };

  const toggleMenu = () =>
    setCurrentScreen(currentScreen === "main" ? "menu" : "main");

  const renderScreen = () => {
    switch (currentScreen) {
      case "main":
        return renderMainScreen();
      case "menu":
        return renderMenuScreen();
      case "language":
        return renderLanguageScreen();
      case "transactionHistory":
        return renderTransactionHistoryScreen();
      case "termsOfUse":
        return renderTermsOfUseScreen();
      case "selectPaymentMethod":
        return renderSelectPaymentMethodScreen();
      case "selectFiatCurrency":
        return renderSelectFiatCurrencyScreen();
      case "selectCrypto":
        return renderSelectCryptoScreen();
      default:
        return renderMainScreen();
    }
  };

  const renderMainScreen = () => (
    <div>
      <h2 className="text-xl text-center mb-[30px] font-bold">
        Buy Cryptocurrency
      </h2>
      <div className="absolute top-5 right-5 items-center mb-6">
        <button onClick={toggleMenu} className="text-black ">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4 ">
        <div className="flex items-center justify-center">
          <div>
            <div className="flex items-center justify-center">
              <div>
                <label className="block text-sm font-medium mb-1">
                  You spend
                </label>
                <div className="flex justify-between w-[380px]">
                  <div className="border-2 flex w-full p-1 border-black rounded-md">
                    <input
                      type="number"
                      value={spendAmount}
                      onChange={(e) => setSpendAmount(e.target.value)}
                      className="p-2  focus:outline-none placeholder-gray-500 font-bold text-black"
                    />
                    <button
                      onClick={() => setCurrentScreen("selectPaymentMethod")}
                      className="bg-black flex text-white px-3 py-2 rounded-md  items-center"
                    >
                      <div className=" font-semibold text-left gap-1 ">
                        {selectedFiatCurrency.code}
                        <p className="text-[10px] font-semibold">
                          Credit card/Debit Card
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <label className="block text-sm font-medium mb-1">
              You receive
            </label>
            <div className="flex justify-between w-[380px]">
              <div className="border-2 flex justify-between w-full p-1 border-black rounded-md">
                <input
                  type="number"
                  value={Number(spendAmount) / 300000}
                  onChange={(e) => setReceiveAmount(e.target.value)}
                  className="p-2 w-full focus:outline-none placeholder-gray-500 font-bold text-black"
                />
                <button
                  onClick={() => setCurrentScreen("selectCrypto")}
                  className="bg-black flex gap-1 items-center text-white px-3 py-2 rounded-md"
                >
                  <div className="font-semibold gap-1 ">
                    {selectedCrypto.symbol}
                    <p className="text-[10px] text-left font-semibold">
                      {selectedCrypto.name}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-[34px] justify-center">
          <button className="px-8 text-white bg-gray-200 py-3 rounded-lg font-medium">
            Continue
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <Image
            src="/img/Paybis Partner/mastercard-B2KsDGjH.svg"
            alt="Mastercard"
            width={30}
            height={30}
          />
          <Image
            src="/img/Paybis Partner/visa-BJbCDzAD.svg"
            alt="Visa"
            width={30}
            height={30}
          />
          <Image
            src="/img/Paybis Partner/applepay-C5sIrVob.svg"
            alt="Apple Pay"
            width={30}
            height={30}
          />
          <Image
            src="/img/Paybis Partner/googlepay-C-GnYU8Q.svg"
            alt="Google Pay"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );

  const renderMenuScreen = () => (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-2xl text-center font-bold">Menu</h1>
        <button
          onClick={toggleMenu}
          className="text-black absolute top-5 right-5"
        >
          <X size={24} />
        </button>
      </div>
      <div className="">
        <div
          onClick={() => setCurrentScreen("language")}
          className="flex border-gray-200 border-y py-1 justify-between items-center cursor-pointer"
        >
          <p>Language</p>
          <div className="flex items-center">
            <span className="mr-2">English</span>
            <ChevronDown size={20} />
          </div>
        </div>
        <div
          onClick={() => setCurrentScreen("transactionHistory")}
          className="flex border-b border-gray-200 py-1 justify-between items-center cursor-pointer"
        >
          <p>Transaction history</p>
          <ChevronDown size={20} />
        </div>
        <div
          onClick={() => setCurrentScreen("termsOfUse")}
          className="flex border-b border-gray-200 py-1 justify-between items-center cursor-pointer"
        >
          <p>Terms of use</p>
          <ChevronDown size={20} />
        </div>
        <div className="mt-8 md:flex items-center justify-between ">
          <div className="flex items-center gap-1">
            <Image
              src="/img/Paybis Partner/us-map-DNcP6-2b.png"
              alt="US Map"
              width={44}
              height={44}
            />
            <p className="text-sm">
              Global coverage of 180+ countries and 48 US states
            </p>
          </div>
          <div className="flex md:mt-0 mt-3 items-center gap-1">
            <Image
              src="/img/Paybis Partner/fin-D8i4epPl.png"
              alt="FinCEN Logo"
              width={44}
              height={44}
            />
            <p className="text-sm">
              FinCEN Department of the Treasury, United States of America
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSelectCryptoScreen = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => setCurrentScreen("main")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Select currency</h2>
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
      <div className="space-y-2">
        {filteredTokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedCrypto(token);
              setCurrentScreen("main");
            }}
          >
            <div className="flex items-center">
              <Image
                src={token.image}
                alt={token.name}
                width={24}
                height={24}
                className="mr-3"
              />
              <div>
                <p className="font-medium">{token.name}</p>
                <p className="text-sm text-gray-500">{token.symbol}</p>
              </div>
            </div>
            <p className="text-gray-500">{token.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelectFiatCurrencyScreen = () => (
    <div className="p-6 ">
      <div className="flex items-center mb-6">
        <button onClick={() => setCurrentScreen("main")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Select currency</h2>
      </div>
      <div className="relative mb-4 ">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className=" ">
        {dummyCurrencies.map((currency) => (
          <div
            key={currency.code}
            className=" p-2 hover:bg-gray-100 border-b border-gray-200 hover:rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedFiatCurrency(currency);
              setCurrentScreen("main");
            }}
          >
            <div className="flex  justify-between items-center">
              <div className="flex gap-8">
                <p className="font-semibold">{currency.code}</p>
                <p className="text-sm text-gray-500">{currency.name}</p>
              </div>
              <ChevronDown className="-rotate-90 text-gray-500" size={19} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelectPaymentMethodScreen = () => (
    <div className="p-6">
      <div className="  items-center mb-6">
        <button onClick={() => setCurrentScreen("main")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <div
          onClick={() => setCurrentScreen("selectFiatCurrency")}
          className="flex items-center cursor-pointer justify-center gap-1"
        >
          <p className="mr-1">{selectedFiatCurrency.flag}</p>
          <h2 className="text-2xl font-bold">{selectedFiatCurrency.code}</h2>
          <ChevronDown className="text-balance" size={15} />
        </div>
      </div>
      <h3 className="text-xl text-center font-bold mb-4">
        How do you want to pay?
      </h3>
      <div className="bg-gray-100 rounded-lg p-4 cursor-pointer">
        <div className=" flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="mr-3" />
            <div className="flex items-center gap-1">
              <p className="font-medium">Credit/Debit Card</p>
              <div className="flex space-x-1">
                <Image
                  src="/img/Paybis Partner/mastercard-B2KsDGjH.svg"
                  alt="Mastercard"
                  width={23}
                  height={23}
                />
                <Image
                  src="/img/Paybis Partner/visa-BJbCDzAD.svg"
                  alt="Visa"
                  width={23}
                  height={23}
                />
                <Image
                  src="/img/Paybis Partner/applepay-C5sIrVob.svg"
                  alt="Apple Pay"
                  width={23}
                  height={23}
                />
                <Image
                  src="/img/Paybis Partner/googlepay-C-GnYU8Q.svg"
                  alt="Google Pay"
                  width={23}
                  height={23}
                />
              </div>
            </div>
          </div>
          <ChevronDown className="-rotate-90" />
        </div>
        <div className="flex flex-col gap-1 pl-9 pt-2">
          <div className="flex ">
            <p className="text-white rounded-3xl p-[2px] bg-purple-400 text-[10px]">
              Instant
            </p>
          </div>
          <p className="text-sm text-gray-500 ">
            {spendAmount} {selectedFiatCurrency.code} - {spendAmount}{" "}
            {selectedFiatCurrency.code} per tx
          </p>
        </div>
      </div>
    </div>
  );

  const renderLanguageScreen = () => (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentScreen("menu")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Language</h1>
      </div>
      <div className="space-y-4">
        {[
          "English",
          "Deutsch",
          "Русский",
          "Italiano",
          "Français",
          "Español",
          "Português",
          "한국어",
        ].map((lang, index) => (
          <div
            key={index}
            className={`p-2 ${
              index === 0 || index === 4 ? "text-gray-400" : "text-black"
            }`}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactionHistoryScreen = () => (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-2">
        <button onClick={() => setCurrentScreen("menu")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        {/* <h1 className="text-2xl font-bold">Transaction History</h1> */}
      </div>
      <div className="flex flex-col items-center justify-center h-[400px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="154"
          height="124"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-mail"
        >
          <rect width="20" height="23" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <h2 className="text-xl font-bold mt-4 mb-2">Enter Email</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address to create an account or log in to the
          existing one
        </p>
        <input
          type="email"
          placeholder="Email"
          className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        />
        <button className="mt-4 px-8 py-2 bg-gray-200 text-gray-600 rounded-md">
          Continue
        </button>
      </div>
    </div>
  );

  const renderTermsOfUseScreen = () => (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentScreen("menu")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Terms of Use</h1>
      </div>
      <div className="h-[400px] overflow-y-auto text-sm">
        <h2 className="font-bold mb-2">
          Terms and Conditions (shortened version)
        </h2>
        <p>
          This is a shortened version of terms and conditions which governs your
          use of service provided by PAYBIS POLSKA Z OGRANICZONĄ
          ODPOWIEDZIALNOŚCIĄ, incorporated on 14 June 2023 (KRS number
          0001041711), whose registered office is at Hoza 86 / 210, 00-682
          Warsaw, Poland ("Paybis"). The full version of terms and conditions is
          available on the Paybis website ("Main Policy"). All capitalized terms
          used herein and not otherwise defined will have the meanings set forth
          in the Main Policy.
        </p>
        <h3 className="font-bold mt-4 mb-2">Main Principles</h3>
        <p>
          Paybis does not provide financial / investment advice for the
          Customers. Cryptocurrencies are highly volatile assets. The Customer
          must assess such risks before using the Services.
        </p>
        <p>
          Upon signing up to use the Paybis services, the Customer represents
          and warrants that the Customer: a) is at least 18 years old; b) has
          not previously been suspended from using the Services; c) has full
          power and authority to use the Services; d) is not located in, or a
          resident of any Restricted jurisdictions; or e) will not use the
          Services if any applicable laws in the Customer's jurisdiction
          prohibit the Customer from doing so.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-[#070B1D] text-white ">
      {/* <div
        className="absolute"
        style={{
          backgroundImage: "url('/img/Bridge - Manta Pacific/paybis-bg.svg')",
        }}
      ></div> */}
      <div className="relative h-[100vh]">
        <div
          style={{
            backgroundImage: "url('/img/Bridge - Manta Pacific/paybis-bg.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            // width: "100%",
            width: window.width > 500 ? "100%" : "60%",
            // height: "100%",
          }}
          className="fixed bg-[#070B1D] left-[-80px] inset-0 bg-[url('/img/Paybis Partner/paybis-bg.svg')] bg-no-repeat bg-left bg-cover"
        ></div>
        <div className=" fixed bg-gradient-to-r from-black/100 to-[#747474]/10 h-full w-[25%] z-10"></div>
        <div className="relative z-10 flex flex-col h-full">
          <header className="pt-5 px-6 flex justify-between items-center">
            <Image
              src="/img/Paybis Partner/paybis-logo.svg"
              alt="Manta Pacific Logo"
              width={window.width > 500 ? 154 : 90}
              height={window.width > 500 ? 154 : 90}
            />
          </header>
          <main className="flex-grow p-4 md:p-8 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 flex items-center justify-center md:mt-[52px] mb-8 md:mb-0">
              <div className="">
                <h1 className="text-[60px] text-center font-bold mb-4">
                  Paybis
                </h1>
                <p className="text-sm font-bold text-center mb-4 ">
                  Your transaction details
                </p>
                <p className="text-3xl font-[500] text-center mb-2">0 BTC</p>
                <p className="text-white text-center font-light mb-4">
                  for 0.00 NGN via Credit/Debit Card
                </p>
                <div
                  onClick={() => setShowFees(!showFees)}
                  className=" text-[12px] w-[300px] cursor-pointer p-2 border border-[#fff]/40 rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[#929ad8]">Including the fees</p>
                    <div className="flex items-center gap-1">
                      <p className="text-[#929ad8]">0 NGN</p>
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </div>

                  {showFees && (
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#929ad8]">Service fee</p>
                        <div className="flex items-center gap-1">
                          <p className="text-[#929ad8]">0 NGN</p>
                          {/* <ChevronDown className="ml-1 w-4 h-4" /> */}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#929ad8]">Network fee</p>
                        <div className="flex items-center gap-1">
                          <p className="text-[#929ad8]">0 NGN</p>
                          {/* <ChevronDown className="ml-1 w-4 h-4" /> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-yellow-500 text-sm text-center mt-8">
                  Cryptocurrency rate will be updated in 01:00
                </p>
              </div>
            </div>
            <div className="w-full md:w-[600px] relative">
              <div className="bg-white overflow-auto w-full h-[600px] text-black relative rounded-lg p-6 shadow-lg">
                {renderScreen()}
                {
                  <div
                    className={`${
                      currentScreen === "selectFiatCurrency" ||
                      (currentScreen === "selectCrypto" && "hidden")
                    } flex p-3 justify-evenly rounded-b-lg w-full absolute left-0 bottom-0 text-black bg-gray-300 `}
                  >
                    <div
                      onClick={() => setCurrentScreen("transactionHistory")}
                      className="font-bold text-md flex gap-1 cursor-pointer"
                    >
                      <NotebookPen />
                      Transaction history
                    </div>
                    <div className="font-bold text-md flex gap-1 cursor-pointer">
                      <MessageCircleMore />
                      Live chat
                    </div>
                  </div>
                }
              </div>
            </div>
          </main>
          <div className="flex md:justify-between justify-center p-5 px-12">
            <div className="md:flex hidden gap-6">
              <div className="flex items-center text-sm gap-1 text-gray-500">
                <BadgeCheck />
                Security <br /> Standard
              </div>
              <div className="flex items-center text-sm gap-1 text-gray-500">
                <Shield />
                Payment <br /> Secure
              </div>
            </div>
            <div className="flex items-center gap-2">
              Powered by{" "}
              <Image
                src="/img/Paybis Partner/paybis-logo.svg"
                alt="Manta Pacific Logo"
                width={94}
                height={94}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
