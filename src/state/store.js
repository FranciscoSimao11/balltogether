import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers/index"
import thunk from "redux-thunk"

const store = createStore(
    reducers,
    JSON.parse(localStorage.getItem("activeUser")) == null ? {} : JSON.parse(localStorage.getItem("activeUser")),
    applyMiddleware(thunk)
)

export default store