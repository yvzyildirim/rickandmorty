import { useState } from 'react'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import { Pagination } from './components/pagination'
import { PortalLoading } from './components/portal-loading'
import { PageHero } from './components/page-hero'
import { useNavigate } from 'react-router-dom'

const locations = gql`
  query MyQuery($page: Int) {
    locations(page: $page, filter: {}) {
      info {
        pages
        count
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`

function App() {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(locations, {
    variables: { page: page },
  })
  const pages = data?.locations.info.pages

  const navigate = useNavigate()

  const handleRowClick = (id) => {
    navigate(`/characters/${id}`)
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  }

  const nextPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <PageHero
        title="Locations"
        description="Learn about the locations in the Rick and Morty universe. Choose a
        location and explore the characters in that location."
        background="bg-background-1"
      />

      <div className="w-11/12 lg:w-[1200px] -mt-[100px] bg-gray-900 overflow-x-scroll pb-10">
        {loading ? (
          <PortalLoading />
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-700 border border-gray-700 ">
              <thead>
                <tr>
                  <th className="py-3.5  px-2 text-left text-sm font-semibold  text-white  ">
                    No
                  </th>
                  <th className="py-3.5  px-2 text-left text-sm font-semibold  text-white  ">
                    Name
                  </th>
                  <th className="py-3.5  px-2 text-left text-sm font-semibold  text-white  ">
                    Type
                  </th>
                  <th className="py-3.5  px-2 text-left text-sm font-semibold  text-white  ">
                    Dimension
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {data?.locations.results.map((i, index) => (
                  <tr
                    onClick={() => handleRowClick(i.id)}
                    key={index}
                    className="hover:bg-black cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-700 text-white ">
                      {i.id}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 text-white ">
                      {i.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 text-white ">
                      {i.type}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 text-white ">
                      {i.dimension}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              next={nextPage}
              prev={prevPage}
              onPageChange={handlePageChange}
              currentPage={page}
              pages={pages}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
