import NavBar from "../components/NavBar"
import Card from "../components/Card"
import Button from "../components/Button"
import Footer from "../components/Footer"

import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchActor, discoverMovies, fetchMovieDetailsWithCast } from "../api/api"
import { nextMovie, setMovies } from "../app/features/movieSlice";
import type { RootState } from "../app/store";
import type { Actor, Movie } from "../types";
import { useTranslation } from 'react-i18next';

const Result = () => {
  const dispatch = useDispatch();
  const { list: movies, currentPage, totalPages, currentMovieIndex, totalResults } = useSelector((state: RootState) => state.movies);
  const selectedActors = useSelector((state: RootState) => state.filter.actors);
  const genre = useSelector((state: RootState) => state.genre.genre);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const movieLanguage = useSelector((state: RootState) => state.filter.movieLanguage);
  const translationMode = useSelector((state: RootState) => state.filter.translationMode);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const [cast, setCast] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesInitial = useCallback(async () => {
    setIsLoading(true);
    try {
      let actorId: number | undefined;
      if (selectedActors && selectedActors.length > 0) {
        const actors = await searchActor(selectedActors[0].name);
        if (actors.length > 0) {
          actorId = actors[0].id;
        }
      }

      const { results, totalPages: newTotalPages } = await discoverMovies({
        castId: actorId,
        genreIds: genre ? [parseInt(genre)] : undefined,
        sortBy: filter,
        uiLanguage: currentLanguage,
        originalLanguage: movieLanguage === 'all' ? undefined : movieLanguage,
        translatedOnly: translationMode === 'translated',
        page: 1, // Always fetch first page initially
      });
      dispatch(setMovies({ movies: results, totalPages: newTotalPages, page: 1, totalResults: results.length }));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, selectedActors, genre, filter, currentLanguage, movieLanguage, translationMode]);

  useEffect(() => {
    fetchMoviesInitial();
  }, [fetchMoviesInitial, currentLanguage]);

  const fetchNextPage = useCallback(async () => {
    if (currentPage >= totalPages) return; // Prevent fetching if no more pages

    setIsLoading(true);
    try {
      let actorId: number | undefined;
      if (selectedActors && selectedActors.length > 0) {
        const actors = await searchActor(selectedActors[0].name);
        if (actors.length > 0) {
          actorId = actors[0].id;
        }
      }

      const { results: fetchedMovies, totalPages: newTotalPages } = await discoverMovies({
        castId: actorId,
        genreIds: genre ? [parseInt(genre)] : undefined,
        sortBy: filter,
        uiLanguage: currentLanguage,
        originalLanguage: movieLanguage === 'all' ? undefined : movieLanguage,
        translatedOnly: translationMode === 'translated',
        page: currentPage + 1, // Fetch the next page
      });

      dispatch(setMovies({
        movies: [...movies, ...fetchedMovies],
        totalPages: newTotalPages,
        page: currentPage + 1,
        totalResults: totalResults + fetchedMovies.length // This might not be accurate if totalResults is from API
      }));

    } catch (error) {
      console.error("Failed to fetch next page of movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, dispatch, selectedActors, genre, filter, currentLanguage, movieLanguage, translationMode, movies, totalResults]);

  const handleRecommendClick = useCallback(() => {
    if (currentMovieIndex < movies.length - 1) {
      dispatch(nextMovie());
    } else if (currentPage < totalPages && !isLoading) { // Check totalPages
      console.log("Fetching more movies...");
      fetchNextPage();
    } else {
      // No more movies to recommend, message is now displayed in UI
    }
  }, [currentMovieIndex, movies.length, currentPage, totalPages, dispatch, fetchNextPage, isLoading]);

  useEffect(() => {
    const getCast = async () => {
      if (movies.length > 0 && currentMovieIndex < movies.length) {
        const movieId = (movies[currentMovieIndex] as Movie).id;
        try {
          const { cast: fetchedCast } = await fetchMovieDetailsWithCast(movieId, currentLanguage);
          
          const fetchedCastIds = new Set(fetchedCast.map((actor: Actor) => actor.id));
          const combinedCast = [...fetchedCast];

          selectedActors.forEach((selectedActor: Actor) => {
            if (!fetchedCastIds.has(selectedActor.id)) {
              combinedCast.unshift(selectedActor);
            }
          });

          setCast(combinedCast);
        } catch (error) {
          console.error("Error fetching cast details:", error);
          setCast([]);
        }
      } else {
        setCast([]);
      }
    };
    getCast();
  }, [currentMovieIndex, movies, selectedActors, currentLanguage]);

  const currentMovie = movies[currentMovieIndex];
  const noMoreMovies = currentMovieIndex >= movies.length -1 && currentPage >= totalPages; // Updated logic

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center">

        <h1 className="sm:text-[38px] font-bold text-2xl pb-10">
          <span className='text-lime-400'>{t('resultPage.movie')}</span> {t('resultPage.recommendation')}
        </h1>

        {totalResults === 0 && translationMode === 'translated' && (
          <p className="text-primary-white text-center text-xl mb-4">
            {t('resultPage.noTranslatedMoviesFound')}
          </p>
        )}
        {totalResults === 0 && translationMode !== 'translated' && (
          <p className="text-primary-white text-center text-xl mb-4">
            {t('resultPage.noMoviesFound')}
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

        {movies.length > 0 && noMoreMovies && (
          <p className="text-primary-white text-center text-xl mb-4">
            {t('resultPage.noMoreMovies')}
          </p>
        )}

        <Button 
          onClick={handleRecommendClick} 
          className={`sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:hover:bg-primary-light-gray hover:border-2 hover:border-lime-400 ${noMoreMovies || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={noMoreMovies || isLoading}
        >
          {isLoading ? t('resultPage.loading') : t('resultPage.recommendAnotherMovie')}
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default Result;