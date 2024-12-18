import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    favoriteMovies: favoriteReducer,
  },
});

export default store;
