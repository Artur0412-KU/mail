import React, { useState } from 'react';
import ReactDOM from "react-dom";

export default function ComposeEmailForm() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Make API request to send email
        const emailData = {
            subject: subject,
            body: body,
        };

        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent successfully:', data);
                setSubject('');
                setBody('');
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <h2>Compose Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );

}