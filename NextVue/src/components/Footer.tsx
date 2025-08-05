import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex justify-between  px-4 py-2'>
        <Link to="https://www.themoviedb.org/" target="_blank"><img src="../../public/movie.svg" alt="The Movie Database logo" className='w-30 py-2'></img></Link>
        <p className="text-sm w-[150px] text-right">Developed by: <span className='text-lime-400'>Yordan Dimanin</span></p>
    </div>
  )
}

export default Footer