import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const photo = action.payload
      if (!state.favorites.includes(photo)) {
        state.favorites.push(photo)
      }
    },

    removeFavorite: (state, action) => {
      const photo = action.payload;
      state.favorites = state.favorites.filter(id => id !== photo)
    },
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer