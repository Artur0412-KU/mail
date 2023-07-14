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
        <div>
            <h2>Inbox</h2>
            {emailData.length > 0 ? (
                emailData.map((email) => (
                    <EmailPreview key={email.id} email={email} />
                ))
            ) : (
                <p>No emails found.</p>
            )}
        </div>
    );
}

export default Inbox;
