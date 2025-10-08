import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import { ToastContainer } from 'react-toastify';

function App() {
  return (

      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
  );
}

export default App;