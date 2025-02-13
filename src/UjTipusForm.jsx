import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">
          <i className="bi bi-plus-circle me-2"></i>Új típus hozzáadása
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Megnevezés</label>
            <input
              type="text"
              className="form-control"
              placeholder="Megnevezés"
              value={megnevezes}
              onChange={(e) => setMegnevezes(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Leírás</label>
            <textarea
              className="form-control"
              placeholder="Leírás"
              value={leiras}
              onChange={(e) => setLeiras(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Kép URL (opcionális)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Kép URL"
              value={kepek}
              onChange={(e) => setKepek(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-check-circle me-2"></i>Mentés
          </button>
        </form>
      </div>
    </div>
  );
};

export default UjTipusForm;
