import './CryptoList.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {newList} from "../../redux/actions";
import * as ReactRedux from "react-redux";
import store from "../../redux/store";
import Crypto from "./crypto/Crypto";
import {Provider} from "react-redux";
import {Dropdown, DropdownButton} from "react-bootstrap";

const SORT = {
    MARKET_CAP: "Market Cap",
    WINNERS: "24h Winners",
    LOSERS: "24h Losers"
}

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

function CryptoList({cryptoList, setNewCryptoList}) {
    const [sortedState, setSortedState] = useState(SORT.MARKET_CAP);

    useEffect(() => {
        console.log("here2", cryptoList)
        loadAndShowData().then((response) => setNewCryptoList(response));
        console.log("here3")

    }, [])

    const loadAndShowData = async () => {
        try {
            const result = await axios.request(defaultOptions);
            return result.data;
        } catch (e) {
            console.error("there was an error: ", e);
        }
    }
    const sortFunction = (list) => {
        switch (sortedState) {
            case SORT.MARKET_CAP:
                console.log("by Market Cap");
                return list.sort((item1, item2)=> item1.market_cap_rank - item2.market_cap_rank);
            case SORT.WINNERS:
                console.log("by Winners");
                return list.sort((item1, item2)=> item2.price_change_percentage_24h - item1.price_change_percentage_24h);
            case SORT.LOSERS:
                console.log("by Losers");
                return list.sort((item1, item2)=> item1.price_change_percentage_24h - item2.price_change_percentage_24h);
        }

    }
    const sortedList = sortFunction(cryptoList);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="header-title pb-3 mt-0">Cryptos</h5>
                            <DropdownButton variant={"outline-secondary"} id="dropdown-basic-button" title={`Sorted By ${sortedState}`}>
                                <Dropdown.Item href="#" onClick={() => setSortedState(SORT.MARKET_CAP)}>Market Cap</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => setSortedState(SORT.WINNERS)}>24h Winners</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => setSortedState(SORT.LOSERS)}>24h Losers</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="card-body">
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
                                    {sortedList.map((crypto) => {
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

/**************React - Redux Connection**************/
const mapStateToProps = (state) => {
    return {
        cryptoList: state.cryptoList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNewCryptoList: (cryptoList) => {
            dispatch(newList(cryptoList))
        }
    }
}

const Connected = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CryptoList);

function ConnectedCryptoList() {
    return (
        <Provider store={store}>
            <Connected/>
        </Provider>
    );

}


export default ConnectedCryptoList;
