import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import NavBar from "../components/NavBar";
import Genre from "../components/Genre";
import FilterBy from "../components/FilterBy";
import OriginalLanguageFilter from "../components/OriginalLanguageFilter";
import TranslationFilter from "../components/TranslationFilter";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ActorSearch from "../components/ActorSearch";

import { fetchMovies } from "../api/api";
import { setMovies } from "../app/features/movieSlice";
import { setGenre } from "../app/features/genreSlice";
import { setFilter } from "../app/features/filterSlice";
import type { RootState } from "../app/store";
import type { Actor } from "../types";

const DEFAULT_GENRE = "28";
const DEFAULT_FILTER = "popularity.desc";

const Filter = () => {
  const [genre, setGenreLocal] = useState<string>(DEFAULT_GENRE);
  const [filter, setFilterLocal] = useState<string>(DEFAULT_FILTER);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const selectedActors = useSelector((state: RootState) => state.filter.actors);
  const movieLanguage = useSelector((state: RootState) => state.filter.movieLanguage);
  const translationMode = useSelector((state: RootState) => state.filter.translationMode);

  const fetchMoviesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const actorIds = selectedActors.map((actor: Actor) => actor.id);
      const { movies, totalPages, totalResults } = await fetchMovies({
        genre,
        filter,
        uiLanguage: currentLanguage,
        actorIds,
        page: 1,
        movieLanguage: movieLanguage,
        translatedOnly: translationMode === 'translated',
      });
      dispatch(setMovies({ movies, totalPages, page: 1, totalResults }));
      dispatch(setGenre(genre));
      dispatch(setFilter(filter));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, selectedActors, genre, filter, currentLanguage, movieLanguage, translationMode]);

  const handleClick = async () => {
    await fetchMoviesData();
    navigate("/result");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center max-w-4xl mx-auto">
        <h1 className="sm:text-[38px] font-bold text-2xl pb-10">
          <span className="text-lime-400">{t('filterPage.selectMovie')}</span> {t('filterPage.filters')}
        </h1>

        <div className=" w-fit text-center mb-6">
          <p className="sm:text-xl text-left font-semibold mb-2">{t('filterPage.actors')}</p>
          <ActorSearch />
        </div>

        <div className=" w-fit text-center">
          <p className="sm:text-xl text-left font-semibold mb-2">{t('filterPage.filterBy')}</p>
          <FilterBy filter={filter} setFilter={setFilterLocal} />
        </div>

        <div className="mb-6 text-center w-fit">
          <p className="sm:text-xl font-semibold mb-2 text-left">{t('filterPage.genre')}</p>
          <Genre genre={genre} setGenre={setGenreLocal} />
        </div>

        <OriginalLanguageFilter />

        <TranslationFilter />

        <Button
          onClick={handleClick}
          loading={isLoading}
          className="sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400 active:text-lime-400 active:bg-primary-light-gray active:border-2 active:border-lime-400 focus:text-lime-400 focus:bg-primary-light-gray focus:border-2 focus:border-lime-400"
        >
          {isLoading ? t('filterPage.loading') : t('filterPage.findMovie')}
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default Filter;
