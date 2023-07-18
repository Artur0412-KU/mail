import React, { useState, useEffect } from 'react';
import EmailPreview from "./emailpreview";
import { emails } from '../data/data'; // Import the emails data

function Inbox({ language }) {
    const [emailData, setEmailData] = useState([]);

    useEffect(() => {
        setEmailData(emails);
    }, [])

    useEffect(() => {
        document.title = language === 'Українська' ? 'Вхідні' : 'Inbox';
    }, [language]);

    return (
        <div className="inbox-container">
            <h2>{language === 'Українська' ? 'Вхідні' : 'Inbox'}</h2>
            <div className="mails-container">
                {emailData.length > 0 ? (
                    emailData.map((email) => (
                        <EmailPreview key={email.id} email={email} language={language} />
                    ))
                ) : (
                    <p>{language === 'Українська' ? 'Немає електронних листів.' : 'No emails found.'}</p>
                )}
            </div>
        </div>
    );
}

export default Inbox;
