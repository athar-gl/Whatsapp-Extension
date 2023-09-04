import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './popup.css'; // Import the CSS file

const App = () => {
    return (
        <html lang="en">
        <head>
            <title>Web WhatsApp</title>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <script type="text/javascript" src="js/moment-with-locales.js"></script>
            <script type="text/javascript" src="js/popup.js"></script>

            <link rel="stylesheet" type="text/css" href="css/popup.css" media="all" />
            <link rel="stylesheet" type="text/css" href="css/bootstrap.css" media="all" />
            <link rel="stylesheet" type="text/css" href="css/progressbar.css" media="all" />
        </head>

        <body id="body">
        <div className="container" style={{ width: '380px' }}>
            <div className="form-group row mt-3">
                <label
                    className="col-sm-2 col-form-label text-center"
                    style={{
                        color: 'rgb(58, 189, 159)',
                        fontSize: '1.2rem',
                        fontWeight: '550',
                    }}
                >
                    Chats from WhatsApp Web
                </label>
            </div>

            <div id="main-box" style={{ display: 'none' }}>
                {/* ... Your HTML content here ... */}
            </div>
            <div id="oops-box" className="hidden" style={{ display: 'none' }}>
                <span>OOPs! The active tab doesn't seem to be Whatsapp Web</span>
                <a href="https://web.whatsapp.com/" target="_blank">
                    Open Whatsapp Web
                </a>
            </div>
            <div id="app"></div>
        </div>
        </body>
        </html>
    );
};

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);
ReactDOM.render(<App />, root);
