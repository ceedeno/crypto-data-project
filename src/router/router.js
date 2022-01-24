import CryptoList from "../components/cryptoList/CryptoList";
import {Route, Routes} from "react-router-dom";
import Chart from "../components/chart/Chart";


function Router(){

    return (
        <Routes>
            <Route path="/:cryptoId" element={<Chart />} />
            <Route path="/" element={<CryptoList />} />

        </Routes>

    );
}

export default Router;

