import './cryptoInfo.css'

function CryptoInfo({
                        hashing_algorithm,
                        market_cap,
                        total_volume,
                        ath,
                        atl,
                        price_change_24h,
                        max_supply,
                        circulating_supply,
                        description
                    }){

    return (
        <div className="card mb-4">
            <div className="card-body">

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">Price Change Last 24h:</div>
                    <div className="col-md-9">
                        {price_change_24h}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">All Time High:</div>
                    <div className="col-md-9">
                        {ath.usd}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">All Time Low:</div>
                    <div className="col-md-9">
                        {atl.usd}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">Market Cap:</div>
                    <div className="col-md-9">
                        {market_cap.usd}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">Total Volume:</div>
                    <div className="col-md-9">
                        {total_volume.usd}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">Max Supply:</div>
                    <div className="col-md-9">
                        {max_supply}USD
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-3 text-muted">Circulating Supply:</div>
                    <div className="col-md-9">
                        {circulating_supply}USD
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CryptoInfo;
