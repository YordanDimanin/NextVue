import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import Genre from "../components/Genre";
import FilterBy from "../components/FilterBy";
import LanguageFilter from "../components/LanguageFilter";
import Button from "../components/Button";
import Footer from "../components/Footer";

import ActorSearch from "../components/ActorSearch";

import { fetchMovies } from "../api/api";
import { setMovies } from "../app/features/movieSlice";
import { setGenre } from "../app/features/genreSlice";
import { setFilter } from "../app/features/filterSlice";
import { setLanguage } from "../app/features/languageSlice";
import type { RootState } from "../app/store";
import type { Actor } from "../types";

const DEFAULT_GENRE = "28"; // Action genre as default
const DEFAULT_FILTER = "popularity.desc";
const DEFAULT_LANGUAGE = "en-US";

const Filter = () => {
  const [genre, setGenreLocal] = useState<string>(DEFAULT_GENRE);
  const [filter, setFilterLocal] = useState<string>(DEFAULT_FILTER);
  const [language, setLanguageLocal] = useState<string>(DEFAULT_LANGUAGE);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedActors = useSelector((state: RootState) => state.filter.actors);

  const handleClick = async () => {
    try {
      const actorIds = selectedActors.map((actor: Actor) => actor.id);
      const { movies, totalPages } = await fetchMovies(genre, filter, language, actorIds, 1);
      dispatch(setMovies({ movies, totalPages, page: 1 }));
      dispatch(setGenre(genre));
      dispatch(setFilter(filter));
      dispatch(setLanguage(language));
      navigate("/result");
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      // Optionally, show user feedback here
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex flex-grow flex-col items-center justify-start p-4 pt-20 md:justify-center max-w-4xl mx-auto">
        <h1 className="sm:text-[38px] font-bold text-2xl pb-10">
          <span className="text-lime-400">Select Movie</span> Filters
        </h1>

        <div className=" w-fit text-center mb-6">
          <p className="sm:text-xl text-left font-semibold mb-2">Actors</p>
          <ActorSearch />
        </div>

        <div className=" w-fit text-center">
          <p className="sm:text-xl text-left font-semibold mb-2">Filter By</p>
          <FilterBy filter={filter} setFilter={setFilterLocal} />
        </div>

        <div className="mb-6 text-center w-fit">
          <p className="sm:text-xl font-semibold mb-2 text-left">Genre</p>
          <Genre genre={genre} setGenre={setGenreLocal} />
        </div>

        <div className="mb-6 w-fit text-center">
          <p className="sm:text-xl text-left font-semibold mb-2">Language</p>
          <LanguageFilter language={language} setLanguage={setLanguageLocal} />
        </div>

        <Button
          onClick={handleClick}
          className="sm:text-2xl m-8 sm:py-6 sm:px-10 text-xl py-4 px-8 bg-lime-400 border-2 border-lime-400 text-primary-black rounded-lg font-semibold transition transform duration-300 hover:text-lime-400 hover:bg-primary-light-gray hover:border-2 hover:border-lime-400"
        >
          Find Movie
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default Filter;
