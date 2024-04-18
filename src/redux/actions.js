export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const addFavorite = (character) => ({
  type: ADD_FAVORITE,
  payload: character,
})

export const removeFavorite = (id) => ({
  type: REMOVE_FAVORITE,
  payload: id,
})

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
})
