import { Link } from 'react-router-dom'
import logo from '../assets/movie.svg'

const Footer = () => {
  return (
    <div className='flex justify-between  px-4 py-2'>
        <div className='flex flex-col-reverse'>
          <p className='text-[14px]'>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          <Link to="https://www.themoviedb.org/" target="_blank"><img src={logo} alt="The Movie Database logo" className='w-30 py-2'></img></Link>
        </div>
    </div>
  )
}

export default Footer