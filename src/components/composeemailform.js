import React, { useState, useEffect  } from 'react';
import ReactDOM from "react-dom";

export default function ComposeEmailForm({ language }) {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        // Скидайте форму при зміні мови
        setRecipient('');
        setSubject('');
        setBody('');
    }, [language]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = {
            recipient: recipient,
            subject: subject,
            body: body
        };

        sendEmail(email);

        setRecipient('');
        setSubject('');
        setBody('');
    };

    const sendEmail = async (email) => {
        try {
            const response = await fetch('your-email-send-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            });

            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.log('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const resetEmail = () => {
        setRecipient('');
        setSubject('');
        setBody('');
    };

    return (
        <div className="compose-form">
            <h2>{language === 'Українська' ? 'Створити Електронний лист' : 'Compose Email'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={language === 'Українська' ? 'Одержувач' : 'Recipient'}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder={language === 'Українська' ? 'Тема' : 'Subject'}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder={language === 'Українська' ? 'Текст повідомлення' : 'Body'}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <button type="submit">{language === 'Українська' ? 'Відправити' : 'Send'}</button>
                <button type="button" onClick={resetEmail}>
                    {language === 'Українська' ? 'Скинути' : 'Reset'}
                </button>
            </form>
        </div>
    );
}
