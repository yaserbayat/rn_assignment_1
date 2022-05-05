import { Persistor } from 'redux-persist/es/types';
import { combineReducers, createStore, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import * as reducers from './ducks/index'


// Combine different reducer functions into a single reducer
const rootReducers = combineReducers(reducers)

// pass rootReducer to persistor function to ensures that
// the redux state is stored to persisted storage whenever it changes
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [ 'userInfo', 'users', 'questionTypes', 'assessmentsKits', "assessments" ],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create store and its persistor
const configStore = () => {
  const store = createStore(persistedReducer);
  const persist = persistStore(store);
  return { store, persist };
};


type ReduxStoreType = { store: Store; persist: Persistor };
const reduxStore: ReduxStoreType = configStore();
export type RootStore = ReturnType<typeof rootReducers>;

export const persist = reduxStore.persist;
export const store = reduxStore.store;
export default reduxStore;
