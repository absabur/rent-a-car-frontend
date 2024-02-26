import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Reducer/authReducer";
import { userReducer } from "./Reducer/userReducer";

const Reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
})

const store = createStore(Reducer, applyMiddleware(thunk))
export default store;