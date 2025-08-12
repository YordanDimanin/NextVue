import { useState } from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface CardProps {
  img: string;
  title: string;
  description: string;
  releaseDate: string;
  cast?: Actor[];
}

const Card = ({ img, title, description, releaseDate, cast }: CardProps) => {
  const [showAllCast, setShowAllCast] = useState(false);
  const DISPLAY_LIMIT = 5;
  const { t } = useTranslation(); // Initialize useTranslation

  const displayedCast = showAllCast ? cast : cast?.slice(0, DISPLAY_LIMIT);

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
        <p className="font-bold text-gray-300">{t('resultPage.releaseDate')} {releaseDate}</p>

        {cast && cast.length > 0 && (
          <div className="mt-4">
            <h6 className="mb-2 text-xl font-bold text-slate-200">{t('resultPage.cast')}</h6>
            <div className="flex flex-wrap gap-4">
              {displayedCast?.map((actor: Actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  {actor.profile_path ? (
                    <img
                      className="w-16 h-16 rounded-full object-cover"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
                      {t('resultPage.noImage')}
                    </div>
                  )}
                  <p className="text-sm text-gray-300 mt-1 text-center">
                    {actor.name}
                  </p>
                </div>
              ))}
            </div>
            {cast.length > DISPLAY_LIMIT && (
              <button
                onClick={() => setShowAllCast(!showAllCast)}
                className="mt-4 text-lime-400 hover:underline active:underline focus:underline text-sm md:text-base"
              >
                {showAllCast ? t('resultPage.showLess') : t('resultPage.showFullCast')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
