import {NEW_LIST} from "./reduxConstants";

export const newList = (cryptoList) => {
    return{
        type: NEW_LIST,
        cryptoList: cryptoList
    }

}
