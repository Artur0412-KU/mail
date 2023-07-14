import React from "react";
import ReactDOM from "react-dom";

export default function Navigation({ setActivePage }) {
    return (
        <div className="btn-container">
            <button onClick={() => setActivePage('inbox')}>Inbox</button>
            <button onClick={() => setActivePage('sent')}>Sent</button>
        </div>
    );
}
