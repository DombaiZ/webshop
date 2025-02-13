import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import TipusDetails from "./TipusDetails";
import UjTipusForm from "./UjTipusForm";

const API_BASE_URL = "https://localhost:5001/api";

const TipusokList = () => {
  const [tipusok, setTipusok] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Tipusok`)
      .then(response => setTipusok(response.data))
      .catch(error => console.error("Hiba a listázásnál:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Eszköztípusok</h2>
      <ul>
        {tipusok.map(tipus => (
          <li key={tipus.id} className="mb-2">
            <Link to={`/tipus/${tipus.id}`} className="text-blue-500">{tipus.megnevezes}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => (
  <nav className="p-4 bg-gray-800 text-white flex justify-between">
    <Link to="/" className="font-bold">Főoldal</Link>
    <Link to="/uj-tipus" className="font-bold">Új típus</Link>
  </nav>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TipusokList />} />
        <Route path="/tipus/:id" element={<TipusDetails />} />
        <Route path="/uj-tipus" element={<UjTipusForm />} />
      </Routes>
    </Router>
  );
};

export default App;
