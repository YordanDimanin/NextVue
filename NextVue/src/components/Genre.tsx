
const Genre = () => {
  return (
    <div className="relative inline-block">
      <select
        className="appearance-none
                   sm:text-2xl sm:py-6 
                   text-xl py-4 px-10 sm:px-11 text-center
                   bg-slate-700 border-none text-primary-white
                   rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
        <option value="Western">Western</option>
      </select>

      
    </div>
  );
};

export default Genre;


