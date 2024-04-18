import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favorites-reducer'
import sidebarReducer from './sidebar-reducer'

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    sidebar: sidebarReducer,
  },
})

export default store
