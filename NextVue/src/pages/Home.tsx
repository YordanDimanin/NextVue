import Button from '../components/Button.tsx'
import NavBar from '../components/NavBar.tsx'
import Footer from '../components/Footer.tsx'
import { Link } from 'react-router-dom'
import LanguageFilter from '../components/LanguageFilter.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../app/features/languageSlice';
import type { RootState } from '../app/store';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Home = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { t } = useTranslation(); // Initialize useTranslation

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className='flex flex-grow flex-col items-center justify-center'>

        <h1 className='sm:text-[32px] font-bold text-2xl'>{t('home.welcome')}<span className='text-lime-400'>{t('home.appName')}</span></h1>

        <p className='leading-relaxed sm:text-xl text-md text-center sm:max-w-[500px] max-w-[400px] pb-10 pt-2 pl-4 pr-4'>{t('home.description')}</p>

        <div className="mb-6 w-fit text-center">
          <p className="sm:text-xl text-left font-semibold mb-2">{t('home.languageLabel')}</p>
          <LanguageFilter language={language} setLanguage={handleLanguageChange} allowedLanguages={['en-US', 'bg-BG']} />
        </div>

        <Link to="/filter"><Button className='sm:text-2xl sm:py-6 sm:px-12 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400'>{t('home.findMovie')}</Button></Link>

      </main>
      <Footer />
    </div>
  )
}

export default Home