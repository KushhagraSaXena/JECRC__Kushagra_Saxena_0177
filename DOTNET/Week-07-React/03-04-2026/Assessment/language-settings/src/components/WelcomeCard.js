import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './WelcomeCard.css';

const WelcomeCard = () => {
  const { t, currentLanguage } = useLanguage();

  const getGreetingEmoji = (language) => {
    const emojis = {
      en: '👋',
      es: '🙌',
      fr: '✨',
      de: '😊',
      hi: '🙏',
    };
    return emojis[language] || '👋';
  };

  return (
    <div className="welcome-card">
      <div className="welcome-emoji">{getGreetingEmoji(currentLanguage)}</div>
      <h2 className="welcome-title">{t('greeting')}</h2>
      <p className="welcome-text">{t('description')}</p>
    </div>
  );
};

export default WelcomeCard;
