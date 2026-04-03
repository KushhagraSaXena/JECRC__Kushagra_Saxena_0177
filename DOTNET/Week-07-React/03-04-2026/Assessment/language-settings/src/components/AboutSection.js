import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './AboutSection.css';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">{t('about')}</h2>
        <p className="about-text">{t('aboutText')}</p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🌍</span>
            <h3>Multiple Languages</h3>
            <p>Support for 5 different languages out of the box</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3>Fast Switching</h3>
            <p>Instantly switch between languages without page reload</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <h3>Dynamic Updates</h3>
            <p>All components update automatically when language changes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
