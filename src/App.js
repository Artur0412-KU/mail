import React, {useState} from "react";
import ReactDOM from "react-dom";
import Inbox from "./components/Inbox";
import ComposeEmailForm from "./components/composeemailform";
import Navigation from "./components/navigation";


export default function App() {
    const [activePage, setActivePage] = useState('inbox');

    return (
      <div className="App">
          <div className="header">
              <h1>IKnowMail</h1>
              <Navigation setActivePage={setActivePage} />
          </div>
          {activePage === 'inbox' && <Inbox />}
          {activePage === 'compose' && <ComposeEmailForm />}
      </div>
  );
}
