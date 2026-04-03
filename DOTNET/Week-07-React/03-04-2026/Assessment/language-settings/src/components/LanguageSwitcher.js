import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const languageNames = {
    en: '🇺🇸 English',
    es: '🇪🇸 Español',
    fr: '🇫🇷 Français',
    de: '🇩🇪 Deutsch',
    hi: '🇮🇳 हिन्दी',
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language-select">Select Language:</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang] || lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
