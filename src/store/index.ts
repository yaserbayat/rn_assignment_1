import { Persistor } from 'redux-persist/es/types';
import {combineReducers, createStore, Store} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import * as reducers from './ducks/index'


const rootReducers = combineReducers(reducers)

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['userInfo', 'users'],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const configStore = () => {
    const store = createStore(persistedReducer);
    const persist = persistStore(store);
    return { store, persist };
};



type ReduxStoreType = { store: Store; persist: Persistor };
const reduxStore: ReduxStoreType = configStore();


export const persist = reduxStore.persist;
export const store = reduxStore.store;
export default reduxStore;
