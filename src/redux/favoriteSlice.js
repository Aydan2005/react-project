import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteMovies: [],
  disabledButtons: {},
  isSaved: false,
  savedLists: [],
};

const favoriteSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const movie = action.payload;
      state.favoriteMovies.push(movie);
      state.disabledButtons[movie.imdbID] = true;
    },
    removeFromFavorites(state, action) {
      const imdbID = action.payload;
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== imdbID
      );
      delete state.disabledButtons[imdbID];
    },
    saveList(state, action) {
      state.isSaved = true;
      const { listName, movies, id } = action.payload;
      state.savedLists.push({ listName, movies, id });
    },
  },
});

export const { addToFavorites, removeFromFavorites, saveList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
