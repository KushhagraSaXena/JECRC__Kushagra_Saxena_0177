import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { currentLanguage } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerTexts = {
    en: '© 2026 Language Settings Demo. Built with React Context API.',
    es: '© 2026 Demo de Configuración de Idioma. Construido con React Context API.',
    fr: '© 2026 Démo des Paramètres de Langue. Créé avec React Context API.',
    de: '© 2026 Spracheinstellungs-Demo. Gebaut mit React Context API.',
    hi: '© 2026 भाषा सेटिंग्स डेमो। React Context API के साथ निर्मित।',
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{footerTexts[currentLanguage] || footerTexts.en}</p>
        <p className="footer-note">🌐 Multi-language support powered by React Context API</p>
      </div>
    </footer>
  );
};

export default Footer;
