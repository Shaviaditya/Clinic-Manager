import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import AddUserPage from './components/AddUserPage';
import UserDetails from './components/UserDetails';
import MedicalReceipt from './components/MedicalReciept.tsx'
import NavBar from './components/NavBar';


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
