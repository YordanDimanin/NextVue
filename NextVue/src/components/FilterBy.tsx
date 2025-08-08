import { useDispatch} from "react-redux";
import { setFilter } from "../app/features/filterSlice";

const FilterBy = () => {

  const dispatch = useDispatch();

  function getFilter(e: string){
    dispatch(setFilter(e));
  }

  return (
    <div className="relative inline-block">
      <select onChange={(e) => {getFilter(e.target.value);} }
        className="appearance-none
                   sm:text-2xl sm:py-6 mb-4
                   text-xl py-4 px-11 sm:px-13 text-center
                   bg-slate-700 border-none text-primary-white
                   rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >

        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Highest Rated</option>
        <option value="release_date.desc">Newest</option>
        <option value="release_date.asc">Oldest</option>
        <option value="vote_count.desc">Most Voted</option>

      </select>

      
    </div>
  );
};

export default FilterBy;