import Button from '../components/Button.tsx'
import NavBar from '../components/NavBar.tsx'
import Footer from '../components/Footer.tsx'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className='flex flex-grow flex-col items-center justify-center'>

        <h1 className='sm:text-[32px] font-bold text-2xl'>Welcome to <span className='text-lime-400'>NextVue</span></h1>

        <p className='leading-relaxed sm:text-xl text-md text-center sm:max-w-[500px] max-w-[400px] pb-10 pt-2 pl-4 pr-4'>NextVue is your personal movie companion — helping you discover great films based on your favorite genres. </p>

        <Link to="/filter"><Button className='sm:text-2xl sm:py-6 sm:px-12 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400'>Find Movie</Button></Link>

      </main>
      <Footer />
    </div>
  )
}

export default Home