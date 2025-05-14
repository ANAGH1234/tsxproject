import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css';
import './assets/css/article.css';
import './assets/css/labs.css';

import './assets/css/meeting.css';

import './assets/css/paymentdetails.css';

import './assets/css/player.css';

import './assets/css/ProfileDetails.css';
import './assets/css/quicknote.css';
import './assets/css/spinner.css';
import './assets/css/test.css';
import './assets/css/training.css';
import './assets/css/user-theme.css';
import './assets/css/video.css';

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
