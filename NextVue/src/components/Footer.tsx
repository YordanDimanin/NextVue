import { Link } from 'react-router-dom'
import logo from '../assets/movie.svg'
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Footer = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className='flex justify-between  px-4 py-2'>
        <div className='flex flex-col-reverse'>
          <p className='text-[14px]'>{t('footer.disclaimer')}</p>
          <Link to="https://www.themoviedb.org/" target="_blank"><img src={logo} alt="The Movie Database logo" className='w-30 py-2'></img></Link>
        </div>
    </div>
  )
}

export default Footer