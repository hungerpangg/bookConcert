import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from './allconcerts';

const el=document.getElementById('root');
const root=ReactDOM.createRoot(el);

root.render(
    
<BrowserRouter>
<App/>
</BrowserRouter>);