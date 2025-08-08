import NavBar from "../components/NavBar"
import Card from "../components/Card"
import Button from "../components/Button"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const Result = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center">
        <h1 className="sm:text-[38px] font-bold text-2xl pb-10"><span className='text-lime-400'>Movie</span> recommendation</h1>
        <Card />
        <Link to="/filter">
          <Button className="sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400">Recommend Another Movie</Button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default Result