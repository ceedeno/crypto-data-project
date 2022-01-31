import {Route, Routes} from "react-router-dom";
import Chart from "../components/chart/Chart";
import ConnectedCryptoList from "../components/cryptoList/CryptoList";


function Router(){

    return (
        <Routes>
            <Route path="/:cryptoId" element={<Chart />} />
            <Route path="/" element={<ConnectedCryptoList />} />

        </Routes>

    );
}

export default Router;

