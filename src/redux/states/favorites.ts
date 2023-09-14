import { LocalStorageTypes, Person } from '@/models'
import { getLocalStorage, setLocalStorage } from '@/utilities'
import { createSlice, current } from '@reduxjs/toolkit'

const initialState: Person[] = []

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getLocalStorage(LocalStorageTypes.FAVORITES)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string)
    : initialState,
  reducers: {
    addFavorite: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVORITES, state)
      return action.payload
    },
    removeFavorite: (state, action) => {
      
      const filterState = current(state).filter((p: Person) => p.id != action.payload.id)
      setLocalStorage(LocalStorageTypes.FAVORITES, filterState)
      return filterState
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer
