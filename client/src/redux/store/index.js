import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import audiosReducer from "../reducers/audios";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

let persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

//AsyncStorage.clear();

let rootReducer = combineReducers({
  users: usersReducer,
  audios: audiosReducer,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
