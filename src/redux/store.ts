import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const middlewares: Middleware[] = [logger];

const store: Store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor: Persistor = persistStore(store);

export default { store, persistor };