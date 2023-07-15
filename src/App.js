import React, {useState} from "react";
import ReactDOM from "react-dom";
import Inbox from "./components/Inbox";
import ComposeEmailForm from "./components/composeemailform";
import Navigation from "./components/navigation";


export default function App() {
    const [activePage, setActivePage] = useState('inbox');
    const [language, setLanguage] = useState('Українська');

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const getLanguageText = (key) => {
        // Об'єкт, що містить тексти для української мови
        const languageTexts = {
            inbox: "Вхідні",
            compose: "Написати листа",
        };

        return languageTexts[key];
    };

    return (
      <div className="App">
          <div className="header">
              <h1>IKnowMail</h1>
              <Navigation setActivePage={setActivePage} language={language}
                          onLanguageChange={handleLanguageChange}/>
          </div>

          {activePage === 'inbox' && <Inbox language={language}/>}
          {activePage === 'compose' && <ComposeEmailForm language={language}/>}
      </div>
  );
}
