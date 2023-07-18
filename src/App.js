import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Inbox from "./components/Inbox";
import Composeemailform from "./components/composeemailform";
import Navigation from "./components/navigation";


export default function App() {
    const [activePage, setActivePage] = useState('inbox');
    const [language, setLanguage] = useState('Українська');
    const [theme, setTheme] = useState('light');
    const [themeToggleLabel, setThemeToggleLabel] = useState('');

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        const toggleLabel = newLanguage === 'Українська' ? 'Змінити тему' : 'Change Theme';
        setThemeToggleLabel(toggleLabel);
    };

    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const toggleLabel = language === 'Українська' ? 'Змінити тему' : 'Change Theme';
        setThemeToggleLabel(toggleLabel);
    }, [language]);

    return (
        <div className={`App ${theme}`}>
            <div className="header">
                <h1>IKnowMail</h1>
                <Navigation
                    setActivePage={setActivePage}
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    theme={theme}
                    onThemeChange={handleThemeChange}
                    themeToggleLabel={themeToggleLabel}
                />
            </div>

            {activePage === 'inbox' && <Inbox language={language} />}
            {activePage === 'compose' && <Composeemailform language={language} />}
        </div>
    );
}
