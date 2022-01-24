import {useEffect, useState} from "react";
import CanvasJSReact from "./canvasjs/canvasjs.stock.react";
import {useParams} from "react-router-dom";
import axios from "axios";
import CryptoInfo from "./cryptoInfo";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const containerProps = {
    width: "100%",
    height: "400px",
    margin: "auto"
};

function Chart() {
    const [coinPricesHistory, setCoinPricesHistory] = useState({dataPoints: [], isLoaded: false})
    const [coinData, setCoinData] = useState({data: {}, isLoaded: false})
    const {cryptoId} = useParams();

    useEffect(() => {
        loadAndShowData().then((response) => {
            console.log(response[1])
            setCoinData({data: response[1], isLoaded: true});
            setCoinPricesHistory({
                    dataPoints: response[0].prices.map((item) => ({
                        x: new Date(item[0]),
                        y: Number(item[1])
                    })),
                    isLoaded: true
                }
            )
        });
    }, [])

    const optionsForCoinPricesApi = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${cryptoId}/market_chart`,
        params: {vs_currency: 'usd', days: '1000'},
        headers: {
            'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            'x-rapidapi-key': 'f43688c168msh0952ae28597cf2fp1a6160jsn97db372249ea'
        }
    };

    const optionsForCoinDataApi = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${cryptoId}`,
        params: {vs_currency: 'usd', days: '1000'},
        headers: {
            'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            'x-rapidapi-key': 'f43688c168msh0952ae28597cf2fp1a6160jsn97db372249ea'
        }
    };

    const loadAndShowData = async () => {
        try {
            const coinPricesResult = await axios.request(optionsForCoinPricesApi);
            const coinDataResults = await axios.request(optionsForCoinDataApi);
            return [coinPricesResult.data, coinDataResults.data];
        } catch (e) {
            console.error("there was an error: ", e);
        }
    }

    const optionsCanvas = {
        title: {
            text: ""
        },
        theme: "light2",
        animationEnabled: true,
        animationDuration: 1500,
        subtitles: [{
            text: ""
        }],
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "MMM DD YYYY"
                }
            },
            axisY: {
                title: "",
                prefix: "$",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "$#,###.##"
                }
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Price (USD)",
                type: "splineArea",
                color: "#3498DB",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: coinPricesHistory.dataPoints
            }]
        }],
        navigator: {
            enabled: false
        }
    };


    return (
        <div className="container">

            {coinPricesHistory.isLoaded && coinData.isLoaded ?
                <div className="row">
                    <div className="col-xl-12">
                        <div className={"card"}>
                            <div>
                                <div className="image-name-container-div">
                                    <img src={coinData.data.image.small}
                                         className="rounded-circle mr-2" alt={coinData.data.name}/>
                                    <h1>{coinData.data.name}</h1>
                                </div>
                            </div>
                            <CanvasJSStockChart
                                containerProps={{...containerProps}}
                                options={optionsCanvas}/>
                        </div>
                        <CryptoInfo
                                        hashing_algorithm = {coinData.data.hashing_algorithm}
                                        market_cap = {coinData.data.market_data.market_cap}
                                        total_volume = {coinData.data.market_data.total_volume}
                                        ath = {coinData.data.market_data.ath}
                                        atl = {coinData.data.market_data.atl}
                                        price_change_24h = {coinData.data.market_data.price_change_24h}
                                        max_supply = {coinData.data.market_data.max_supply}
                                        circulating_supply = {coinData.data.market_data.circulating_supply}
                                        description = {coinData.data.description}
                                    />
                    </div>
                </div>
                :
                <div>...Loading</div>
            }

        </div>
    );
}

export default Chart
