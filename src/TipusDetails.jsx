import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://localhost:5001/api";

const TipusDetails = () => {
  const { id } = useParams();
  const [tipus, setTipus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Tipusok/${id}`)
      .then(response => {
        setTipus(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Hiba a lekérdezésnél:", error);
        setError("Hiba történt az adatok lekérésekor.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!tipus) return <p>Nincs ilyen eszköztípus.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{tipus.megnevezes}</h2>
      {tipus.kepek && <img src={tipus.kepek} alt={tipus.megnevezes} className="mt-2" />}
      <p className="mt-2">{tipus.leiras}</p>
    </div>
  );
};

export default TipusDetails;
