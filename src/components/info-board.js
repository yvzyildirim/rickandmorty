import React from 'react'
import noDataImage from '../assets/images/no-data-image.png'
import { Link } from 'react-router-dom'

export const InfoBoard = ({ title, description, action }) => {
  return (
    <div className="w-full py-[60px] flex flex-col items-center justify-center bg-black border border-primary">
      <img src={noDataImage} className="w-[140px]" alt="no-data-found" />
      <span className="text-primary text-xl font-bold mt-3">{title}</span>
      <span className="text-primary text-sm mt-2 w-6/12 text-center">
        {description}
      </span>
      <Link
        to={action}
        className="border border-primary font-semibold text-primary rounded-full p-4 mt-3 hover:bg-primary hover:text-black"
      >
        Go back
      </Link>
    </div>
  )
}
