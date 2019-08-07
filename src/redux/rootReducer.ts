import { combineReducers, Reducer } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userReducer';
import cartReducer from './cart/cartReducer';

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer: Reducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);