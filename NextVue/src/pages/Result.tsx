import NavBar from "../components/NavBar"
import Card from "../components/Card"
import Button from "../components/Button"
import Footer from "../components/Footer"

import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovieDetailsWithCast, fetchMovies } from "../api/api"
import { nextMovie, setMovies } from "../app/features/movieSlice";
import type { RootState } from "../app/store";
import type { Actor, Movie } from "../types";

const Result = () => {
  const dispatch = useDispatch();
  const { list: movies, currentPage, totalPages, currentMovieIndex } = useSelector((state: RootState) => state.movies);
  const selectedActors = useSelector((state: RootState) => state.filter.actors);
  const genre = useSelector((state: RootState) => state.genre.genre);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const language = useSelector((state: RootState) => state.language.language);

  const [cast, setCast] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      try {
        const actorIds = selectedActors.map((actor: Actor) => actor.id);
        const { movies: newMovies, totalPages: newTotalPages } = await fetchMovies(genre, filter, language, actorIds, currentPage + 1);
        dispatch(setMovies({ movies: newMovies, totalPages: newTotalPages, page: currentPage + 1 }));
      } catch (error) {
        console.error("Failed to fetch next page of movies:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentPage, totalPages, dispatch, selectedActors, genre, filter, language]);

  const handleRecommendClick = useCallback(() => {
    if (currentMovieIndex < movies.length - 1) {
      dispatch(nextMovie());
    } else if (currentPage < totalPages) {
      fetchNextPage();
    } else {
      // All movies from all pages have been shown
      console.log("No more movies to recommend.");
    }
  }, [currentMovieIndex, movies.length, currentPage, totalPages, dispatch, fetchNextPage]);

  useEffect(() => {
    const getCast = async () => {
      if (movies.length > 0 && currentMovieIndex < movies.length) {
        const movieId = (movies[currentMovieIndex] as Movie).id;
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
  }, [currentMovieIndex, movies, selectedActors]);

  const currentMovie = movies[currentMovieIndex];
  const noMoreMovies = currentMovieIndex >= movies.length -1 && currentPage >= totalPages;

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

        {currentMovie ? (
          <Card 
            img={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} 
            title={currentMovie.title} 
            description={currentMovie.overview} 
            releaseDate={currentMovie.release_date}
            cast={cast}
          />
        ) : (
          !isLoading && movies.length === 0 && (
            <p className="text-primary-white text-center text-xl mb-4">
              No movies found matching your filters. Please try different selections.
            </p>
          )
        )}

        <Button 
          onClick={handleRecommendClick} 
          className={`sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:hover:bg-primary-light-gray hover:border-2 hover:border-lime-400 ${noMoreMovies || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={noMoreMovies || isLoading}
        >
          {isLoading ? 'Loading...' : 'Recommend Another Movie'}
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default Result

