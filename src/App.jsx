// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ScrapeManagement from './pages/ScrapeManagement';
import EmailManagement from './pages/EmailManagement';
import EmailSending from './pages/EmailSending';
import GoogleAuth from './pages/GoogleAuth';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';
import GmailConnect from './pages/GmailConnect';
import GmailWorkspaceConnect from './pages/GmailWorkspaceConnect';
import EmailCountList from './pages/EmailCountList';


    // { to: '/oauth2/callback', label: 'Authorize your Email'}
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
      <UserProvider>
         <Routes>
          <Route path="/auth" element={<GoogleAuth />} />
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/scrape" element={<PrivateRoute><ScrapeManagement/></PrivateRoute>} />
          <Route path="/emails" element={<PrivateRoute><EmailManagement/></PrivateRoute>} />
          <Route path="/send" element={<PrivateRoute><EmailSending/></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/oauth2/callback" element={<PrivateRoute><GmailConnect/></PrivateRoute>}/>
          <Route path="/oauth2/Myapp/callback" element={<PrivateRoute><GmailWorkspaceConnect/></PrivateRoute>}/>
          <Route path="/history" element={<PrivateRoute><EmailCountList/></PrivateRoute>}/>
        </Routes>
      </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;