import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorite/FavoriteSlice'
import searchReducer from './features/search/SearchSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer
  }
})