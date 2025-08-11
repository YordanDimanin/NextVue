// LanguageFilter.tsx
interface LanguageFilterProps {
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageFilter = ({ language, setLanguage }: LanguageFilterProps) => {
  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="en-US">🇺🇸 English (US)</option>
        <option value="bg-BG">🇧🇬 Bulgarian</option>
        <option value="es-ES">🇪🇸 Spanish</option>
        <option value="fr-FR">🇫🇷 French</option>
        <option value="de-DE">🇩🇪 German</option>
        <option value="it-IT">🇮🇹 Italian</option>
        <option value="ja-JP">🇯🇵 Japanese</option>
        <option value="ko-KR">🇰🇷 Korean</option>
      </select>
    </div>
  );
};

export default LanguageFilter;