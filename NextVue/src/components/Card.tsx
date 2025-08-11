const Card = ({ img, title, description, releaseDate }) => {
  return (
    <div className="flex flex-col items-center w-full border rounded-lg shadow-sm border-gray-700 bg-gray-800 md:flex-row md:max-w-4xl">
      
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
        <h5 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl text-slate-200">{title}</h5>
        <p className="mb-3 font-normal md:text-lg text-gray-300 leading-loose">{description}</p>
        <p className="font-bold text-gray-300">Release Date: {releaseDate}</p>
      </div>
    </div>
  );
};

export default Card;
