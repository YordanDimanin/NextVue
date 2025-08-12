// LanguageFilter.tsx
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface LanguageFilterProps {
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageFilter = ({ language, setLanguage }: LanguageFilterProps) => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="en-US">{t('languageOptions.en-US')}</option>
        <option value="bg-BG">{t('languageOptions.bg-BG')}</option>
        <option value="es-ES">{t('languageOptions.es-ES')}</option>
        <option value="fr-FR">{t('languageOptions.fr-FR')}</option>
        <option value="de-DE">{t('languageOptions.de-DE')}</option>
        <option value="it-IT">{t('languageOptions.it-IT')}</option>
        <option value="ja-JP">{t('languageOptions.ja-JP')}</option>
        <option value="ko-KR">{t('languageOptions.ko-KR')}</option>
      </select>
    </div>
  );
};

export default LanguageFilter;