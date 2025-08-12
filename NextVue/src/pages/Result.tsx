import NavBar from "../components/NavBar"
import Card from "../components/Card"
import Button from "../components/Button"
import Footer from "../components/Footer"

import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { fetchMovieDetailsWithCast } from "../api/api"
import type { RootState } from "../app/store";
import type { Actor, Movie } from "../types";

const Result = () => {
  const movies = useSelector((state: RootState) => state.movies.list);
  const selectedActors = useSelector((state: RootState) => state.filter.actors);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);

  const pickNewIndex = useCallback(() => {
    if (usedIndexes.length === movies.length) {
      // All movies shown, maybe reset or do nothing
      setUsedIndexes([]);
      setRandomIndex(null);
      setCast([]); // Clear cast when resetting
      return;
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * movies.length);
    } while (usedIndexes.includes(newIndex));

    setUsedIndexes((prev) => [...prev, newIndex]);
    setRandomIndex(newIndex);
  }, [movies, usedIndexes, setUsedIndexes, setRandomIndex, setCast]);

  useEffect(() => {
    if (movies.length && randomIndex === null) {
      pickNewIndex();
    }
  }, [movies, pickNewIndex, randomIndex]);

  useEffect(() => {
    const getCast = async () => {
      if (randomIndex !== null && movies[randomIndex]) {
        const movieId = (movies[randomIndex] as Movie).id;
        try {
          const { cast: fetchedCast } = await fetchMovieDetailsWithCast(movieId);
          
          const fetchedCastIds = new Set(fetchedCast.map((actor: Actor) => actor.id));
          const combinedCast = [...fetchedCast];

          selectedActors.forEach((selectedActor: Actor) => {
            if (!fetchedCastIds.has(selectedActor.id)) {
              combinedCast.unshift(selectedActor); // Add selected actor to the beginning
            }
          });

          setCast(combinedCast);
        } catch (error) {
          console.error("Error fetching cast details:", error);
          setCast([]);
        }
      }
    };
    getCast();
  }, [randomIndex, movies, selectedActors]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center">

        <h1 className="sm:text-[38px] font-bold text-2xl pb-10">
          <span className='text-lime-400'>Movie</span> recommendation
        </h1>

        {movies.length === 0 && (
          <p className="text-primary-white text-center text-xl mb-4">
            No movies found matching your filters. Please try different selections.
          </p>
        )}

        {randomIndex !== null && movies[randomIndex] && 
          <Card 
            img={`https://image.tmdb.org/t/p/w500${(movies[randomIndex] as Movie).poster_path}`} 
            title={(movies[randomIndex] as Movie).title} 
            description={(movies[randomIndex] as Movie).overview} 
            releaseDate={(movies[randomIndex] as Movie).release_date}
            cast={cast}
          />
        }

        <Button 
          onClick={pickNewIndex} 
          className="sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:hover:bg-primary-light-gray hover:border-2 hover:border-lime-400"
        >
          Recommend Another Movie
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default Result

