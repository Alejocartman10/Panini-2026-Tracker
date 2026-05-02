import { useState, useCallback } from "react";

// --- BASE DE DATOS DE LÁMINAS ---
const STICKER_DB = [
  { id: "00", name: "Panini Logo", team: "Especial" },
  { id: "FWC-1", name: "Emblema Oficial 1/2", team: "Especial" },
  { id: "FWC-2", name: "Emblema Oficial 2/2", team: "Especial" },
  { id: "FWC-3", name: "Mascotas Oficiales", team: "Especial" },
  { id: "FWC-4", name: "Slogan Oficial", team: "Especial" },
  { id: "FWC-5", name: "Balón Oficial", team: "Especial" },
  { id: "FWC-6", name: "Canadá (País Anfitrión)", team: "Especial" },
  { id: "FWC-7", name: "México (País Anfitrión)", team: "Especial" },
  { id: "FWC-8", name: "USA (País Anfitrión)", team: "Especial" }
];

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>⚽ Mi Álbum Panini 2026</h1>
      <p>¡Lista de láminas lista para trackear!</p>
      <ul>
        {STICKER_DB.map(s => (
          <li key={s.id}>{s.id} - {s.name} ({s.team})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
