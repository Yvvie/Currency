import React, { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [sellAmount, setSellAmount] = useState(0);
  const [Buyamount, setBuyAmount] = useState(0);

  const [buyIcon, setBuyIcon] = useState("EUR");
  const [sellIcon, setSellIcon] = useState("BTC");
  const banks = [
    {
      name: "SEB",
      icon: "https://e7.pngegg.com/pngimages/863/791/png-clipart-seb-logo-seb-bank-green-logo-icons-logos-emojis-bank-logos.png",
    },
    {
      name: "Swedbank",
      icon: "https://www.rokiskiotic.lt/wp-content/uploads/swedbank-logo-1url4jvx3adgww557v20n3yjlnbwkwchgfmiwi9qsgl0.png",
    },
    {
      name: "Danske",
      icon: "https://logos-download.com/wp-content/uploads/2016/10/Danske_Bank_logo_logotype.png",
    },
  ];
  const [bank, setBank] = useState(banks[0]);
  const [error, setError] = useState(null);
  const [isLoaed, setIsLoaded] = useState(false);
  const [buyItems, setBuyItems] = useState([]);
  const [sellItems, setSellItems] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [PayCrypto, setPayCrypto] = useState(1);
  const [SellCrypto, setSellCrypto] = useState(1);

  useEffect(() => {
    fetch("https://api.coingate.com/v2/rates")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBuyItems(result.trader.buy);
          setSellItems(result.trader.sell);
          setExchange(result.merchant);
          //console.log(result.merchant.ADA)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log("here", error);
        }
      );
  }, []);

  function handleFromAmountChange(e) {
    setBuyAmount(e.target.value);
  }

  function handleToAmountChange(e) {
    setSellAmount(e.target.value);
  }

  function handleSetBuyIcon(e) {
    setBuyIcon(e.target.value);
    setPayCrypto(
      Object.entries(exchange).find((element) => element[0] === e.target.value)
    );

    //console.log("buy", Buyamount);
    //console.log(Object.entries(items.buy));
  }

  function handleSetSellIcon(e) {
    setSellIcon(e.target.value);
    setSellCrypto(
      Object.entries(exchange).find((element) => element[0] === e.target.value)
    );

    // console.log("SELL", SellCrypto[1]);
    // setRate(
    //   Object.keys(SellCrypto[1]).map((key) => parseFloat(SellCrypto[1][key]))
    // );
    // console.log("check", rate);

    // Object.keys(SellCrypto[1]).forEach((key) => {
    //   console.log(key, parseFloat(SellCrypto[1][key]));
    // });
  }

  function handleSelectedBank(e) {
    setBank(banks.find((bank) => bank.name === e.target.value));
  }

  function handleSellSelect(e) {
    document.getElementById("buy").innerText = "Buy " + e.target.value;
  }

  function goToURL(e) {
    window.open("https://google.com");
  }

  return (
    <div className="convert">
      <form>
        <div className="section1">
          <input
            id="buyInput"
            placeholder="Pay"
            onChange={handleFromAmountChange}
            value={Buyamount}
          />
          <img
            src={`./black/${buyIcon}.svg`}
            width="24"
            height="24"
            alt={buyIcon}
          />
          <select className="option2" onChange={handleSetBuyIcon}>
            <option key="0" value="EUR">
              EUR
            </option>
            {Object.entries(buyItems).map((crypto, index) => (
              <option key={index} value={crypto[0]}>
                {crypto[0]}
              </option>
            ))}
          </select>
        </div>

        <div className="section2">
          <input
            placeholder="Sell"
            onChange={handleToAmountChange}
            value={sellAmount}
          />

          <img
            src={`./black/${sellIcon}.svg`}
            width="24"
            height="24"
            alt={sellIcon}
          />
          <select onChange={handleSetSellIcon}>
            {Object.entries(sellItems).map((crypto, index) => (
              <option key={index} value={crypto[0]}>
                {crypto[0]}
              </option>
            ))}
          </select>
        </div>

        <span className="paymentMethod">Payment method</span>
        <div className="banks">
          <div>
            <img src={bank.icon} width="33" height="33" />
          </div>
          <select className="bankOption" onChange={handleSelectedBank}>
            {banks.map((bank, index) => (
              <option key={index} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" id="buy" className="buyButton" onClick={goToURL}>
          Buy BTC
        </button>
      </form>
    </div>
  );
}
