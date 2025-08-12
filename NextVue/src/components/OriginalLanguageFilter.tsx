
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieLanguage } from '../app/features/filterSlice';
import type { RootState } from '../app/store';

const OriginalLanguageFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const movieLanguage = useSelector((state: RootState) => state.filter.movieLanguage);

  const languages = [
    { value: "en", labelKey: "languageOptions.en" },
    { value: "bg", labelKey: "languageOptions.bg" },
    { value: "ja", labelKey: "languageOptions.ja" },
    { value: "es", labelKey: "languageOptions.es" },
    { value: "fr", labelKey: "languageOptions.fr" },
    { value: "de", labelKey: "languageOptions.de" },
    { value: "zh", labelKey: "languageOptions.zh" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMovieLanguage = e.target.value;
    dispatch(setMovieLanguage(newMovieLanguage));
  };

  return (
    <div className="relative inline-block">
      <select
        value={movieLanguage}
        onChange={handleLanguageChange}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor:pointer focus:ring-0 focus:border-none"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {t(lang.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OriginalLanguageFilter;
