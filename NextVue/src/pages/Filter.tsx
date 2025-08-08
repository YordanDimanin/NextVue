import NavBar from "../components/NavBar"
import Genre from "../components/Genre"
import FilterBy from "../components/FilterBy"
import Button from "../components/Button"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

import { fetchMovies } from "../api/api"
import { useSelector } from "react-redux"

const Filter = () => {

  const genre = useSelector((state : any) => state.genre.genre);
  const filter = useSelector((state : any) => state.filter.filter);


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className='flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center'>

      <h1 className="sm:text-[38px] font-bold text-2xl pb-10"><span className='text-lime-400'>Select Movie</span> Filters</h1>

      <div>
        <p className="sm:text-xl font-semibold">Filter By</p>
        <FilterBy />
      </div>

      <div>
        <p className="sm:text-xl font-semibold">Genre</p>
        <Genre />
      </div>

      <Link to="/result"><Button onClick={() => {fetchMovies(genre, filter)}} className='sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400'>Find Movie</Button></Link>

      </main>

      <Footer />
    </div>
  )
}

export default Filter