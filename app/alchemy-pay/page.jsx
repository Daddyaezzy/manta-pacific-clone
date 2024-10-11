"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  X,
  ChevronDown,
  Menu,
  ArrowRight,
  ChevronUp,
} from "lucide-react";

const dummyCurrencies = [
  { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "BWP", name: "Botswanan Pula", flag: "🇧🇼" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "BGN", name: "Bulgarian Lev", flag: "🇧🇬" },
  // Add more currencies as needed to reach 25
];

export default function AlchemyPaySwap() {
  const [activeTab, setActiveTab] = useState("buy");
  const [showDetails, setShowDetials] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState(
    dummyCurrencies[0]
  );
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: "BTC",
    name: "Bitcoin",
    image: "/img/Alchemy Pay Ramp/BTC.png",
  });
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showFiatModal, setShowFiatModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("main");

  useEffect(() => {
    getOtherTokens();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case "main":
        return renderMainScreen();
      case "menu":
        return renderMenu();

      case "selectFiatCurrency":
        return renderFiatModal();
      case "selectCrypto":
        return renderCryptoModal();
      default:
        return renderMainScreen();
    }
  };

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

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(term.toLowerCase()) ||
        token.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTokens(filtered);
  };

  const renderMainScreen = () => (
    <div className="z-20 h-full">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-7">
          <button
            className={`text-lg font-semibold ${
              activeTab === "buy"
                ? "text-blue-600 border-b-2 font-semibold border-blue-600"
                : "text-gray-500 font-light"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy Crypto
          </button>
          <button
            className={`text-lg font-semibold ${
              activeTab === "sell"
                ? "text-blue-600 border-b-2 font-semibold border-blue-600"
                : "text-gray-500 font-light"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Sell Crypto
          </button>
        </div>
        <button onClick={() => setCurrentScreen("menu")}>
          <Menu className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {activeTab === "buy" ? "You pay" : "You sell"}
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <input
              type="number"
              value={payAmount}
              onChange={(e) => {
                setPayAmount(e.target.value);
                setReceiveAmount(payAmount / 40000);
              }}
              className="flex-1 p-3 text-black w-[70%] font-semibold text-2xl outline-none"
              placeholder="0"
            />
            <button
              onClick={() =>
                activeTab === "buy"
                  ? setCurrentScreen("selectFiatCurrency")
                  : setCurrentScreen("selectCrypto")
              }
              className="border-l border-gray-200 w-[120px] px-4 py-2 flex items-center"
            >
              {activeTab === "buy" ? (
                <>
                  <span className="mr-2">{selectedFiatCurrency.flag}</span>
                  {selectedFiatCurrency.code}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <img
                        src={selectedCrypto.image}
                        alt={selectedCrypto.name}
                        className="w-6 h-6 mr-2"
                      />
                      <div>
                        {selectedCrypto.symbol}
                        <p className="text-gray-700 text-[10px] text-left">
                          {selectedCrypto.symbol}
                        </p>
                      </div>
                    </div>
                    {/* <ChevronDown /> */}
                  </div>
                </>
              )}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            You receive (estimate)
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <input
              type="number"
              value={receiveAmount}
              //   onChange={(e) => setReceiveAmount(payAmount / 40000)}
              className="flex-1 p-3 text-black w-[70%] font-semibold text-2xl outline-none"
              placeholder="0"
              readOnly={true}
            />
            <button
              onClick={() =>
                activeTab === "buy"
                  ? setCurrentScreen("selectCrypto")
                  : setCurrentScreen("selectFiatCurrency")
              }
              className="border-l border-gray-200 px-4 py-2 w-[120px] flex items-center"
            >
              {activeTab !== "buy" ? (
                <>
                  <span className="mr-2">{selectedFiatCurrency.flag}</span>
                  {selectedFiatCurrency.code}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <img
                        src={selectedCrypto.image}
                        alt={selectedCrypto.name}
                        className="w-6 h-6 mr-2"
                      />
                      <div>
                        {selectedCrypto.symbol}
                        <p className="text-gray-700 text-[10px] text-left">
                          {selectedCrypto.symbol}
                        </p>
                      </div>
                    </div>
                    {/* <ChevronDown /> */}
                  </div>
                </>
              )}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
        {payAmount && receiveAmount && (
          <div className="text-sm   pt-7   text-black">
            <div
              onClick={() => setShowDetials(!showDetails)}
              className="flex w-full mb-2 items-center justify-between"
            >
              <div>Your order</div>
              <div className="flex items-center  gap-2">
                <div>
                  <span className="font-semibold">
                    {payAmount}{" "}
                    {activeTab === "buy"
                      ? selectedFiatCurrency.code
                      : selectedCrypto.symbol}{" "}
                  </span>{" "}
                  for
                  <span className="font-semibold">
                    {" "}
                    {receiveAmount}{" "}
                    {activeTab === "buy"
                      ? selectedCrypto.symbol
                      : selectedFiatCurrency.code}
                  </span>{" "}
                </div>
                {showDetails ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}{" "}
              </div>
            </div>
            {showDetails && (
              <div>
                <div className="flex mb-1 justify-between items-center text-[11px] font-300">
                  <p>1 {selectedCrypto.symbol}</p>
                  <p>≈ 104057188 NGN</p>
                </div>
                <div className="flex mb-1 justify-between items-center text-[11px] font-300">
                  <p>Processing Fee</p>
                  <p>as low as {payAmount / 65}</p>
                </div>
                {activeTab === "buy" && (
                  <div className="flex mb-1 justify-between items-center text-[11px] font-300">
                    <p>Network Fee</p>
                    <p>0.0001 {selectedCrypto.symbol}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <button
          disabled={!payAmount || !receiveAmount} // Disables button if either payAmount or receiveAmount is falsy
          className={`w-full flex items-center justify-center gap-1 ${
            payAmount && receiveAmount ? "bg-blue-600" : "bg-blue-600/20"
          } text-white py-3 rounded-lg font-medium`}
        >
          Proceed · {activeTab === "buy" ? "Buy" : "Sell"}{" "}
          {activeTab === "buy"
            ? selectedCrypto.symbol
            : selectedFiatCurrency.code}
          <ArrowRight />
        </button>
      </div>
      <div className="absolute w-full bottom-2 left-0">
        <div className=" flex justify-center space-x-4">
          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.967 14.1442C26.201 14.1442 25.781 14.0399 25.136 13.7767L24.897 13.6685L24.626 15.2326C25.092 15.4233 25.932 15.5871 26.801 15.6C28.842 15.6 30.176 14.6596 30.192 13.2126C30.208 12.4172 29.682 11.8134 28.571 11.3158C27.897 10.9931 27.477 10.7766 27.477 10.4489C27.477 10.1589 27.836 9.85004 28.586 9.85004C29.0844 9.83813 29.5798 9.9291 30.041 10.1172L30.221 10.1966L30.492 8.68515L30.445 8.69508C29.8869 8.49614 29.2979 8.3963 28.705 8.40013C26.785 8.40013 25.43 9.34754 25.42 10.7051C25.408 11.7031 26.384 12.2652 27.121 12.5999C27.878 12.9425 28.131 13.158 28.129 13.4659C28.124 13.9336 27.524 14.1442 26.967 14.1442ZM35.428 8.52824H33.928C33.461 8.52824 33.112 8.65238 32.907 9.10721L30.022 15.5027H32.063L32.471 14.456L34.961 14.458C35.022 14.7023 35.201 15.5027 35.201 15.5027H37L35.428 8.52824ZM33.03 13.0249L33.804 11.0755C33.794 11.0954 33.964 10.6723 34.062 10.4101L34.195 11.012L34.644 13.0249H33.03ZM21.444 15.4471H23.388L24.603 8.46965H22.66V8.46766L21.444 15.4471ZM17.923 13.2841L17.721 12.3149V12.3179L17.039 9.11416C16.922 8.67025 16.58 8.53916 16.156 8.52327H13.025L13 8.67025C13.705 8.83411 14.34 9.07146 14.908 9.36243C14.9962 9.41364 15.0608 9.49702 15.088 9.59482L16.768 15.4928H18.822L21.883 8.52824H19.824L17.923 13.2841Z"
              fill="#1C33C3"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.3408 15.9627H17.9795V8.03674H22.3408V15.9627Z"
              fill="#FF5F00"
            />
            <path
              d="M18.2563 12.0001C18.2557 11.2368 18.4268 10.4834 18.7566 9.79683C19.0864 9.11029 19.5664 8.50863 20.1601 8.03741C19.4249 7.45305 18.5419 7.08967 17.612 6.98879C16.6822 6.8879 15.7431 7.05359 14.902 7.46691C14.0608 7.88023 13.3517 8.52452 12.8555 9.32613C12.3593 10.1277 12.0961 11.0544 12.0961 12.0001C12.0962 12.9457 12.3594 13.8721 12.8556 14.6736C13.3517 15.4751 14.0608 16.1193 14.9018 16.5326C15.7428 16.9459 16.6818 17.1116 17.6115 17.0109C18.5412 16.9101 19.4242 16.5469 20.1595 15.9627C19.5659 15.4914 19.0861 14.8897 18.7564 14.2031C18.4267 13.5166 18.2557 12.7633 18.2563 12.0001Z"
              fill="#EB001B"
            />
            <path
              d="M28.2242 12.0001C28.2241 12.9458 27.961 13.8724 27.4648 14.674C26.9686 15.4756 26.2595 16.1199 25.4183 16.5332C24.5772 16.9465 23.6381 17.1122 22.7083 17.0113C21.7784 16.9105 20.8954 16.5471 20.1602 15.9627C21.3194 15.0398 22.0639 13.608 22.0639 12.0001C22.0639 10.3922 21.3194 8.96029 20.1602 8.03741C20.8954 7.45305 21.7784 7.08967 22.7083 6.98879C23.6381 6.8879 24.5772 7.05359 25.4183 7.46691C26.2595 7.88023 26.9686 8.52452 27.4648 9.32613C27.961 10.1277 28.2241 11.0544 28.2242 12.0001Z"
              fill="#F79E1B"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3487 8.46348C12.0698 8.79449 11.6235 9.05558 11.1772 9.01828C11.1214 8.57071 11.3399 8.09516 11.5956 7.80144C11.8745 7.4611 12.3627 7.21866 12.7578 7.20001C12.8043 7.66623 12.623 8.12313 12.3487 8.46348ZM12.7532 9.10686C12.107 9.06957 11.5537 9.47518 11.2469 9.47518C10.9354 9.47518 10.4659 9.12551 9.95449 9.13484C9.28969 9.14416 8.67137 9.5218 8.332 10.1232C7.63465 11.3261 8.15069 13.1071 8.82479 14.0861C9.15487 14.571 9.55003 15.1025 10.0707 15.0838C10.5635 15.0652 10.7588 14.7621 11.3538 14.7621C11.9535 14.7621 12.1256 15.0838 12.6462 15.0745C13.1855 15.0652 13.5249 14.5896 13.855 14.1048C14.2315 13.5546 14.385 13.0185 14.3943 12.9905C14.385 12.9812 13.3529 12.5849 13.3436 11.3914C13.3343 10.3936 14.1572 9.91809 14.1944 9.89012C13.7295 9.20011 13.0042 9.12551 12.7532 9.10686ZM16.4863 7.75482V15.0232H17.6113V12.5383H19.1687C20.5913 12.5383 21.5909 11.5592 21.5909 10.1419C21.5909 8.72456 20.6099 7.75482 19.2059 7.75482H16.4863ZM17.6113 8.70591H18.9084C19.8847 8.70591 20.4426 9.22808 20.4426 10.1465C20.4426 11.065 19.8847 11.5918 18.9038 11.5918H17.6113V8.70591ZM23.6457 15.0792C24.3524 15.0792 25.0079 14.7202 25.3054 14.1514H25.3286V15.0232H26.37V11.4053C26.37 10.3563 25.5332 9.68032 24.2454 9.68032C23.0506 9.68032 22.1673 10.3657 22.1348 11.3074H23.1483C23.2319 10.8599 23.6457 10.5661 24.2129 10.5661C24.9009 10.5661 25.2868 10.8878 25.2868 11.4799V11.8809L23.8828 11.9648C22.5764 12.0441 21.8698 12.5802 21.8698 13.5127C21.8698 14.4544 22.5997 15.0792 23.6457 15.0792ZM23.9479 14.2167C23.3482 14.2167 22.967 13.9276 22.967 13.4847C22.967 13.0278 23.3342 12.762 24.0362 12.7201L25.2868 12.6408V13.0511C25.2868 13.7318 24.7103 14.2167 23.9479 14.2167ZM27.76 17C28.8572 17 29.3732 16.5804 29.8242 15.3076L31.8 9.75025H30.6564L29.3314 14.0442H29.3082L27.9832 9.75025H26.807L28.7131 15.0419L28.6108 15.3636C28.4388 15.9091 28.1599 16.1189 27.6624 16.1189C27.5741 16.1189 27.4021 16.1095 27.3323 16.1002V16.972C27.3974 16.9907 27.6764 17 27.76 17Z"
              fill="black"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2494 11.8411V14.6248H18.3572V7.74042H20.677C21.242 7.74042 21.7774 7.94994 22.1937 8.33906C22.6101 8.69824 22.8183 9.23702 22.8183 9.80573C22.8183 10.3744 22.6101 10.8833 22.1937 11.2724C21.7774 11.6615 21.2718 11.871 20.677 11.871L19.2494 11.8411ZM19.2494 8.57851V10.9731H20.7364C21.0636 10.9731 21.3907 10.8534 21.5989 10.6139C22.0748 10.1649 22.0748 9.41661 21.6287 8.96763L21.5989 8.9377C21.361 8.69824 21.0636 8.54858 20.7364 8.57851H19.2494Z"
              fill="#5F6368"
            />
            <path
              d="M24.8704 9.77576C25.5247 9.77576 26.0303 9.95535 26.4169 10.3145C26.8036 10.6737 26.982 11.1526 26.982 11.7513V14.6247H26.1493V13.9662H26.1195C25.7626 14.505 25.257 14.7744 24.6622 14.7744C24.1566 14.7744 23.7105 14.6247 23.3536 14.3254C23.0265 14.0261 22.8183 13.6071 22.8183 13.1581C22.8183 12.6792 22.9967 12.29 23.3536 11.9907C23.7105 11.6914 24.2161 11.5717 24.8109 11.5717C25.3463 11.5717 25.7626 11.6615 26.0898 11.871V11.6615C26.0898 11.3622 25.9708 11.0628 25.7329 10.8832C25.495 10.6737 25.1976 10.554 24.8704 10.554C24.3648 10.554 23.9782 10.7635 23.7105 11.1826L22.9373 10.7037C23.4131 10.0751 24.0377 9.77576 24.8704 9.77576ZM23.7403 13.188C23.7403 13.4275 23.8592 13.637 24.0377 13.7567C24.2459 13.9064 24.4838 13.9962 24.7217 13.9962C25.0786 13.9962 25.4355 13.8465 25.7031 13.5771C26.0006 13.3077 26.1493 12.9785 26.1493 12.6193C25.8816 12.4098 25.495 12.29 24.9894 12.29C24.6325 12.29 24.3351 12.3798 24.0971 12.5594C23.8592 12.7091 23.7403 12.9186 23.7403 13.188Z"
              fill="#5F6368"
            />
            <path
              d="M31.8 9.92542L28.8557 16.72H27.9635L29.0639 14.3554L27.1307 9.95535H28.0824L29.4803 13.3377H29.51L30.8781 9.95535H31.8V9.92542Z"
              fill="#5F6368"
            />
            <path
              d="M15.7103 11.2424C15.7103 10.973 15.6806 10.7037 15.6508 10.4343H11.9332V11.9608H14.0448C13.9556 12.4397 13.6879 12.8887 13.2716 13.1581V14.1458H14.5504C15.2939 13.4574 15.7103 12.4397 15.7103 11.2424Z"
              fill="#4285F4"
            />
            <path
              d="M11.9332 15.1037C13.0039 15.1037 13.8961 14.7445 14.5504 14.1458L13.2716 13.1581C12.9147 13.3975 12.4686 13.5472 11.9332 13.5472C10.922 13.5472 10.0298 12.8588 9.73242 11.9009H8.42383V12.9186C9.10786 14.2656 10.4462 15.1037 11.9332 15.1037Z"
              fill="#34A853"
            />
            <path
              d="M9.7324 11.901C9.55395 11.4221 9.55395 10.8833 9.7324 10.3744V9.35675H8.42381C7.85873 10.4642 7.85873 11.7812 8.42381 12.9187L9.7324 11.901Z"
              fill="#FBBC04"
            />
            <path
              d="M11.9332 8.75809C12.4983 8.75809 13.0336 8.96761 13.45 9.35673L14.5801 8.21931C13.8664 7.56081 12.9147 7.17169 11.963 7.20162C10.4759 7.20162 9.10785 8.03972 8.45355 9.38666L9.76214 10.4044C10.0298 9.44653 10.922 8.75809 11.9332 8.75809Z"
              fill="#EA4335"
            />
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          Powered by <span className="text-blue-600">Alchemy Pay</span>
        </div>
      </div>
    </div>
  );

  const renderCryptoModal = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Select crypto</h2>
        <button onClick={() => setCurrentScreen("main")}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
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
              <img
                src={token.image}
                alt={token.name}
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="font-medium">{token.symbol}</p>
                <p className="text-sm text-gray-500">{token.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFiatModal = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Select fiat currency</h2>
        <button onClick={() => setCurrentScreen("main")}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => {
            const term = e.target.value.toLowerCase();
            const filtered = dummyCurrencies.filter(
              (currency) =>
                currency.name.toLowerCase().includes(term) ||
                currency.code.toLowerCase().includes(term)
            );
            setFilteredTokens(filtered);
          }}
        />
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {dummyCurrencies.map((currency) => (
          <div
            key={currency.code}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedFiatCurrency(currency);
              setCurrentScreen("main");
            }}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{currency.flag}</span>
              <div>
                <p className="font-medium">{currency.name}</p>
                <p className="text-sm text-gray-500">{currency.code}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMenu = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button onClick={() => setCurrentScreen("main")}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <img
          src="/img/Alchemy Pay Ramp/download.png"
          alt="Alchemy Pay Logo"
          className="w-16 h-16 mb-4"
        />
        <h3 className="text-xl font-semibold">Welcome to Alchemy Pay!</h3>
        <p className="text-sm text-gray-500">
          Login to unlock the full experience
        </p>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-4">
        Login →
      </button>
      <div className="">
        <div className="flex justify-between py-3 items-center">
          <div className="flex items-center ">
            <span className="mr-3">🌐</span>
            <span>Language</span>
          </div>
          <div className="flex items-center ">
            <span className="mr-2">English(US)</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex justify-between py-3 items-center">
          <div className="flex items-center ">
            <span className="mr-3">📄</span>
            <span>Terms of Service</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex py-3 justify-between items-center">
          <div className="flex items-center">
            <span className="mr-3">🔒</span>
            <span>Privacy Policy</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute w-full bottom-2 left-0">
        <div className=" flex justify-center space-x-4">
          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.967 14.1442C26.201 14.1442 25.781 14.0399 25.136 13.7767L24.897 13.6685L24.626 15.2326C25.092 15.4233 25.932 15.5871 26.801 15.6C28.842 15.6 30.176 14.6596 30.192 13.2126C30.208 12.4172 29.682 11.8134 28.571 11.3158C27.897 10.9931 27.477 10.7766 27.477 10.4489C27.477 10.1589 27.836 9.85004 28.586 9.85004C29.0844 9.83813 29.5798 9.9291 30.041 10.1172L30.221 10.1966L30.492 8.68515L30.445 8.69508C29.8869 8.49614 29.2979 8.3963 28.705 8.40013C26.785 8.40013 25.43 9.34754 25.42 10.7051C25.408 11.7031 26.384 12.2652 27.121 12.5999C27.878 12.9425 28.131 13.158 28.129 13.4659C28.124 13.9336 27.524 14.1442 26.967 14.1442ZM35.428 8.52824H33.928C33.461 8.52824 33.112 8.65238 32.907 9.10721L30.022 15.5027H32.063L32.471 14.456L34.961 14.458C35.022 14.7023 35.201 15.5027 35.201 15.5027H37L35.428 8.52824ZM33.03 13.0249L33.804 11.0755C33.794 11.0954 33.964 10.6723 34.062 10.4101L34.195 11.012L34.644 13.0249H33.03ZM21.444 15.4471H23.388L24.603 8.46965H22.66V8.46766L21.444 15.4471ZM17.923 13.2841L17.721 12.3149V12.3179L17.039 9.11416C16.922 8.67025 16.58 8.53916 16.156 8.52327H13.025L13 8.67025C13.705 8.83411 14.34 9.07146 14.908 9.36243C14.9962 9.41364 15.0608 9.49702 15.088 9.59482L16.768 15.4928H18.822L21.883 8.52824H19.824L17.923 13.2841Z"
              fill="#1C33C3"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.3408 15.9627H17.9795V8.03674H22.3408V15.9627Z"
              fill="#FF5F00"
            />
            <path
              d="M18.2563 12.0001C18.2557 11.2368 18.4268 10.4834 18.7566 9.79683C19.0864 9.11029 19.5664 8.50863 20.1601 8.03741C19.4249 7.45305 18.5419 7.08967 17.612 6.98879C16.6822 6.8879 15.7431 7.05359 14.902 7.46691C14.0608 7.88023 13.3517 8.52452 12.8555 9.32613C12.3593 10.1277 12.0961 11.0544 12.0961 12.0001C12.0962 12.9457 12.3594 13.8721 12.8556 14.6736C13.3517 15.4751 14.0608 16.1193 14.9018 16.5326C15.7428 16.9459 16.6818 17.1116 17.6115 17.0109C18.5412 16.9101 19.4242 16.5469 20.1595 15.9627C19.5659 15.4914 19.0861 14.8897 18.7564 14.2031C18.4267 13.5166 18.2557 12.7633 18.2563 12.0001Z"
              fill="#EB001B"
            />
            <path
              d="M28.2242 12.0001C28.2241 12.9458 27.961 13.8724 27.4648 14.674C26.9686 15.4756 26.2595 16.1199 25.4183 16.5332C24.5772 16.9465 23.6381 17.1122 22.7083 17.0113C21.7784 16.9105 20.8954 16.5471 20.1602 15.9627C21.3194 15.0398 22.0639 13.608 22.0639 12.0001C22.0639 10.3922 21.3194 8.96029 20.1602 8.03741C20.8954 7.45305 21.7784 7.08967 22.7083 6.98879C23.6381 6.8879 24.5772 7.05359 25.4183 7.46691C26.2595 7.88023 26.9686 8.52452 27.4648 9.32613C27.961 10.1277 28.2241 11.0544 28.2242 12.0001Z"
              fill="#F79E1B"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3487 8.46348C12.0698 8.79449 11.6235 9.05558 11.1772 9.01828C11.1214 8.57071 11.3399 8.09516 11.5956 7.80144C11.8745 7.4611 12.3627 7.21866 12.7578 7.20001C12.8043 7.66623 12.623 8.12313 12.3487 8.46348ZM12.7532 9.10686C12.107 9.06957 11.5537 9.47518 11.2469 9.47518C10.9354 9.47518 10.4659 9.12551 9.95449 9.13484C9.28969 9.14416 8.67137 9.5218 8.332 10.1232C7.63465 11.3261 8.15069 13.1071 8.82479 14.0861C9.15487 14.571 9.55003 15.1025 10.0707 15.0838C10.5635 15.0652 10.7588 14.7621 11.3538 14.7621C11.9535 14.7621 12.1256 15.0838 12.6462 15.0745C13.1855 15.0652 13.5249 14.5896 13.855 14.1048C14.2315 13.5546 14.385 13.0185 14.3943 12.9905C14.385 12.9812 13.3529 12.5849 13.3436 11.3914C13.3343 10.3936 14.1572 9.91809 14.1944 9.89012C13.7295 9.20011 13.0042 9.12551 12.7532 9.10686ZM16.4863 7.75482V15.0232H17.6113V12.5383H19.1687C20.5913 12.5383 21.5909 11.5592 21.5909 10.1419C21.5909 8.72456 20.6099 7.75482 19.2059 7.75482H16.4863ZM17.6113 8.70591H18.9084C19.8847 8.70591 20.4426 9.22808 20.4426 10.1465C20.4426 11.065 19.8847 11.5918 18.9038 11.5918H17.6113V8.70591ZM23.6457 15.0792C24.3524 15.0792 25.0079 14.7202 25.3054 14.1514H25.3286V15.0232H26.37V11.4053C26.37 10.3563 25.5332 9.68032 24.2454 9.68032C23.0506 9.68032 22.1673 10.3657 22.1348 11.3074H23.1483C23.2319 10.8599 23.6457 10.5661 24.2129 10.5661C24.9009 10.5661 25.2868 10.8878 25.2868 11.4799V11.8809L23.8828 11.9648C22.5764 12.0441 21.8698 12.5802 21.8698 13.5127C21.8698 14.4544 22.5997 15.0792 23.6457 15.0792ZM23.9479 14.2167C23.3482 14.2167 22.967 13.9276 22.967 13.4847C22.967 13.0278 23.3342 12.762 24.0362 12.7201L25.2868 12.6408V13.0511C25.2868 13.7318 24.7103 14.2167 23.9479 14.2167ZM27.76 17C28.8572 17 29.3732 16.5804 29.8242 15.3076L31.8 9.75025H30.6564L29.3314 14.0442H29.3082L27.9832 9.75025H26.807L28.7131 15.0419L28.6108 15.3636C28.4388 15.9091 28.1599 16.1189 27.6624 16.1189C27.5741 16.1189 27.4021 16.1095 27.3323 16.1002V16.972C27.3974 16.9907 27.6764 17 27.76 17Z"
              fill="black"
            />
          </svg>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2494 11.8411V14.6248H18.3572V7.74042H20.677C21.242 7.74042 21.7774 7.94994 22.1937 8.33906C22.6101 8.69824 22.8183 9.23702 22.8183 9.80573C22.8183 10.3744 22.6101 10.8833 22.1937 11.2724C21.7774 11.6615 21.2718 11.871 20.677 11.871L19.2494 11.8411ZM19.2494 8.57851V10.9731H20.7364C21.0636 10.9731 21.3907 10.8534 21.5989 10.6139C22.0748 10.1649 22.0748 9.41661 21.6287 8.96763L21.5989 8.9377C21.361 8.69824 21.0636 8.54858 20.7364 8.57851H19.2494Z"
              fill="#5F6368"
            />
            <path
              d="M24.8704 9.77576C25.5247 9.77576 26.0303 9.95535 26.4169 10.3145C26.8036 10.6737 26.982 11.1526 26.982 11.7513V14.6247H26.1493V13.9662H26.1195C25.7626 14.505 25.257 14.7744 24.6622 14.7744C24.1566 14.7744 23.7105 14.6247 23.3536 14.3254C23.0265 14.0261 22.8183 13.6071 22.8183 13.1581C22.8183 12.6792 22.9967 12.29 23.3536 11.9907C23.7105 11.6914 24.2161 11.5717 24.8109 11.5717C25.3463 11.5717 25.7626 11.6615 26.0898 11.871V11.6615C26.0898 11.3622 25.9708 11.0628 25.7329 10.8832C25.495 10.6737 25.1976 10.554 24.8704 10.554C24.3648 10.554 23.9782 10.7635 23.7105 11.1826L22.9373 10.7037C23.4131 10.0751 24.0377 9.77576 24.8704 9.77576ZM23.7403 13.188C23.7403 13.4275 23.8592 13.637 24.0377 13.7567C24.2459 13.9064 24.4838 13.9962 24.7217 13.9962C25.0786 13.9962 25.4355 13.8465 25.7031 13.5771C26.0006 13.3077 26.1493 12.9785 26.1493 12.6193C25.8816 12.4098 25.495 12.29 24.9894 12.29C24.6325 12.29 24.3351 12.3798 24.0971 12.5594C23.8592 12.7091 23.7403 12.9186 23.7403 13.188Z"
              fill="#5F6368"
            />
            <path
              d="M31.8 9.92542L28.8557 16.72H27.9635L29.0639 14.3554L27.1307 9.95535H28.0824L29.4803 13.3377H29.51L30.8781 9.95535H31.8V9.92542Z"
              fill="#5F6368"
            />
            <path
              d="M15.7103 11.2424C15.7103 10.973 15.6806 10.7037 15.6508 10.4343H11.9332V11.9608H14.0448C13.9556 12.4397 13.6879 12.8887 13.2716 13.1581V14.1458H14.5504C15.2939 13.4574 15.7103 12.4397 15.7103 11.2424Z"
              fill="#4285F4"
            />
            <path
              d="M11.9332 15.1037C13.0039 15.1037 13.8961 14.7445 14.5504 14.1458L13.2716 13.1581C12.9147 13.3975 12.4686 13.5472 11.9332 13.5472C10.922 13.5472 10.0298 12.8588 9.73242 11.9009H8.42383V12.9186C9.10786 14.2656 10.4462 15.1037 11.9332 15.1037Z"
              fill="#34A853"
            />
            <path
              d="M9.7324 11.901C9.55395 11.4221 9.55395 10.8833 9.7324 10.3744V9.35675H8.42381C7.85873 10.4642 7.85873 11.7812 8.42381 12.9187L9.7324 11.901Z"
              fill="#FBBC04"
            />
            <path
              d="M11.9332 8.75809C12.4983 8.75809 13.0336 8.96761 13.45 9.35673L14.5801 8.21931C13.8664 7.56081 12.9147 7.17169 11.963 7.20162C10.4759 7.20162 9.10785 8.03972 8.45355 9.38666L9.76214 10.4044C10.0298 9.44653 10.922 8.75809 11.9332 8.75809Z"
              fill="#EA4335"
            />
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          Powered by <span className="text-blue-600">Alchemy Pay</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-auto relative flex flex-col">
      <header className="bg-white absolute top-2 left-12 p-4">
        <svg
          width="132"
          height="130"
          viewBox="0 0 62 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9384 5.92071C29.4439 5.92071 28.9661 6.08172 28.615 6.22653V4.70504C28.615 4.65242 28.5724 4.60976 28.5198 4.60976H28.0325C27.9798 4.60976 27.9372 4.65242 27.9372 4.70504V10.2618C27.9372 10.3144 27.9798 10.3571 28.0325 10.3571H28.5188C28.5714 10.3571 28.6141 10.3144 28.6141 10.2618V6.80388C28.8689 6.68574 29.3987 6.47043 29.8498 6.47043C30.3214 6.47043 30.541 6.68241 30.541 7.13733V10.2627C30.541 10.3154 30.5836 10.358 30.6363 10.358H31.1221C31.1748 10.358 31.2174 10.3154 31.2174 10.2627V7.05159C31.2212 6.32466 30.7653 5.92071 29.9384 5.92071ZM25.1838 5.92071C24.0434 5.92071 23.4151 6.35801 23.4151 7.15162V9.20474C23.4151 9.99835 24.0434 10.4352 25.1838 10.4352C26.2647 10.4352 26.8849 9.98692 26.8849 9.20474V8.70313C26.8849 8.65051 26.8422 8.60786 26.7896 8.60786H26.3133C26.2607 8.60786 26.218 8.65051 26.218 8.70313V9.11947C26.218 9.79447 25.5716 9.89498 25.1862 9.89498C24.4531 9.89498 24.0968 9.64156 24.0968 9.11947V7.23689C24.0968 6.69289 24.4226 6.4609 25.1862 6.4609C25.8803 6.4609 26.218 6.7148 26.218 7.23689V7.7304C26.218 7.78302 26.2607 7.82567 26.3133 7.82567H26.7896C26.8422 7.82567 26.8849 7.78302 26.8849 7.7304V7.15162C26.8849 6.36944 26.2647 5.92071 25.1838 5.92071ZM35.791 9.13519V8.87271C35.791 8.8201 35.7483 8.77744 35.6957 8.77744H35.2098C35.1572 8.77744 35.1145 8.8201 35.1145 8.87271V9.0504C35.1145 9.61584 34.7449 9.90308 34.0151 9.90308C33.2853 9.90308 32.9933 9.65585 32.9933 9.0504V8.45209H35.6971C35.7497 8.45209 35.7924 8.40943 35.7924 8.35682V7.22117C35.7924 6.40707 35.1255 5.92071 34.0137 5.92071C33.4844 5.92071 33.0662 6.03361 32.7708 6.25416C32.4755 6.47472 32.313 6.81341 32.313 7.21974V9.13519C32.313 9.54152 32.4712 9.87545 32.7708 10.1008C33.0705 10.3261 33.4854 10.4342 34.0137 10.4342C35.126 10.4352 35.791 9.94929 35.791 9.13519ZM32.9904 7.30596C32.9904 6.70051 33.2867 6.45328 34.0122 6.45328C34.7377 6.45328 35.1117 6.7391 35.1117 7.30596V7.93524H32.9904V7.30596ZM18.509 4.67121C18.4946 4.63322 18.4577 4.60855 18.4171 4.60972H17.8531C17.8127 4.6093 17.7765 4.6343 17.7626 4.67217L15.6623 10.2275C15.6503 10.2572 15.654 10.291 15.6722 10.3174C15.6905 10.3438 15.7207 10.3592 15.7528 10.3585H16.2768C16.3174 10.3588 16.3537 10.3334 16.3673 10.2951L16.8594 8.9537H19.3989L19.891 10.2951C19.9046 10.3334 19.9409 10.3588 19.9815 10.3585H20.5169C20.549 10.3592 20.5793 10.3438 20.5975 10.3174C20.6157 10.291 20.6194 10.2572 20.6074 10.2275L18.509 4.67121ZM17.0695 8.39016L18.1256 5.50913L19.1921 8.39016H17.0695ZM22.2166 4.60976H21.7302C21.6776 4.60976 21.6349 4.65242 21.6349 4.70504V10.2618C21.6349 10.3144 21.6776 10.3571 21.7302 10.3571H22.2166C22.2692 10.3571 22.3118 10.3144 22.3118 10.2618V4.70504C22.3118 4.65242 22.2692 4.60976 22.2166 4.60976ZM41.1577 5.92071C40.6937 5.92071 40.2049 6.05218 39.7048 6.3118C39.477 6.05552 39.1074 5.92071 38.6296 5.92071C38.1813 5.92071 37.7474 6.07505 37.4325 6.22415L37.3915 6.04266C37.3819 5.99796 37.342 5.96637 37.2963 5.96739H36.9366C36.884 5.96739 36.8413 6.01005 36.8413 6.06266V10.2608C36.8413 10.3134 36.884 10.3561 36.9366 10.3561H37.4225C37.4751 10.3561 37.5178 10.3134 37.5178 10.2608V6.75005C37.8405 6.55508 38.2106 6.45243 38.5877 6.45328C39.064 6.45328 39.2984 6.69432 39.2984 7.19021V10.2618C39.2984 10.3144 39.3411 10.3571 39.3937 10.3571H39.8796C39.9322 10.3571 39.9748 10.3144 39.9748 10.2618V7.12114C39.9744 7.01255 39.9625 6.9043 39.9396 6.79816C40.3407 6.56951 40.7189 6.45328 41.0643 6.45328C41.5406 6.45328 41.775 6.69432 41.775 7.19021V10.2618C41.775 10.3144 41.8177 10.3571 41.8703 10.3571H42.3567C42.4093 10.3571 42.4519 10.3144 42.4519 10.2618V7.12114C42.4605 6.36944 41.9741 5.92071 41.1577 5.92071ZM46.8845 5.99785H46.35C46.3087 5.99736 46.2717 6.02352 46.2585 6.06266L45.0919 9.41481L43.8343 6.06076C43.8206 6.0227 43.7843 5.99749 43.7438 5.99785H43.2198C43.1876 5.99716 43.1572 6.0128 43.139 6.03943C43.1208 6.06606 43.1174 6.10008 43.1298 6.12983L44.7418 10.2656L44.6465 10.5871C44.435 11.1997 44.0844 11.2845 43.7367 11.2845C43.6117 11.2886 43.4866 11.2768 43.3646 11.2493C43.3355 11.2412 43.3042 11.247 43.2798 11.265C43.2556 11.2832 43.2414 11.3118 43.2417 11.3422V11.6818C43.2403 11.7264 43.27 11.766 43.3132 11.7771C43.4585 11.8095 43.6074 11.8234 43.7562 11.8185C44.2931 11.8185 44.8995 11.7361 45.2663 10.7524L46.9774 6.13174C46.989 6.10211 46.985 6.06864 46.9669 6.04252C46.9487 6.0164 46.9187 6.00108 46.8869 6.00169L46.8845 5.99785ZM56.991 6.11649C56.7209 5.90546 56.3121 5.80305 55.7419 5.80305C55.1922 5.80305 54.7892 5.89832 54.512 6.09649C54.2119 6.30942 54.0594 6.63858 54.0594 7.07445V7.2831C54.0597 7.40138 54.1555 7.4972 54.2738 7.49746H54.7502C54.8685 7.49746 54.9645 7.40149 54.9645 7.2831V7.09017C54.9645 6.79626 55.0188 6.57142 55.7034 6.57142C56.4212 6.57142 56.4808 6.81674 56.4808 7.09017V7.77089H55.539C54.0918 7.77089 53.7884 8.46638 53.7884 9.0504V9.28191C53.7884 9.68491 53.9208 9.99645 54.1823 10.2094C54.4319 10.4118 54.7968 10.5147 55.2665 10.5147C55.7199 10.5135 56.1695 10.4329 56.5951 10.2765L56.6161 10.3509C56.6424 10.443 56.7265 10.5065 56.8223 10.5066H57.182C57.3004 10.5066 57.3963 10.4107 57.3963 10.2923V7.07445C57.3963 6.64239 57.2639 6.32895 56.9919 6.11649H56.991ZM56.4808 9.52009C56.1245 9.67325 55.741 9.75296 55.3532 9.75446C54.7525 9.75446 54.702 9.51056 54.702 9.28238V9.03515C54.702 8.78078 54.7673 8.53212 55.5476 8.53212H56.4808V9.52009ZM61.8889 5.97215C61.8488 5.91447 61.7829 5.88012 61.7127 5.88022H61.1782C61.0872 5.87992 61.0059 5.93727 60.9757 6.02313L59.9163 9.06707L58.773 6.01836C58.7417 5.93475 58.6618 5.87933 58.5725 5.87926H58.0485C57.9778 5.87933 57.9116 5.91428 57.8717 5.97266C57.8318 6.03105 57.8233 6.10536 57.8489 6.17127L59.4457 10.268L59.3613 10.5481C59.1651 11.1159 58.8469 11.1635 58.5639 11.1635C58.45 11.1675 58.3361 11.1574 58.2247 11.1335C58.1594 11.1137 58.0885 11.1265 58.0342 11.1678C57.9803 11.2084 57.9486 11.2719 57.9484 11.3393V11.679C57.9485 11.7762 58.014 11.8613 58.108 11.8862C58.263 11.9221 58.422 11.9382 58.5811 11.9338C59.2003 11.9338 59.8248 11.7952 60.2007 10.7905L61.9118 6.16984C61.9373 6.10422 61.9288 6.03022 61.8889 5.97215ZM52.9023 4.93607C52.5141 4.63692 51.9387 4.49115 51.1441 4.49115H49.7827C49.6643 4.49115 49.5683 4.58712 49.5683 4.70551V10.2618C49.5683 10.3802 49.6643 10.4761 49.7827 10.4761H50.3176C50.3745 10.4763 50.4291 10.4537 50.4693 10.4135C50.5096 10.3733 50.5321 10.3187 50.532 10.2618V8.21343H51.1441C51.9363 8.21343 52.5103 8.07672 52.8976 7.79423C53.2787 7.5189 53.4692 7.10732 53.4692 6.57142V6.21653C53.4683 5.65776 53.2777 5.2257 52.9023 4.93607ZM52.5051 6.5557C52.5051 7.08541 52.2788 7.41315 51.1536 7.41315H50.5344V5.29048H51.1951C52.3483 5.29048 52.5074 5.74731 52.5074 6.2432L52.5051 6.5557Z"
            fill="#0059DA"
          />
          <path
            d="M3.45315 12.7512V6.73193L0 12.7512H3.45315ZM10.3213 6.73193V12.7512H13.775L10.3213 6.73193ZM4.90653 4.2177V8.93748H4.91177C5.25999 8.59259 6.1727 8.15434 7.13066 8.06288C7.80757 8.01239 8.42493 8.11528 8.87462 8.29106V4.2177L6.88104 0.751221L4.90653 4.2177ZM5.20187 10.7519C5.01132 11.0811 4.91319 11.5803 4.91319 11.9795C4.91074 12.2429 4.95676 12.5045 5.04896 12.7512H8.87462V9.84971C8.43651 9.5591 7.92122 9.40676 7.39552 9.41241C6.41945 9.41384 5.63155 10.0107 5.20187 10.7519Z"
            fill="#0059DA"
          />
        </svg>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white h-[550px] rounded-2xl relative shadow-2xl text-black pb-4 p-6 w-[400px] mx-auto">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}
