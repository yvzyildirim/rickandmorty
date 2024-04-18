import React, { useEffect, useState } from 'react'
import { PageHero } from './components/page-hero'
import { useNavigate, useParams } from 'react-router-dom'
import { Pagination } from './components/pagination'
import { PortalLoading } from './components/portal-loading'
import { FaHeart, FaQuestion, FaSkull } from 'react-icons/fa'
import { TbWaveSawTool } from 'react-icons/tb'
import { InfoBoard } from './components/info-board'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from './redux/actions'

export const Characters = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [locationData, setLocationData] = useState([])
  const [characterIds, setCharacterIds] = useState()
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(0)
  const { locationId } = useParams()
  const LOCATION_API_URL =
    'https://rickandmortyapi.com/api/location/' + locationId
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)

  const isFavorite = (id) => {
    return favorites.some((character) => character.id === id)
  }

  const toggleFavorite = (character) => {
    if (isFavorite(character.id)) {
      dispatch(removeFavorite(character.id))
    } else {
      dispatch(addFavorite(character))
    }
  }

  useEffect(() => {
    setLoading(true)
    fetch(LOCATION_API_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setLocationData(data)
        if (data.residents.length > 0) {
          const ids = data.residents.map((url) => {
            const id = url.split('/').pop()
            return parseInt(id, 10)
          })
          setCharacterIds(ids)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [LOCATION_API_URL])

  useEffect(() => {
    setLoading(true)
    setCharacters([])
    const fetchCharacters = async () => {
      if (characterIds?.length > 0) {
        const CHARACTERS_API_URL = `https://rickandmortyapi.com/api/character/${characterIds}`

        try {
          const response = await fetch(CHARACTERS_API_URL)
          const data = await response.json()

          let filteredCharacters = data

          // Eğer status filtresi varsa, karakterleri filtrele
          if (status) {
            filteredCharacters = data.filter(
              (character) => character.status === status,
            )
          }

          const groupedData = []
          for (let i = 0; i < filteredCharacters.length; i += 20) {
            groupedData.push(filteredCharacters.slice(i, i + 20))
          }
          setCharacters(groupedData)
          setTimeout(() => {
            setLoading(false)
          }, 400)
        } catch (error) {
          console.error('Error fetching data:', error)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [characterIds, status])

  const pages = characters?.length

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1)
  }

  const nextPage = () => {
    if (page < pages - 1) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleStatus = (value) => {
    setPage(0)
    setStatus(value)
  }

  const handleClick = (id) => {
    navigate(`/characters/detail/${id}`)
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <PageHero
        title={locationData.name}
        description="Discover the characters on this planet. You can filter them by status if you want."
        background="bg-background-2"
      />
      <div className="w-11/12 lg:w-[1200px] -mt-[100px]  overflow-x-scroll pb-10">
        {loading || loading === null ? (
          <PortalLoading />
        ) : characters.length > 0 ? (
          <>
            <div className="w-full flex justify-end">
              <div
                className="inline-flex rounded-md shadow-sm mb-4"
                role="group"
              >
                <button
                  onClick={() => handleStatus('')}
                  type="button"
                  className={
                    'px-4 py-2 flex items-center text-sm font-medium border rounded-l border-gray-700   hover:bg-gray-100  hover:text-white hover:bg-gray-700  ' +
                    (status === ''
                      ? 'bg-primary text-grey-700 border-gray-800'
                      : 'bg-gray-800 text-white ')
                  }
                >
                  ALL
                </button>
                <button
                  onClick={() => handleStatus('Alive')}
                  type="button"
                  className={
                    'px-4 py-2 flex items-center text-sm font-medium border-t border-b border-gray-700   hover:bg-gray-100  hover:text-white hover:bg-gray-700  ' +
                    (status === 'Alive'
                      ? 'bg-primary text-grey-700 border-gray-800'
                      : 'bg-gray-800 text-white ')
                  }
                >
                  <TbWaveSawTool className="mr-2" />
                  Alive
                </button>
                <button
                  onClick={() => handleStatus('Dead')}
                  type="button"
                  className={
                    'px-4 py-2 flex items-center text-sm font-medium border-t border-b border-l border-gray-700   hover:bg-gray-100  hover:text-white hover:bg-gray-700  ' +
                    (status === 'Dead'
                      ? 'bg-primary text-grey-700 border-gray-800'
                      : 'bg-gray-800 text-white ')
                  }
                >
                  <FaSkull className="mr-2" />
                  Dead
                </button>
                <button
                  onClick={() => handleStatus('unknown')}
                  type="button"
                  className={
                    'px-4 py-2 flex items-center text-sm font-medium rounded-r border-t border-b border-l border-gray-700   hover:bg-gray-100  hover:text-white hover:bg-gray-700  ' +
                    (status === 'Unknown'
                      ? 'bg-primary text-grey-700 border-gray-800'
                      : 'bg-gray-800 text-white ')
                  }
                >
                  <FaQuestion className="mr-2" />
                  Unknown
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {characters[page].map((i, index) => (
                <div
                  onClick={() => handleClick(i.id)}
                  key={index}
                  className="relative border border-gray-700 border-2"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={i.image}
                    alt={i.name}
                  />
                  <div className="absolute w-full h-full bg-black bg-opacity-50  hover:bg-opacity-30 bottom-0 flex items-end cursor-pointer">
                    <button
                      onClick={(e) => {
                        e.stopPropagation() 
                        toggleFavorite(i)
                      }}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        isFavorite(i.id)
                          ? 'bg-primary text-black'
                          : 'bg-gray-300 text-gray-500'
                      }`}
                    >
                      {isFavorite(i.id) ? <FaHeart /> : <FaHeart />}
                    </button>
                    <div className="flex flex-col items-start p-3  bg-gradient-to-t from-[#111] to-transparent w-full">
                      <span className="text-gray-100 font-semibold text-md">
                        {i.name}
                      </span>
                      <div className="rounded-full flex items-center  text-white mt-1 text-sm">
                        {i.status === 'Alive' ? (
                          <TbWaveSawTool />
                        ) : i.status === 'Dead' ? (
                          <FaSkull />
                        ) : (
                          <FaQuestion />
                        )}
                        <span className="ml-2">{i.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              next={nextPage}
              prev={prevPage}
              onPageChange={handlePageChange}
              currentPage={page + 1}
              pages={pages}
            />
          </>
        ) : (
          <InfoBoard
            title="Temporal Chaos"
            description="Not a single character can be found on this planet. Once vibrant and full of life, it now lies under the rule of silence. Did Rick and Morty erase everything from time in these distant realms? Or is there another force at play, altering the fate of the planet? The mysteries and deep secrets of the planet await illumination."
            action="/"
          />
        )}
      </div>
    </div>
  )
}
