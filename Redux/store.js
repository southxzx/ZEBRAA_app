import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducers
import cartItem from './Reducers/cartItem';
import productReducer from './Reducers/productReducer';

const reducers = combineReducers({
    cartItem: cartItem,
    productReducer: productReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;