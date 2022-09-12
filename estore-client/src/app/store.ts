import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// infer the rootstate and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// inferred type:{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
