import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// npm i --save-dev @types/redux-persist
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/AuthSlice";
import cartReducer from "./slices/CartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
