import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navigation from './components/Navigation';
import WelcomeCard from './components/WelcomeCard';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import './App.css';

function AppContent() {
  return (
    <div className="app-container">
      <Header />
      <nav className="main-nav">
        <Navigation />
      </nav>
      <main className="main-content">
        <div className="content-wrapper">
          <div className="switcher-section">
            <LanguageSwitcher />
          </div>
          <WelcomeCard />
          <AboutSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
