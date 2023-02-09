import { createRoot } from 'react-dom/client';
import App from './components/App';
import './assets/scss/site.scss';
import ReactGA from 'react-ga';
import { BrowserRouter as Router } from 'react-router-dom';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  ReactGA.initialize('UA-252635806-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
);
