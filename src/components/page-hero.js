import React from 'react'

export const PageHero = ({ title, description, background }) => {
  return (
    <div
      className={
        ' h-[500px] flex justify-center items-center w-full  bg-no-repeat bg-cover ' +
        background
      }
    >
      <div className="py-10 w-11/12 lg:w-[1200px]">
        <h1 className="text-4xl font-semibold text-white"> {title} </h1>
        <p className="text-white w-full lg:w-6/12 mt-2">{description}</p>
      </div>
    </div>
  )
}
