import App from "./App";
import {Route, Routes} from "react-router-dom";
import Chart from "./Chart";


function Router(){

    return (
        <Routes>
            <Route path="/:cryptoId" element={<Chart />} />
            <Route path="/" element={<App />} />

        </Routes>

    );
}

export default Router;

