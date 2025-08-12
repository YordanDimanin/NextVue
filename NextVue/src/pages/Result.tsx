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
    const pagesToFetch = 5; // Fetch 5 pages at a time
    let allNewMovies: Movie[] = [];
    let newTotalPages = totalPages;
    let newCurrentPage = currentPage;

    for (let i = 0; i < pagesToFetch; i++) {
      if (newCurrentPage + 1 <= newTotalPages) {
        setIsLoading(true);
        try {
          const actorIds = selectedActors.map((actor: Actor) => actor.id);
          const { movies: fetchedMovies, totalPages: latestTotalPages } = await fetchMovies(genre, filter, language, actorIds, newCurrentPage + 1);
          allNewMovies = [...allNewMovies, ...fetchedMovies];
          newTotalPages = latestTotalPages; // Update totalPages in case it changed
          newCurrentPage++;
        } catch (error) {
          console.error("Failed to fetch next page of movies:", error);
          break; // Stop fetching if an error occurs
        } finally {
          setIsLoading(false);
        }
      } else {
        break; // No more pages to fetch
      }
    }

    if (allNewMovies.length > 0) {
      dispatch(setMovies({ movies: allNewMovies, totalPages: newTotalPages, page: newCurrentPage }));
    }
  }, [currentPage, totalPages, dispatch, selectedActors, genre, filter, language]);

  const handleRecommendClick = useCallback(() => {
    if (currentMovieIndex < movies.length - 1) {
      dispatch(nextMovie());
    } else if (currentPage < totalPages && !isLoading) {
      console.log("Fetching next page...");
      fetchNextPage();
    } else {
      console.log("No more movies to recommend.");
    }
  }, [currentMovieIndex, movies.length, currentPage, totalPages, dispatch, fetchNextPage, isLoading]);

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

        {currentMovie && (
          <Card 
            img={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} 
            title={currentMovie.title} 
            description={currentMovie.overview} 
            releaseDate={currentMovie.release_date}
            cast={cast}
          />
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

