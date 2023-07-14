import React, { useState } from 'react';
import ReactDOM from "react-dom";

export default function ComposeEmailForm() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an email object
        const email = {
            recipient: recipient,
            subject: subject,
            body: body
        };

        // Send the email (you can replace this with your own logic)
        sendEmail(email);

        // Reset form fields
        setRecipient('');
        setSubject('');
        setBody('');
    };

    // Simulate sending the email (replace this with your own logic)
    const sendEmail = (email) => {
        console.log('Sending email:', email);
        // Implement your own logic to send the email
    };

    return (
        <div className="compose-form">
            <h2>Compose Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )

}
