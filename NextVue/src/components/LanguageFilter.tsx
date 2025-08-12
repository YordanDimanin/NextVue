// LanguageFilter.tsx
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../app/features/languageSlice';
import type { RootState } from '../app/store'; // Import RootState

const LanguageFilter = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);

  const allowedLanguages = [
    { value: "en", labelKey: "languageOptions.en" },
    { value: "bg", labelKey: "languageOptions.bg" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage); // Explicitly change i18n language
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor:pointer focus:ring-0 focus:border-none"
      >
        {allowedLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {t(lang.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageFilter;