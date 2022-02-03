import {Area, AreaChart} from 'recharts';
import {useEffect, useState} from "react";
import axios from "axios";

// Sets a Max and a Min Range to extrapolate points and make changes in
// the chat more noticeable
function reduceDifference(arr){
    const max = Math.max(...arr);
    const min = Math.min(...arr);

    return arr.map(value => Math.abs(max - value - (max - min)));
}

function shortPointForChart(arr) {
    const newArr = [];
    const increment = 5;
    for (let i = 0; i < arr.length; i += increment) {
        newArr.push(arr[i][1]);
    }
    return reduceDifference(newArr);
}

function MiniChart({color, id}) {
    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${id}/market_chart`,
        params: {vs_currency: 'usd', days: '1'},
        headers: {
            'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            'x-rapidapi-key': 'f43688c168msh0952ae28597cf2fp1a6160jsn97db372249ea'
        }
    };

    useEffect(() => {
        loadAndShowData().then((response) =>
            setData(shortPointForChart(response.prices).map(price =>
                ({uv: price})
            )));
    }, [])

    const loadAndShowData = async () => {
        try {
            const result = await axios.request(options);
            return result.data;
        } catch (e) {
            console.error("there was an error: ", e);
        }
    }

    return (
        <AreaChart width={150} height={40} data={data}>
            <Area type="monotone" dataKey="uv" stroke={color} fill={color}/>
        </AreaChart>
    );
}

export default MiniChart;
