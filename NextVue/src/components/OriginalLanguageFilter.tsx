import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieLanguage } from "../app/features/filterSlice";
import type { RootState } from "../app/store";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ExclamationIcon = ({ onClick }: { onClick: () => void }) => (
  <span
    onClick={onClick}
    tabIndex={0}
    aria-label="Show Info"
    className="ml-2 inline-block text-lime-400 cursor-pointer font-bold text-lg select-none"
    role="button"
  >
    !
  </span>
);

const messages = {
  en:
    "Filters movies by the language they were originally made in. Titles and descriptions will be shown in your selected app language. If a movie has been translated into your selected language, it will be shown in that language; otherwise, it will appear in its original language.",
  bg:
    "Филтрира филмите по езика, на който са оригинално създадени. Заглавията и описанията ще бъдат показани на избрания от вас език на приложението. Ако филмът е преведен на избрания от вас език, ще се покаже на този език; ако не, ще се покаже на оригиналния му език.",
};

interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

const OriginalLanguageFilter: React.FC = () => {
  const dispatch = useDispatch();
  const movieLanguage = useSelector((state: RootState) => state.filter.movieLanguage);
  const { t, i18n } = useTranslation();

  const [languages, setLanguages] = useState<Language[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip if click outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    }
    if (showTooltip) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showTooltip]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/configuration/languages",
          { params: { api_key: import.meta.env.VITE_TMDB_API_KEY } }
        );
        const langsSorted = response.data.sort((a: Language, b: Language) => {
          const nameA = t(`originalLanguages.${a.iso_639_1}`) || a.english_name || a.name;
          const nameB = t(`originalLanguages.${b.iso_639_1}`) || b.english_name || b.name;
          return nameA.localeCompare(nameB);
        });
        setLanguages(langsSorted);
      } catch (error) {
        console.error("Error fetching languages:", error);
        // fallback minimal list if API fails
        setLanguages([
          { iso_639_1: "en", english_name: "English", name: "English" },
          { iso_639_1: "bg", english_name: "Bulgarian", name: "Bulgarian" },
        ]);
      }
    };
    fetchLanguages();
  }, [t]);

  return (
    <div className="w-fit text-left relative">
      <div className="flex items-center mb-2 select-none">
        <p className="sm:text-xl font-semibold mb-0">{t("filterPage.originalMovieLanguage")}</p>
        <ExclamationIcon onClick={() => setShowTooltip((v) => !v)} />
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute z-20 w-80 bg-[#2a2f3a] border border-lime-400 rounded p-3 shadow-lg text-sm text-white left-0 top-8"
          role="tooltip"
        >
          <div className="flex justify-between items-center mb-2">
            <strong className="text-lime-400">
              {i18n.language === "bg" ? "Информация" : "Info"}
            </strong>
            <button
              aria-label={i18n.language === "bg" ? "Затвори" : "Close"}
              className="text-white font-bold text-lg cursor-pointer"
              onClick={() => setShowTooltip(false)}
              type="button"
            >
              ×
            </button>
          </div>
          <div>{messages[i18n.language as keyof typeof messages] || messages.en}</div>
        </div>
      )}

      <select
        id="originalLanguage"
        value={movieLanguage}
        onChange={(e) => dispatch(setMovieLanguage(e.target.value))}
        className="appearance-none sm:text-2xl sm:py-6 text-xl py-4 px-10 sm:px-11 text-center bg-slate-700 border-none text-primary-white rounded-lg font-semibold w-full focus:outline-none cursor-pointer focus:ring-0 focus:border-none"
        aria-label={t("filterPage.originalMovieLanguage")}
      >
        <option value="">{t("originalLanguages.all")}</option>
        {languages.map(({ iso_639_1, english_name, name }) => (
          <option key={iso_639_1} value={iso_639_1}>
            {t(`originalLanguages.${iso_639_1}`, { defaultValue: english_name || name })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OriginalLanguageFilter;