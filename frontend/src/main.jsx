import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import HistoryPage from './pages/HistoryPage/HistoryPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/history" element={<HistoryPage />} />
		</Routes>
	</Router>
  </StrictMode>,
)
