import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export const Pagination = ({
  next,
  prev,
  currentPage,
  pages,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const pageButtons = []
    for (let i = 1; i <= pages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`inline-flex items-center px-4 rounded-md py-2 text-sm font-medium ${
            i === currentPage
              ? ' text-black bg-primary text-black'
              : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-white '
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      )
    }
    return pageButtons
  }
  return (
    <nav className="mt-10 flex items-center justify-between  px-4 sm:px-0">
      <div className=" flex w-0 flex-1">
        <button
          onClick={prev}
          className="inline-flex items-center  pr-1  text-sm font-medium text-gray-400 hover:text-white"
        >
          <FaAngleLeft className="mr-2" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPageButtons()}</div>
      <div className="flex w-0 flex-1 justify-end">
        <button
          onClick={next}
          className="inline-flex items-center   pl-1  text-sm font-medium text-gray-400  hover:text-white"
        >
          Next
          <FaAngleRight className="ml-2" />
        </button>
      </div>
    </nav>
  )
}
