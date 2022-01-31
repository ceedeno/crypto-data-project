import {createStore} from "redux";
import {NEW_LIST} from "./reduxConstants";

const initialState = {cryptoList: []};

function cryptoListReducer(state = initialState, action){
    switch(action.type){
        case NEW_LIST:
            console.log("here")
            return {cryptoList: action.cryptoList};
        default:
            console.log("here0", state)
            return state;
    }
}

const store = createStore(cryptoListReducer);
export default store;
