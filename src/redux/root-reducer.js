// root-reducer represent all of the state of the app
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// use localStorage as the default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// configurations for Redux to use
const persistConfig = {
  // at that point inside of reducer obj to start storing
  key: 'root',
  storage,
  // containing the names of all the reducers we want to persist
  whiteList: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// modified version of the root reducer with persistence capabilities
export default persistReducer(persistConfig, rootReducer);
