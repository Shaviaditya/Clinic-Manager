import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchComponent from './components/SearchComponent.jsx';
import AddUserPage from './components/AddUserPage.tsx';
import UserDetails from './components/UserDetails.tsx';
import MedicalReceipt from './components/MedicalReciept.tsx'
import NavBar from './components/NavBar.js';


const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<SearchComponent />} />
          <Route exact path="/add-user" element={<AddUserPage />} />
          <Route exact path="/users/:id" element={<UserDetails />} />
          <Route path="/users/medical-receipt/:id" element={<MedicalReceipt />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
