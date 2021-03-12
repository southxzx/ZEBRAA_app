import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


// Reducers
import cartItem from './Reducers/cartItem';

const reducers = combineReducers({
    cartItem: cartItem
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;