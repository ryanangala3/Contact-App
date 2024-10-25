import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactsTable from "./components/ContactsTable"
import ContactsFocusPage from "./components/ContactsFocusPage"
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<ContactsTable />} />
        <Route path="/:email" element={<ContactsFocusPage />} />
      </Routes>
    </Router>
  );
};

export default App;
