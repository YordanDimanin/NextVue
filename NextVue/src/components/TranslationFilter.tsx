import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../app/store';
import { setTranslationMode } from '../app/features/filterSlice';

const TranslationFilter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const translationMode = useSelector((state: RootState) => state.filter.translationMode);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTranslationMode(e.target.value));
  };

  return (
    <div className="mb-6 text-center w-fit">
      <p className="sm:text-xl font-semibold mt-6 mb-2 text-left">
        {t('translationFilter.title')}
      </p>
      <select
        value={translationMode}
        onChange={handleChange}
        className=" appearance-none sm:text-2xl sm:py-6 text-xl py-4 px-10 sm:px-11 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
      >
        <option value="translated">
          {t('translationFilter.translatedOnly')}
        </option>
        <option value="mix">
          {t('translationFilter.mixed')}
        </option>
      </select>
    </div>
  );
};

export default TranslationFilter;