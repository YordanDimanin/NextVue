// LanguageFilter.tsx
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface LanguageFilterProps {
  language: string;
  setLanguage: (value: string) => void;
  allowedLanguages?: string[]; // New optional prop
}

const LanguageFilter = ({ language, setLanguage, allowedLanguages }: LanguageFilterProps) => {
  const { t } = useTranslation(); // Initialize useTranslation

  const allLanguages = [
    { value: "en-US", labelKey: "languageOptions.en-US" },
    { value: "bg-BG", labelKey: "languageOptions.bg-BG" },
    { value: "es-ES", labelKey: "languageOptions.es-ES" },
    { value: "fr-FR", labelKey: "languageOptions.fr-FR" },
    { value: "de-DE", labelKey: "languageOptions.de-DE" },
    { value: "it-IT", labelKey: "languageOptions.it-IT" },
    { value: "ja-JP", labelKey: "languageOptions.ja-JP" },
    { value: "ko-KR", labelKey: "languageOptions.ko-KR" },
  ];

  const filteredLanguages = allowedLanguages
    ? allLanguages.filter(lang => allowedLanguages.includes(lang.value))
    : allLanguages;

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
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