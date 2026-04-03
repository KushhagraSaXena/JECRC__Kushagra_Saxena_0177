import React, { createContext, useState, useContext } from 'react';

// Create the Language Context
const LanguageContext = createContext();

// Language data for different languages
export const languageData = {
  en: {
    welcome: 'Welcome',
    description: 'Select your preferred language to experience the application in your language of choice.',
    language: 'Language',
    greeting: 'Hello, User!',
    about: 'About This App',
    aboutText: 'This application demonstrates language/localization settings using React Context API. You can switch languages seamlessly, and all components will update dynamically.',
    home: 'Home',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    theme: 'Theme',
    notification: 'Language changed successfully!',
  },
  es: {
    welcome: 'Bienvenido',
    description: 'Selecciona tu idioma preferido para experimentar la aplicación en el idioma de tu elección.',
    language: 'Idioma',
    greeting: '¡Hola, Usuario!',
    about: 'Acerca de esta aplicación',
    aboutText: 'Esta aplicación demuestra la configuración de idioma/localización usando React Context API. Puedes cambiar idiomas sin problemas, y todos los componentes se actualizarán dinámicamente.',
    home: 'Inicio',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    theme: 'Tema',
    notification: '¡Idioma cambiado exitosamente!',
  },
  fr: {
    welcome: 'Bienvenue',
    description: 'Sélectionnez votre langue préférée pour expérimenter l\'application dans la langue de votre choix.',
    language: 'Langue',
    greeting: 'Bonjour, Utilisateur!',
    about: 'À propos de cette application',
    aboutText: 'Cette application démontre les paramètres de langue/localisation à l\'aide de l\'API Context React. Vous pouvez changer de langue de manière transparente, et tous les composants seront mis à jour dynamiquement.',
    home: 'Accueil',
    settings: 'Paramètres',
    profile: 'Profil',
    logout: 'Déconnexion',
    theme: 'Thème',
    notification: 'Langue changée avec succès!',
  },
  de: {
    welcome: 'Willkommen',
    description: 'Wählen Sie Ihre bevorzugte Sprache, um die Anwendung in Ihrer Wunschsprache zu erleben.',
    language: 'Sprache',
    greeting: 'Hallo, Benutzer!',
    about: 'Über diese App',
    aboutText: 'Diese Anwendung demonstriert Sprach-/Lokalisierungseinstellungen mit React Context API. Sie können nahtlos zwischen Sprachen wechseln, und alle Komponenten werden dynamisch aktualisiert.',
    home: 'Startseite',
    settings: 'Einstellungen',
    profile: 'Profil',
    logout: 'Abmelden',
    theme: 'Design',
    notification: 'Sprache erfolgreich geändert!',
  },
  hi: {
    welcome: 'स्वागत है',
    description: 'अपनी पसंद की भाषा चुनें और अनुप्रयोग को अपनी भाषा में अनुभव करें।',
    language: 'भाषा',
    greeting: 'नमस्ते, उपयोगकर्ता!',
    about: 'इस ऐप के बारे में',
    aboutText: 'यह एप्लिकेशन React Context API का उपयोग करके भाषा/स्थानीयकरण सेटिंग्स को प्रदर्शित करता है। आप आसानी से भाषाओं को स्विच कर सकते हैं, और सभी घटक गतिशील रूप से अपडेट होंगे।',
    home: 'होम',
    settings: 'सेटिंग्स',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट',
    theme: 'थीम',
    notification: 'भाषा सफलतापूर्वक बदल गई!',
  },
};

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (language) => {
    if (languageData[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key) => {
    return languageData[currentLanguage]?.[key] || languageData['en']?.[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(languageData),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
