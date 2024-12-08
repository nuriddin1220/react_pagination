import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MetersScreen from './screens/MetersScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MetersScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
