import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/style.css"
import "./assets/css/index.css"
//import "./assets/css/responsive.css"
import "./responsive.css"
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css"

import TimeAgo from 'javascript-time-ago'
import ca from "javascript-time-ago/locale/ca.json"

TimeAgo.addDefaultLocale(ca);
TimeAgo.addLocale(ca);


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
