import React, { useState, useEffect } from 'react';
import EmailPreview from "./emailpreview";
import { emails } from '../data/data'; // Import the emails data

// Component: Inbox
function Inbox() {
    const [emailData, setEmailData] = useState([]);

    useEffect(() => {
        setEmailData(emails); // Set the email data using the imported emails array
    }, []);

    return (
        <div className="inbox-container">
            <h2>Inbox</h2>
            <div className="mails-container">
                {emailData.length > 0 ? (
                    emailData.map((email) => (
                        <EmailPreview key={email.id} email={email} />
                    ))
                ) : (
                    <p>No emails found.</p>
                )}
            </div>

        </div>
    );
}

export default Inbox;
