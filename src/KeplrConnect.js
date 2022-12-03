import { hasSelectionSupport, wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { isInterfaceDeclaration } from 'typescript';
import Cookies from 'universal-cookie';
import './KeplrConnect.css';

async function waitKeplr() {

    let timeout = new Promise(reject => {
        let to = setTimeout(() => {
            clearTimeout(to);
            reject('rejected');
        }, 10000);
    });

    let gotit = new Promise(async (resolve) => {
        while (!window.keplr){
            await wait(100);
        }
        resolve('resolved');
    })
    
    
    return Promise.race([
        timeout,
        gotit
    ]);

}

class KeplrConnect extends React.Component {

    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize() {

        this.state = {
            buttonText: "Keplr",
            disabled: false
        };

        if (!window.keplr || !window.getOfflineSigner) {
            this.state.buttonText = "Not Supported"
            this.state.disabled = true
            this.setState(this.state);
        }

    }

    async connect() {

        await waitKeplr()

        if (!window.keplr || !window.getOfflineSigner) {
            this.state.buttonText = "Not Supported"
            this.state.disabled = true
            this.setState(this.state);
            return;
        }

        try {
            
            await window.keplr.experimentalSuggestChain({
              chainId: "columbus-5",
              chainName: "Terra Classic",
              rpc: "https://terra-classic-rpc.publicnode.com",
              rest: "https://terra-classic-lcd.publicnode.com",
              stakeCurrency: {
                coinDenom: "LUNA",
                coinMinimalDenom: "uluna",
                coinDecimals: 6,
                coinGeckoId: "terra-luna"
              },
              bip44: {
                coinType: 330
              },
              bech32Config: {
                bech32PrefixAccAddr: "terra",
                bech32PrefixAccPub: "terra" + "pub",
                bech32PrefixValAddr: "terra" + "valoper",
                bech32PrefixValPub: "terra" + "valoperpub",
                bech32PrefixConsAddr: "terra" + "valcons",
                bech32PrefixConsPub: "terra" + "valconspub"
              },
              currencies: [
                {
                  coinDenom: "LUNA",
                  coinMinimalDenom: "uluna",
                  coinDecimals: 6,
                  coinGeckoId: "terra-luna",
                },
              ],
              feeCurrencies: [
                {
                  coinDenom: "LUNA",
                  coinMinimalDenom: "uluna",
                  coinDecimals: 6,
                  coinGeckoId: "terra-luna",
                  gasPriceStep: {
                    low: 12,
                    average: 18,
                    high: 24,
                  }
                },
              ],
              features: ["ibc-transfer", "ibc-go"],
            })
        } catch {
            this.state.buttonText = "Wrong Keplr Version"
            this.state.disabled = true
            return;
        }
    }

    async onClickHandler() {

        await this.connect();
        const res = await window.keplr.enable("columbus-5");
        console.log(res);
        const offlineSigner = window.getOfflineSigner("columbus-5");
        const accounts = await offlineSigner.getAccounts();
        this.state.buttonText = accounts[0].address.slice(0, 8) + ".." + accounts[0].address.slice(40);
        this.setState(this.state);

    }

    render() {
        return(
            <div className="border d-flex align-items-center justify-content-center">
                <button disabled={this.state.disabled} onClick={this.onClickHandler.bind(this)} type="button" className="btn btn-primary">Gimme!</button>
            </div>
        )
    }

}

export default KeplrConnect;