const Card = ({ img, title, description, releaseDate }) => {
  return (
    <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:max-w-4xl">
      
      {/* Image container */}
      <div className="w-full md:w-96 flex-shrink-0">
        <img
          className="object-contain w-full h-64 md:h-auto rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={img}
          alt="Movie Banner"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-between p-4 md:p-8 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-slate-200">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 md:text-lg dark:text-gray-300 leading-loose">{description}</p>
        <p className="font-bold text-gray-500 dark:text-gray-300">Release Date: {releaseDate}</p>
      </div>
    </div>
  );
};

export default Card;
