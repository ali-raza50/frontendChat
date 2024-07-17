import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, Middleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import auth from "../reducers/auth";
import dashboard from "../reducers/dashboard";

// fields you want to whitelist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: auth,
  dashboard: dashboard,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as Middleware, logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
