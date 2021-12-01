import { combineReducers } from "redux"
import sessionReducer from "./sessionReducer"

const reducers = combineReducers({
    session: sessionReducer
});

export default reducers