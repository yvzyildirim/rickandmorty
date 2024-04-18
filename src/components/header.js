import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../redux/actions'

export const Header = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const sidebar = useSelector((state) => state.sidebar)

  const openSidebar = () => {
    dispatch(toggleSidebar(!sidebar.isSidebarOpen))
  }
  return (
    <header className="w-11/12 lg:w-[1200px] absolute top-0 flex items-center justify-between py-4 ">
      <Link to="/">
        <img src={logo} alt="logo" className="h-[60px] " />
      </Link>
      <nav className="flex gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            openSidebar()
          }}
          className="flex items-center overflow-hidden  text-black font-bold rounded-lg"
        >
          <div className="flex items-center justify-center bg-red px-4 h-[30px] bg-gray-700 text-white">
            Favorites
          </div>
          {favorites.length > 0 && (
            <span className="bg-primary text-black flex items-center justify-center bg-red w-[40px] h-[30px]">
              {favorites.length}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}
