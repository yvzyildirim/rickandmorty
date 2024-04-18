import React, { useEffect, useState } from 'react'
import { FaHeart, FaQuestion, FaSkull } from 'react-icons/fa'
import { TbWaveSawTool } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { Pagination } from './components/pagination'
import { PortalLoading } from './components/portal-loading'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from './redux/actions'

export const Character = () => {
  const navigate = useNavigate()
  const { characterId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [characterIds, setCharacterIds] = useState()
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(0)
  const CHARACTER_API_URL =
    'https://rickandmortyapi.com/api/character/' + characterId

  const { id, name, status, image, species, gender, origin, location } = data
  const locationUrl = location?.url

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
    fetch(CHARACTER_API_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [CHARACTER_API_URL])

  useEffect(() => {
    if (locationUrl) {
      fetch(locationUrl)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
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
    }
  }, [locationUrl])

  useEffect(() => {
    setCharacters([])
    const fetchCharacters = async () => {
      if (characterIds?.length > 0) {
        const CHARACTERS_API_URL = `https://rickandmortyapi.com/api/character/${characterIds}`

        try {
          const response = await fetch(CHARACTERS_API_URL)
          const data = await response.json()

          let filteredCharacters = data
          
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

  const handleClick = (id) => {
    navigate(`/characters/detail/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <PortalLoading />
        </div>
      ) : (
        <>
          <div className=" h-auto lg:h-[500px] flex justify-center items-center w-full  bg-no-repeat bg-cover bg-background-3 ">
            <div className="pt-[120px] pb-10 lg:pb-0 lg:pt-[80px] flex flex-col lg:flex-row justify-start items-center w-11/12 lg:w-[1200px]">
              <div className=" flex justify-center">
                <img
                  className="w-[260px] h-[260px] object-cover rounded-lg border-2 border-primary shadow-lg"
                  src={image}
                  alt={name}
                />
              </div>
              <div className="mt-10 lg:mt-0 flex flex-col items-center lg:items-start pl-0 lg:pl-10">
                <div className="flex items-center gap-4">
                  <div className="rounded-full flex items-center  text-white  text-sm border border-primary py-1 px-3">
                    {status === 'Alive' ? (
                      <TbWaveSawTool />
                    ) : status === 'Dead' ? (
                      <FaSkull />
                    ) : (
                      <FaQuestion />
                    )}
                    <span className="ml-2">{status}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(data)
                    }}
                    className={`p-2 rounded-full ${
                      isFavorite(id)
                        ? 'bg-primary text-black'
                        : 'text-white  text-sm border border-primary'
                    }`}
                  >
                    {isFavorite(id) ? <FaHeart /> : <FaHeart />}
                  </button>
                </div>
                <h1 className="text-[60px] my-2 lg:my-4 text-white font-semibold">
                  {name}
                </h1>
                <div className=" flex justify-center lg:justify-start  items-center">
                  <div className="pr-6 py-2 border-r border-primary flex flex-col items-start text-white">
                    <span className="text-xs font-bold text-primary">
                      Gender
                    </span>
                    <span className="text-2xl"> {gender} </span>
                  </div>
                  <div className="px-6 py-2 border-r border-primary flex flex-col items-start text-white">
                    <span className="text-xs font-bold text-primary">
                      Species
                    </span>
                    <span className="text-2xl"> {species} </span>
                  </div>
                  <div className="px-6 py-2  flex flex-col items-start text-white">
                    <span className="text-xs font-bold text-primary">
                      Origin
                    </span>
                    <span className="text-2xl"> {origin?.name} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-11/12 lg:w-[1200px] mt-10  overflow-x-scroll pb-10">
            <h2 className="text-primary font-bold text-lg mb-4 capitalize">
              {'Other characters on planet ' +
                location?.name +
                ' whose status is ' +
                status}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {characters[page]?.map((i, index) => (
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
          </div>
        </>
      )}
    </div>
  )
}
