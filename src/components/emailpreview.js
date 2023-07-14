import React from "react";
import ReactDOM from "react-dom";

export default function EmailPreview({ email }) {
    return (
        <div>
            <h3>{email.subject}</h3>
            <p>From: {email.sender}</p>
            <p>{email.body}</p>
        </div>
    );
}
