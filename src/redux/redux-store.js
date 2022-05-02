import {applyMiddleware, combineReducers, createStore} from "redux";
import mainReducer from "./main-reducer";
import favoriteReducer from "./favorite-reducer";
import dogReducer from "./dog-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    mainReducer: mainReducer,
    favoriteReducer: favoriteReducer,
    dogReducer: dogReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;