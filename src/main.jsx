import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

axios.defaults.baseURL = location.href;
if(import.meta.env.DEV){
  axios.defaults.baseURL = "http://localhost:3000"
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
