import './Crypto.css'
import {Link} from "react-router-dom";

const HIGH_FIGURES = {
    trillion: 1000000000000,
    billion: 1000000000,
    million: 1000000,
}

function ShortMarketCapValue(marketCap) {

    if (marketCap >= HIGH_FIGURES.trillion) {
        return `${(marketCap / HIGH_FIGURES.trillion).toFixed(1)}T`;
    } else if (marketCap >= HIGH_FIGURES.billion) {
        return `${(marketCap / HIGH_FIGURES.billion).toFixed(1)}B`;
    } else if (marketCap >= HIGH_FIGURES.million) {
        return `${(marketCap / HIGH_FIGURES.million).toFixed(1)}M`;
    } else {
        return marketCap;
    }
}

function Crypto({
                    id,
                    name,
                    market_cap_rank,
                    image,
                    current_price,
                    price_change_percentage_24h,
                    market_cap,
                }) {

    return (
        <tr key={id}>
            <td>{`#${market_cap_rank}`}</td>
            <td>
                <Link to={`/${id}`}
                      style={{textDecoration: 'none'}}>
                    <div className="crypto-name-img-div">
                        <img src={image}
                             className="thumb-sm rounded-circle mr-2" alt={id}/>
                        {name}
                    </div>
                </Link>
            </td>
            <td>{current_price}</td>
            <td className={price_change_percentage_24h < 0 ? "text-danger" : "text-success"}>
                {`${price_change_percentage_24h.toFixed(2)}%`}
            </td>
            <td>[][][][][][]</td>
            <td>{ShortMarketCapValue(market_cap)}</td>
        </tr>

    );
}

export default Crypto;
