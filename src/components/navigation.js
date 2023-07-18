import React, { useState } from 'react';

export default function Navigation({ setActivePage, language, onLanguageChange }) {
    const [isUkrainian, setIsUkrainian] = useState(language === 'Українська');

    const handleLanguageButtonClick = () => {
        const newLanguage = isUkrainian ? 'English' : 'Українська';
        onLanguageChange(newLanguage);
        setIsUkrainian(!isUkrainian);
    };

    return (
        <div className="btn-container">
            <button onClick={() => setActivePage('inbox')}>
                {isUkrainian ? 'Вхідні' : 'Inbox'}
            </button>
            <button onClick={() => setActivePage('compose')}>
                {isUkrainian ? 'Створити' : 'Compose'}
            </button>
            <button className="language-btn" onClick={handleLanguageButtonClick}>{isUkrainian ? 'English' : 'Українська'  }</button>
        </div>
    );
}
