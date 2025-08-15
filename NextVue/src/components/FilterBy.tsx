// FilterBy.tsx
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface FilterByProps {
  filter: string;
  setFilter: (value: string) => void;
}

const FilterBy = ({ filter, setFilter }: FilterByProps) => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="relative inline-block">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="appearance-none sm:text-2xl sm:py-6 mb-4 text-xl py-4 px-11 sm:px-13 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="popularity.desc">{t('filterByOptions.mostPopular')}</option>
        <option value="vote_count.desc">{t('filterByOptions.mostVoted')}</option>
      </select>
    </div>
  );
};

export default FilterBy;
