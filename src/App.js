import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Crypto from "./Crypto";

const defaultOptions = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {
        vs_currency: 'usd',
        price_change_percentage: '1h',
        page: '1',
        per_page: '10',
        order: 'market_cap_desc'
    },
    headers: {
        'x-rapidapi-host': 'coingecko.p.rapidapi.com',
        'x-rapidapi-key': 'f43688c168msh0952ae28597cf2fp1a6160jsn97db372249ea'
    }
};

function App() {
    const [cryptos, setCryptos] = useState([])

    useEffect(() => {

        loadAndShowData().then((response) => setCryptos(response));


    }, [])

    const loadAndShowData = async () => {
        try {
            const result = await axios.request(defaultOptions);
            return result.data;
        } catch (e) {
            console.error("there was an error: ", e);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="header-title pb-3 mt-0">Cryptos</h5>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                    <tr className="align-self-center">
                                        <th>#Rank</th>
                                        <th>Name</th>
                                        <th>Price(USD)</th>
                                        <th>Change (24h)</th>
                                        <th>Price Chart</th>
                                        <th>Market Cap</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {cryptos.map((crypto) => {
                                        return (
                                            <Crypto key={crypto.id}
                                                    id={crypto.id}
                                                    name={crypto.name}
                                                    symbol={crypto.symbol}
                                                    market_cap_rank={crypto.market_cap_rank}
                                                    image={crypto.image}
                                                    current_price={crypto.current_price}
                                                    price_change_percentage_24h={crypto.price_change_percentage_24h}
                                                    market_cap={crypto.market_cap}
                                            />
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
