import { useDispatch, useSelector } from "react-redux";
import { setGenre } from "../app/features/genreSlice";
import { useEffect } from "react";

const Genre = () => {

  const genre = useSelector((state: any) => state.genre.genre);
  const dispatch = useDispatch();

  function getGenre(e: string){
    dispatch(setGenre(e));
  }

  useEffect(() => {
    console.log(genre);
  }, [genre])

  return (
    <div className="relative inline-block">
      <select onChange={(e) => {getGenre(e.target.value);} }
        className="appearance-none
                   sm:text-2xl sm:py-6 
                   text-xl py-4 px-10 sm:px-11 text-center
                   bg-slate-700 border-none text-primary-white
                   rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">TV Movie</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>

      </select>

      
    </div>
  );
};

export default Genre;


