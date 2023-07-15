import React, { useState } from 'react';
import ReactDOM from "react-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Navigation({ setActivePage, language, onLanguageChange }) {
    const handleLanguageButtonClick = () => {
        const newLanguage = language === 'Українська' ? 'English' : 'Українська';
        onLanguageChange(newLanguage);
    };

    const handleThemeButtonClick = () => {
        onThemeChange();
    };

    return (
         <div className="btn-container">
            <button onClick={() => setActivePage('inbox')}>
                {language === 'Українська' ? 'Вхідні' : 'Inbox'}
            </button>
            <button onClick={() => setActivePage('compose')}>
                {language === 'Українська' ? 'Створити' : 'Compose'}
            </button>
            <button onClick={handleLanguageButtonClick}>
                {language === 'Українська' ? 'English' : 'Українська'}
            </button>
            <button id="themeButton" onClick={handleThemeButtonClick}>
                {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </button>

        </div>
    );
}
