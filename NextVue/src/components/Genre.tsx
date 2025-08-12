// Genre.tsx
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface GenreProps {
  genre: string; // or number if you want
  setGenre: (value: string) => void;
}

const Genre = ({ genre, setGenre }: GenreProps) => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="relative inline-block">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="appearance-none sm:text-2xl sm:py-6 text-xl py-4 px-10 sm:px-11 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="28">{t('genreOptions.action')}</option>
        <option value="12">{t('genreOptions.adventure')}</option>
        <option value="16">{t('genreOptions.animation')}</option>
        <option value="35">{t('genreOptions.comedy')}</option>
        <option value="80">{t('genreOptions.crime')}</option>
        <option value="99">{t('genreOptions.documentary')}</option>
        <option value="18">{t('genreOptions.drama')}</option>
        <option value="10751">{t('genreOptions.family')}</option>
        <option value="14">{t('genreOptions.fantasy')}</option>
        <option value="36">{t('genreOptions.history')}</option>
        <option value="27">{t('genreOptions.horror')}</option>
        <option value="10402">{t('genreOptions.music')}</option>
        <option value="9648">{t('genreOptions.mystery')}</option>
        <option value="10749">{t('genreOptions.romance')}</option>
        <option value="878">{t('genreOptions.scienceFiction')}</option>
        <option value="10770">{t('genreOptions.tvMovie')}</option>
        <option value="53">{t('genreOptions.thriller')}</option>
        <option value="10752">{t('genreOptions.war')}</option>
        <option value="37">{t('genreOptions.western')}</option>
      </select>
    </div>
  );
};

export default Genre;



