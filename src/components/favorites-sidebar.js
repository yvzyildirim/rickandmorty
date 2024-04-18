import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavorite, toggleSidebar } from '../redux/actions'

export const FavoriteSidebar = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const sidebar = useSelector((state) => state.sidebar)

  const openSidebar = () => {
    dispatch(toggleSidebar(!sidebar.isSidebarOpen))
  }

  const toggleFavorite = (id) => {
    dispatch(removeFavorite(id))
  }

  return (
    sidebar.isSidebarOpen && (
      <div className="w-screen h-screen fixed top-0 right-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="w-full lg:w-4/12 h-screen bg-black">
          <div className=" border-b border-gray-800 p-4 flex justify-between items-center h-[60px] ">
            <span className="font-bold text-white text-xl">My Favorites</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                openSidebar()
              }}
              className="text-white"
            >
              <MdClose className="text-3xl" />
            </button>
          </div>
          <div className="flex flex-col h-[calc(100vh-60px)] overflow-scroll ">
            {favorites?.map((i, index) => (
              <div
                key={index}
                className="border-b border-gray-800 flex justify-between items-center p-4 "
              >
                <div className="flex items-center">
                  <img
                    className="rounded-full w-[80px] h-[80px]"
                    src={i.image}
                    alt={i.name}
                  />
                  <div className="flex flex-col">
                    <span className="ml-4 text-white text-xl"> {i.name} </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(i.id)
                  }}
                  className="text-primary"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}
