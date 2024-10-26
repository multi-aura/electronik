import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import './Reset.css';
import { UserProvider } from './contexts/UserContext';
function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;

