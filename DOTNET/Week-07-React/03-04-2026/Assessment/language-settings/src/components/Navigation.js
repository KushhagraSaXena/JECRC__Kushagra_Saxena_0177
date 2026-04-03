import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Navigation.css';

const Navigation = () => {
  const { t } = useLanguage();

  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li><a href="#home" className="nav-link">{t('home')}</a></li>
        <li><a href="#settings" className="nav-link">{t('settings')}</a></li>
        <li><a href="#profile" className="nav-link">{t('profile')}</a></li>
        <li><a href="#about" className="nav-link">{t('about')}</a></li>
        <li><a href="#logout" className="nav-link logout">{t('logout')}</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
