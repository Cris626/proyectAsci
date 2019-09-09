import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//https://firebase.google.com/docs/auth/web/microsoft-oauth

// Browser Router
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter> , document.getElementById('root'));

