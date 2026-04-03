import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header-content">
        <h1>{t('welcome')}</h1>
        <p className="header-subtitle">{t('description')}</p>
      </div>
    </header>
  );
};

export default Header;
