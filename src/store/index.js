import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import sidebar from "./sidebarSlice";
import { usersApi } from "./users";

const store = configureStore({
  reducer: { sidebar, [usersApi.reducerPath]: usersApi.reducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;
