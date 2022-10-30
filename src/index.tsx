import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import 'react-notifications/lib/notifications.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);
