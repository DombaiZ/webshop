import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://localhost:5001/api";

const UjTipusForm = () => {
  const [megnevezes, setMegnevezes] = useState("");
  const [leiras, setLeiras] = useState("");
  const [kepek, setKepek] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const ujTipus = { megnevezes, leiras, kepek };
    
    try {
      await axios.post(`${API_BASE_URL}/UjTipusok`, ujTipus);
      alert("Új típus sikeresen hozzáadva!");
      navigate("/");
    } catch (error) {
      console.error("Hiba a létrehozásnál:", error);
      setError("Hiba történt az eszköztípus létrehozásakor.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Új típus hozzáadása</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Megnevezés" value={megnevezes} onChange={e => setMegnevezes(e.target.value)} className="border p-2 mb-2 block w-full" required />
        <textarea placeholder="Leírás" value={leiras} onChange={e => setLeiras(e.target.value)} className="border p-2 mb-2 block w-full" required />
        <input type="text" placeholder="Kép URL (opcionális)" value={kepek} onChange={e => setKepek(e.target.value)} className="border p-2 mb-2 block w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mentés</button>
      </form>
    </div>
  );
};

export default UjTipusForm;
