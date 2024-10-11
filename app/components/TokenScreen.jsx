import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ChevronRight,
  Send,
  ArrowDown,
  ArrowLeftRightIcon,
  UserRound,
  ALargeSmall,
  Gift,
  Briefcase,
  Globe,
  ArrowUp,
  Clock,
} from "lucide-react";

const TokenScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("buy");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [fiats, setFiats] = useState([
    { name: "Indian Rupees", code: "INR", symbol: "₹", flag: "🇮🇳" },
    { name: "Türk Lirası", code: "TRY", symbol: "₺", flag: "🇹🇷" },
    { name: "Emirati Dirham", code: "AED", symbol: "د.إ", flag: "🇦🇪" },
    { name: "Mexican Peso", code: "MXN", symbol: "$", flag: "🇲🇽" },
    { name: "Vietnamese Dong", code: "VND", symbol: "₫", flag: "🇻🇳" },
    { name: "Nigerian Naira", code: "NGN", symbol: "₦", flag: "🇳🇬" },
    { name: "Brazilian Real", code: "BRL", symbol: "R$", flag: "🇧🇷" },
  ]);
  const [selectedFiat, setSelectedFiat] = useState(fiats[0]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "🇮🇳",
  });

  const sideItems = [
    { icon: <ArrowDown />, name: "Buy" },
    { icon: <ArrowUp />, name: "Sell" },
    { icon: <ArrowLeftRightIcon />, name: "Swap" },
    { icon: <UserRound />, name: "Profile" },
    { icon: <Clock />, name: "History" },
    { icon: <ALargeSmall />, name: "Language" },
    { icon: <Gift />, name: "Refer" },
    { icon: <Briefcase />, name: "Bank Accounts" },
    { icon: <Globe />, name: "Support" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);

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

      const mappedTokens = filteredTokenData.map((token) => ({
        name: token.name,
        address: token.address,
        symbol: token.symbol,
        image: `https://ethplorer.io${token.image}`,
      }));

      const defaultTokens = [
        {
          name: "Manta",
          symbol: "MANTA",
          image: "/placeholder.svg?height=24&width=24",
        },
        {
          name: "Bitcoin",
          symbol: "BTC",
          image: "/placeholder.svg?height=24&width=24",
        },
        {
          name: "Tether",
          symbol: "USDT",
          image: "/placeholder.svg?height=24&width=24",
        },
      ];

      setTokens([...defaultTokens, ...mappedTokens]);
      setSelectedToken(defaultTokens[0]);
    } catch (err) {
      console.error("Error fetching tokens:", err);
    }
  };

  const handleOutsideClick = (e) => {
    if (sidebarOpen && !e.target.closest(".sidebar")) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case "buy":
        return <BuyScreen />;
      case "sell":
        return <SellScreen />;
      case "swap":
        return <SwapScreen />;
      case "selectFiat":
        return (
          <SelectScreen
            items={fiats}
            onSelect={setSelectedFiat}
            onClose={() => setCurrentScreen("buy")}
            title="Select Fiat"
          />
        );
      case "selectToken":
        return (
          <SelectScreen
            items={tokens}
            onSelect={setSelectedToken}
            onClose={() => setCurrentScreen("buy")}
            title="Select Token"
          />
        );
      case "selectCountry":
        return (
          <SelectScreen
            items={fiats}
            onSelect={setSelectedCountry}
            onClose={() => setCurrentScreen("phoneNumber")}
            title="Select Country"
          />
        );
      case "phoneNumber":
        return <PhoneNumberScreen />;
      case "profile":
        return <PhoneNumberScreen />;
      case "history":
        return <PhoneNumberScreen />;
      case "lanugage":
        return <PhoneNumberScreen />;
      default:
        return <BuyScreen />;
    }
  };

  const BuyScreen = () => (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Pay</h2> */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pay
        </label>
        <div
          className={`flex items-center border-2 rounded-md  focus-within:border-blue-500 transition-colors duration-300`}
        >
          <input
            type="text"
            placeholder={`min ${selectedFiat.symbol} 185`}
            className="flex-grow rounded-lg   p-3 md:w-full w-[90%] outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="flex items-center w-[70%] bg-[#f3f4f6] p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectFiat")}
          >
            {selectedFiat.flag} {selectedFiat.code}
            <ChevronDown size={15} className="ml-2 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {[1000, 5000, 10000].map((preset) => (
          <button
            key={preset}
            className="bg-[#f3f4f6] text-[#a9aec1] font-bold px-2 text-sm py-1 rounded"
            onClick={() => setAmount(preset.toString())}
          >
            {selectedFiat.symbol}
            {preset}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          You get
        </label>
        <div className="flex items-center border-2 rounded-md">
          <input
            type="text"
            value={amount / 100}
            readOnly
            className="flex-grow p-3 md:w-full w-[80%] outline-none"
          />
          <button
            className="flex items-center bg-[#f3f4f6] p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectToken")}
          >
            <img
              src={
                selectedToken?.image || "/placeholder.svg?height=24&width=24"
              }
              alt={selectedToken?.symbol}
              className="w-6 h-6 mr-2"
            />
            {selectedToken?.symbol}
            <ChevronDown size={15} className="ml-2 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="text-sm flex justify-between text-gray-500 mb-4">
        <div> 1 {selectedToken?.symbol} ≈</div>
        <div> Network Fee: 0.15 {selectedToken?.symbol}</div>
      </div>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-100  px-2 py-4 rounded-md mb-4"
      >
        <div className="flex items-center cursor-pointer justify-between">
          <span className="text-blue-600 font-semibold">
            You pay {selectedFiat.symbol} {amount || 0}
          </span>
          <ChevronDown
            size={15}
            className={`transform transition-transform duration-300 ${
              showDetails && "rotate-180"
            } ease-in-out inline-block ml-2`}
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetails ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {" "}
          <div className="flex items-center text-sm mt-5 justify-between">
            <span className=" ">Onramp fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Blockchain Fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Total Fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
        </div>
      </div>
      <button className="w-full mt-12 bg-blue-600 text-white py-4 font-semibold rounded-md">
        Proceed
      </button>
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-600">
          Missing Deposit? Claim here &gt;
        </a>
      </div>
    </div>
  );

  const SellScreen = () => (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Sell</h2> */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sell
        </label>
        <div
          className={`flex items-center border-2 rounded-md  focus-within:border-blue-500 transition-colors duration-300`}
        >
          <input type="text" className="flex-grow p-3 outline-none" />
          <button
            className="flex items-center bg-gray-100 p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectToken")}
          >
            <img
              src={
                selectedToken?.image || "/placeholder.svg?height=24&width=24"
              }
              alt={selectedToken?.symbol}
              className="w-6 h-6 mr-2"
            />
            {selectedToken?.symbol}
            <ChevronDown size={15} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          You get
        </label>
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            placeholder={`min ${selectedFiat.symbol} 100`}
            className="flex-grow rounded-lg   p-3 md:w-full w-[90%] outline-none"
          />
          <button
            className="flex items-center w-[70%] bg-[#f3f4f6] p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectFiat")}
          >
            {selectedFiat.flag} {selectedFiat.code}
            <ChevronDown size={15} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {[1000, 5000, 10000].map((preset) => (
          <button
            key={preset}
            className="bg-[#f3f4f6] text-[#a9aec1] font-bold px-2 text-sm py-1 rounded"
            onClick={() => setAmount2(preset.toString())}
          >
            {selectedFiat.symbol}
            {preset}
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        1 {selectedToken?.symbol} ≈
      </div>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-100  px-2 py-4 rounded-md mb-4"
      >
        <div className="flex items-center cursor-pointer justify-between">
          <span className="text-blue-600 font-semibold">
            You get {selectedFiat.symbol} {amount2 || 0}
          </span>
          <ChevronDown
            size={15}
            className={`transform transition-transform duration-300 ${
              showDetails && "rotate-180"
            } ease-in-out inline-block ml-2`}
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetails ? "max-h-[180px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {" "}
          <div className="flex items-center text-sm mt-5 justify-between">
            <span className=" ">Network fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Onramp fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">TDS (1%)</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Payment gateway fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Total fee</span>
            {selectedFiat.symbol} {amount || 0}
          </div>
          <div className=" text-[12px] mt-2 text-gray-500  z-4 justify-between">
            Note: TDS of 1% is levied by income <br /> Tax department, Gol
          </div>
        </div>
      </div>
      <button className="w-full mt-12 bg-blue-600 text-white py-4 font-semibold rounded-md">
        Proceed
      </button>
    </div>
  );

  const SwapScreen = () => (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Swap</h2> */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          You Send
        </label>
        <div
          className={`flex items-center border-2 rounded-md  focus-within:border-blue-500 transition-colors duration-300`}
        >
          <input
            type="text"
            placeholder="min 5.5 USDT"
            className="flex-grow rounded-lg   p-3 md:w-full w-[90%] outline-none"
          />
          <button
            className="flex items-center w-[70%] bg-[#f3f4f6] p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectToken")}
          >
            <img
              src={
                selectedToken?.image || "/placeholder.svg?height=24&width=24"
              }
              alt={selectedToken?.symbol}
              className="w-6 h-6 mr-2"
            />
            {selectedToken?.symbol}
            <ChevronDown size={15} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <button
          className={`border-2 border-gray-200 hover:bg-gray-200 p-2 rounded-2xl`}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 4.5H8.5V17.5H10.5V19.5H8.5V21.5H6.5V19.5H4.5V17.5H6.5V4.5ZM2.5 15.5C2.5 16.281 2.5 17.5 2.5 17.5H4.5V15.5C4.5 15.5 3.28105 15.5 2.5 15.5ZM12.5 15.5V17.5H10.5V15.5H12.5Z"
              fill="#9cacaf"
            ></path>
            <path
              d="M18.5 19.5L16.5 19.5L16.5 6.5L14.5 6.5L14.5 4.5L16.5 4.5L16.5 2.5L18.5 2.5L18.5 4.5L20.5 4.5L20.5 6.5L18.5 6.5L18.5 19.5ZM22.5 8.5L22.5 6.5L20.5 6.5L20.5 8.5L22.5 8.5ZM12.5 8.5L12.5 6.5L14.5 6.5L14.5 8.5L12.5 8.5Z"
              fill="#9cacaf"
            ></path>
          </svg>
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          You Receive
        </label>
        <div className="flex items-center border-2 rounded-md">
          <input
            type="text"
            readOnly
            className="flex-grow rounded-lg   p-3 md:w-full w-[90%] outline-none"
          />
          <button
            className="flex items-center w-[70%] bg-[#f3f4f6] p-3 rounded-r-md"
            onClick={() => setCurrentScreen("selectToken")}
          >
            <img
              src={
                selectedToken?.image || "/placeholder.svg?height=24&width=24"
              }
              alt={selectedToken?.symbol}
              className="w-6 h-6 mr-2"
            />
            BTC
            <ChevronDown size={15} className="ml-2" />
          </button>
        </div>
      </div>
      <div className="text-sm flex justify-between text-gray-500 mb-4">
        <div>1 {selectedToken?.symbol} ≈</div>
        <div>Network Fee: 0.000009 {selectedToken?.symbol}</div>
      </div>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-100  px-2 py-4 rounded-md mb-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold">
            You get 0 {selectedToken?.symbol}
          </span>
          <ChevronDown
            size={15}
            className={`transform transition-transform duration-300 ${
              showDetails && "rotate-180"
            } ease-in-out inline-block ml-2`}
          />
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetails ? "max-h-[180px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {" "}
          <div className="flex items-center text-sm mt-5 justify-between">
            <span className=" ">Network fee</span>
            {selectedToken.symbol} {amount || 0}
          </div>
          <div className="flex items-center text-sm mt-1 justify-between">
            <span className=" ">Onramp fee</span>
            {selectedToken.symbol} {amount || 0}
          </div>
        </div>
      </div>

      <button className="w-full mt-12 bg-blue-600 text-white py-4 font-semibold rounded-md">
        Proceed
      </button>
    </div>
  );

  const PhoneNumberScreen = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Enter Phone number</h2>
      <div className="mb-4">
        <div className="flex items-center border rounded-md">
          <button
            className="flex items-center bg-gray-100 p-2 rounded-l-md"
            onClick={() => setCurrentScreen("selectCountry")}
          >
            {selectedCountry.flag} {selectedCountry.code}
            <ChevronDown className="ml-2" />
          </button>
          <input
            type="tel"
            placeholder="Phone number"
            className="flex-grow p-2 outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">
            I agree to the{" "}
            <a href="#" className="text-blue-600">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>{" "}
            of Onramp.money
          </span>
        </label>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-4">
        Continue
      </button>
      <div className="text-center">
        <span className="text-gray-500">OR</span>
      </div>
      <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md mt-4 flex gap-2 items-center justify-center">
        <Send />
        Login with Telegram
      </button>
    </div>
  );

  const SelectScreen = ({ items, onSelect, onClose, title }) => {
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      setFilteredItems(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.code.toLowerCase().includes(term)
        )
      );
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              <div className="flex items-center">
                {item.flag && (
                  <span className="mr-2 text-2xl">{item.flag}</span>
                )}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-6 h-6 mr-2"
                  />
                )}
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">
                  {item.code || item.symbol}
                </span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-start   p-4">
      <div className="md:w-[350px] w-[300px] bg-[#fdfdfd]  relative">
        <header className="flex justify-center items-center p-4 ">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 absolute top-5 left-3"
          >
            <Menu size={24} />
          </button>
          <svg
            width="138"
            height="32"
            viewBox="0 0 138 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_14336_27641)">
              <path
                d="M27.0438 0.535645H32.7456L13.8035 20.393H18.8474H24.8507V24.5835H2.99585L27.0438 0.535645Z"
                fill="#151515"
              ></path>
              <path
                d="M31.5695 23.9921L29.0447 27.1005V8.55796L18.1139 19.5015H14.4317L31.5695 1.49946V23.9921Z"
                fill="white"
              ></path>
              <path
                d="M3.08147 28.4296V24.9377H25.087V14.0853L27.9387 11.2303V28.4296H3.08147Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.0447 8.55796V27.1005L31.5695 23.9921V1.49946L14.4317 19.5015H18.1139L29.0447 8.55796ZM19.6771 19.5015H23.981V15.1926L19.6771 19.5015ZM25.087 14.0853V24.9377H3.08147V28.4296H27.9387V11.2303L25.087 14.0853ZM28.4917 29.5356H1.97546V24.3847L26.7955 -0.464355H32.6755V24.3847L28.4917 29.5356ZM30.859 0.641655L11.8517 20.6075H23.981V23.8317H4.09105L27.254 0.641655H30.859Z"
                fill="#151515"
              ></path>
            </g>
            <path
              d="M48.346 13.0843C47.536 13.0843 46.791 12.9443 46.111 12.6643C45.431 12.3743 44.846 11.9793 44.356 11.4793C43.876 10.9793 43.496 10.3893 43.216 9.70932C42.946 9.02932 42.811 8.29432 42.811 7.50432C42.811 6.71432 42.946 5.97932 43.216 5.29932C43.496 4.61932 43.876 4.02932 44.356 3.52932C44.846 3.02932 45.431 2.63932 46.111 2.35932C46.791 2.06932 47.536 1.92432 48.346 1.92432C49.156 1.92432 49.901 2.06932 50.581 2.35932C51.261 2.63932 51.841 3.02932 52.321 3.52932C52.811 4.02932 53.191 4.61932 53.461 5.29932C53.741 5.97932 53.881 6.71432 53.881 7.50432C53.881 8.29432 53.741 9.02932 53.461 9.70932C53.191 10.3893 52.811 10.9793 52.321 11.4793C51.841 11.9793 51.261 12.3743 50.581 12.6643C49.901 12.9443 49.156 13.0843 48.346 13.0843ZM48.346 11.7343C48.956 11.7343 49.506 11.6243 49.996 11.4043C50.486 11.1743 50.906 10.8693 51.256 10.4893C51.606 10.1093 51.876 9.66432 52.066 9.15432C52.256 8.63432 52.351 8.08432 52.351 7.50432C52.351 6.92432 52.256 6.37932 52.066 5.86932C51.876 5.34932 51.606 4.89932 51.256 4.51932C50.906 4.13932 50.486 3.83932 49.996 3.61932C49.506 3.38932 48.956 3.27432 48.346 3.27432C47.736 3.27432 47.186 3.38932 46.696 3.61932C46.206 3.83932 45.786 4.13932 45.436 4.51932C45.086 4.89932 44.816 5.34932 44.626 5.86932C44.436 6.37932 44.341 6.92432 44.341 7.50432C44.341 8.08432 44.436 8.63432 44.626 9.15432C44.816 9.66432 45.086 10.1093 45.436 10.4893C45.786 10.8693 46.206 11.1743 46.696 11.4043C47.186 11.6243 47.736 11.7343 48.346 11.7343Z"
              fill="#151515"
            ></path>
            <path
              d="M57.9515 2.19432H59.8415L65.6915 10.9243H65.7215V2.19432H67.1615V12.8143H65.3315L59.4215 4.08432H59.3915V12.8143H57.9515V2.19432Z"
              fill="#151515"
            ></path>
            <path
              d="M71.89 2.19432H75.625C76.305 2.19432 76.865 2.28932 77.305 2.47932C77.745 2.65932 78.09 2.89432 78.34 3.18432C78.6 3.46432 78.78 3.78432 78.88 4.14432C78.98 4.49432 79.03 4.83432 79.03 5.16432C79.03 5.50432 78.97 5.83432 78.85 6.15432C78.73 6.46432 78.555 6.74932 78.325 7.00932C78.105 7.25932 77.83 7.47432 77.5 7.65432C77.18 7.82432 76.82 7.92932 76.42 7.96932L79.435 12.8143H77.635L74.935 8.13432H73.33V12.8143H71.89V2.19432ZM73.33 6.87432H75.22C75.5 6.87432 75.775 6.85432 76.045 6.81432C76.325 6.76432 76.57 6.67932 76.78 6.55932C77 6.43932 77.175 6.26932 77.305 6.04932C77.435 5.81932 77.5 5.52432 77.5 5.16432C77.5 4.80432 77.435 4.51432 77.305 4.29432C77.175 4.06432 77 3.88932 76.78 3.76932C76.57 3.64932 76.325 3.56932 76.045 3.52932C75.775 3.47932 75.5 3.45432 75.22 3.45432H73.33V6.87432Z"
              fill="#151515"
            ></path>
            <path
              d="M95.5164 2.19432H97.6614L101.036 10.2343H101.096L104.441 2.19432H106.586V12.8143H105.146V4.08432H105.116L101.531 12.8143H100.571L96.9864 4.08432H96.9564V12.8143H95.5164V2.19432Z"
              fill="#151515"
            ></path>
            <path
              d="M111.215 2.19432H114.95C115.63 2.19432 116.19 2.28932 116.63 2.47932C117.07 2.65932 117.415 2.89432 117.665 3.18432C117.925 3.46432 118.105 3.78432 118.205 4.14432C118.305 4.49432 118.355 4.83432 118.355 5.16432C118.355 5.49432 118.305 5.83932 118.205 6.19932C118.105 6.54932 117.925 6.86932 117.665 7.15932C117.415 7.43932 117.07 7.67432 116.63 7.86432C116.19 8.04432 115.63 8.13432 114.95 8.13432H112.655V12.8143H111.215V2.19432ZM112.655 6.87432H114.545C114.825 6.87432 115.1 6.85432 115.37 6.81432C115.65 6.76432 115.895 6.67932 116.105 6.55932C116.325 6.43932 116.5 6.26932 116.63 6.04932C116.76 5.81932 116.825 5.52432 116.825 5.16432C116.825 4.80432 116.76 4.51432 116.63 4.29432C116.5 4.06432 116.325 3.88932 116.105 3.76932C115.895 3.64932 115.65 3.56932 115.37 3.52932C115.1 3.47932 114.825 3.45432 114.545 3.45432H112.655V6.87432Z"
              fill="#151515"
            ></path>
            <path
              d="M86.3899 2.19432H87.6949L92.2399 12.8143H90.5599L88.9699 8.92932L86.9899 4.05432H86.9599L83.3899 12.8143H81.7099L86.3899 2.19432Z"
              fill="#151515"
            ></path>
            <path
              d="M42.418 25.9175C42.418 25.6228 42.5176 25.3758 42.717 25.1765C42.9163 24.9771 43.172 24.8775 43.484 24.8775C43.796 24.8775 44.056 24.9771 44.264 25.1765C44.472 25.3758 44.576 25.6228 44.576 25.9175C44.576 26.2078 44.472 26.4505 44.264 26.6455C44.056 26.8361 43.796 26.9315 43.484 26.9315C43.172 26.9315 42.9163 26.834 42.717 26.639C42.5176 26.444 42.418 26.2035 42.418 25.9175ZM54.6749 26.8145V23.1225C54.6749 22.6545 54.5623 22.3013 54.3369 22.063C54.1116 21.8246 53.8169 21.7055 53.4529 21.7055C52.9936 21.7055 52.6318 21.8918 52.3674 22.2645C52.1031 22.6371 51.9709 23.2005 51.9709 23.9545H51.3339C51.3339 23.2915 51.3946 22.7303 51.5159 22.271C51.6416 21.8073 51.8171 21.4346 52.0424 21.153C52.2721 20.867 52.5408 20.659 52.8484 20.529C53.1561 20.3946 53.4963 20.3275 53.8689 20.3275C54.3846 20.3275 54.8158 20.4445 55.1624 20.6785C55.5134 20.9081 55.7778 21.2331 55.9554 21.6535C56.1331 22.0738 56.2219 22.5635 56.2219 23.1225V26.8145H54.6749ZM46.1079 26.8145V20.5095H47.4469L47.6159 21.5885C47.8239 21.1681 48.0991 20.854 48.4414 20.646C48.7838 20.4336 49.1759 20.3275 49.6179 20.3275C50.1379 20.3275 50.5713 20.4445 50.9179 20.6785C51.2689 20.9081 51.5311 21.2331 51.7044 21.6535C51.8821 22.0738 51.9709 22.5635 51.9709 23.1225V26.8145H50.4369V23.1225C50.4369 22.6545 50.3243 22.3013 50.0989 22.063C49.8736 21.8246 49.5789 21.7055 49.2149 21.7055C48.9073 21.7055 48.6343 21.79 48.3959 21.959C48.1619 22.128 47.9778 22.3836 47.8434 22.726C47.7091 23.064 47.6419 23.4865 47.6419 23.9935V26.8145H46.1079ZM60.9308 26.9965C60.3544 26.9965 59.8323 26.873 59.3643 26.626C58.9006 26.379 58.5323 26.0106 58.2593 25.521C57.9863 25.027 57.8498 24.4095 57.8498 23.6685C57.8498 22.9145 57.9863 22.2905 58.2593 21.7965C58.5323 21.3025 58.9006 20.9341 59.3643 20.6915C59.8323 20.4488 60.3544 20.3275 60.9308 20.3275C61.4984 20.3275 62.0119 20.4488 62.4713 20.6915C62.9349 20.9341 63.3033 21.3025 63.5763 21.7965C63.8493 22.2905 63.9858 22.9145 63.9858 23.6685C63.9858 24.4095 63.8493 25.027 63.5763 25.521C63.3033 26.0106 62.9349 26.379 62.4713 26.626C62.0119 26.873 61.4984 26.9965 60.9308 26.9965ZM60.8788 25.6575C61.1821 25.6575 61.4508 25.5838 61.6848 25.4365C61.9231 25.2848 62.1094 25.0616 62.2438 24.767C62.3824 24.4723 62.4518 24.1061 62.4518 23.6685C62.4518 23.0011 62.3196 22.4985 62.0553 22.1605C61.7953 21.8225 61.4378 21.6535 60.9828 21.6535C60.6751 21.6535 60.4021 21.7293 60.1638 21.881C59.9254 22.0283 59.7369 22.2515 59.5983 22.5505C59.4639 22.8495 59.3968 23.2221 59.3968 23.6685C59.3968 24.3271 59.5289 24.8233 59.7933 25.157C60.0619 25.4906 60.4238 25.6575 60.8788 25.6575ZM70.1401 26.8145V23.1225C70.1401 22.6545 70.0274 22.3013 69.8021 22.063C69.5767 21.8246 69.2821 21.7055 68.9181 21.7055C68.6104 21.7055 68.3374 21.79 68.0991 21.959C67.8651 22.128 67.6809 22.3836 67.5466 22.726C67.4122 23.064 67.3451 23.4865 67.3451 23.9935H66.8381C66.8381 23.1745 66.9399 22.4941 67.1436 21.9525C67.3472 21.4065 67.6354 20.9991 68.0081 20.7305C68.3807 20.4618 68.8184 20.3275 69.3211 20.3275C69.8411 20.3275 70.2744 20.4445 70.6211 20.6785C70.9721 20.9081 71.2342 21.2331 71.4076 21.6535C71.5852 22.0738 71.6741 22.5635 71.6741 23.1225V26.8145H70.1401ZM65.8111 26.8145V20.5095H67.1501L67.3451 21.7575V26.8145H65.8111ZM76.2637 26.9965C75.7263 26.9965 75.2345 26.8578 74.7882 26.5805C74.3418 26.3031 73.9843 25.9153 73.7157 25.417C73.447 24.9143 73.3127 24.3271 73.3127 23.6555C73.3127 22.9621 73.4448 22.3663 73.7092 21.868C73.9778 21.3696 74.3353 20.9883 74.7817 20.724C75.228 20.4596 75.722 20.3275 76.2637 20.3275C76.7663 20.3275 77.1997 20.4293 77.5637 20.633C77.932 20.8323 78.2267 21.1053 78.4477 21.452C78.673 21.7943 78.8247 22.1821 78.9027 22.6155C78.9807 23.0488 78.985 23.4951 78.9157 23.9545H74.5347V23.1225H77.8302L77.5312 23.3175C77.5442 23.1138 77.5333 22.908 77.4987 22.7C77.4683 22.492 77.4077 22.3013 77.3167 22.128C77.2257 21.9546 77.0957 21.816 76.9267 21.712C76.762 21.6036 76.5497 21.5495 76.2897 21.5495C75.9777 21.5495 75.7133 21.6275 75.4967 21.7835C75.28 21.9395 75.1153 22.1518 75.0027 22.4205C74.89 22.6891 74.8337 22.9925 74.8337 23.3305V23.9415C74.8337 24.2968 74.8857 24.611 74.9897 24.884C75.098 25.157 75.2562 25.3715 75.4642 25.5275C75.6765 25.6835 75.943 25.7615 76.2637 25.7615C76.5627 25.7615 76.814 25.6921 77.0177 25.5535C77.2213 25.4148 77.3513 25.2068 77.4077 24.9295H78.9547C78.8897 25.3368 78.7358 25.6965 78.4932 26.0085C78.2548 26.3161 77.945 26.5588 77.5637 26.7365C77.1823 26.9098 76.749 26.9965 76.2637 26.9965ZM79.8422 20.5095H81.5842L83.2612 25.4755H82.9882L84.4312 20.5095H85.9912L83.5732 27.9585C83.3262 28.7038 83.0207 29.2433 82.6567 29.577C82.297 29.9106 81.8572 30.0775 81.3372 30.0775C81.0382 30.0775 80.7457 30.0428 80.4597 29.9735C80.178 29.9085 79.8899 29.8045 79.5952 29.6615V28.3095C79.8335 28.4568 80.0632 28.5651 80.2842 28.6345C80.5095 28.7038 80.7349 28.7385 80.9602 28.7385C81.1639 28.7385 81.3415 28.6821 81.4932 28.5695C81.6492 28.4611 81.7835 28.3073 81.8962 28.108C82.0089 27.913 82.1042 27.6855 82.1822 27.4255L82.3772 26.8145L79.8422 20.5095Z"
              fill="#2C5BFF"
            ></path>
            <defs>
              <clipPath id="clip0_14336_27641">
                <rect
                  width="44"
                  height="31"
                  fill="white"
                  transform="translate(0 0.0146484)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </header>
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-[#fdfdfd]  transition-transform duration-300 ease-in-out z-20 sidebar transform ${
            sidebarOpen ? "translate-x-0 block" : "-translate-x-full hidden"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul>
              {sideItems.map((item) => (
                <li
                  key={item.name}
                  className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCurrentScreen(item.name.toLowerCase());
                    setSidebarOpen(false);
                  }}
                >
                  {item.icon}
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-4 w-full absolute bottom-0 flex bg-gray-200 text-sm items-center justify-center">
            Terms & Conditions • Privacy policy
          </div>
        </div>
        {sidebarOpen && (
          <div
            // className="fixed  bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className={` relative z-0`}>{renderScreen()}</main>
      </div>
    </div>
  );
};

export default TokenScreen;
