import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Filter from './pages/Filter';
import Result from './pages/Result';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from './app/store';

function App() {
  const { i18n } = useTranslation();
  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/filter' element={<Filter />} />
      <Route path='/result' element={<Result />} />
    </Routes>
  );
}

export default App;