import React from "react";
import "../container/container.css";
import CurrencyConverter from "../currencyConverter/currencyConverter";


export default function Container() {
  
  function goToURL(e) {
    window.open("https://google.com");
  }


  return (
    <div>
      <main className="container">
        <div className="mainContainer">
          <div>
            <div className="textItems">
              <span>
                <span className="textColor">Buy Bitcoin</span>, Ethereum, Litecoin and other crypto <span className="textColor">online</span>
              </span>
            </div>

            <div className="paragrathText">
              <span>
                Why bother going through complicated exchanges? Buy
                cryptocurrency with toppayment methods like SEPA bank transfer,
                Credit and Debit Card, Apple Pay, Mobile balance or Klarna. You
                can buy Bitcoin, Ethereum or any other popular crypto irectly to
                your personal wallet without making any initial deposits. It's
                as easy as it gets!
              </span>
              <div className="link" onClick={goToURL}>
                <a>Start now </a>
              </div>
            </div>

            <div>
              <div className="convertBack"></div>
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
