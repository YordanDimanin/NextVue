// LanguageFilter.tsx
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useDispatch } from 'react-redux';
import { setLanguage } from '../app/features/languageSlice';

interface LanguageFilterProps {
  allowedLanguages?: string[]; // New optional prop
}

const LanguageFilter = ({ allowedLanguages }: LanguageFilterProps) => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation and get i18n instance
  const dispatch = useDispatch();

  const allLanguages = [
    { value: "en", labelKey: "languageOptions.en" },
    { value: "bg", labelKey: "languageOptions.bg" },
    { value: "es", labelKey: "languageOptions.es" },
    { value: "fr", labelKey: "languageOptions.fr" },
    { value: "de", labelKey: "languageOptions.de" },
    { value: "it", labelKey: "languageOptions.it" },
    { value: "ja", labelKey: "languageOptions.ja" },
    { value: "ko", labelKey: "languageOptions.ko" },
  ];

  const filteredLanguages = allowedLanguages
    ? allLanguages.filter(lang => allowedLanguages.includes(lang.value))
    : allLanguages;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language} // Use i18n.language to reflect current language
        onChange={handleLanguageChange}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        {filteredLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {t(lang.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageFilter;