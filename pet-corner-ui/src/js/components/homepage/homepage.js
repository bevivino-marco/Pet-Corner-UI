import React from "react";

function Homepage({ setContent }) {
  return (
    <div className="homepage-container">
      <img className="logo" src="logo.png" alt="Pet Corner" />
      <div className="button-container">
        <button
          className="btn btn-outline-dark"
          onClick={() => setContent("Adozione")}
        >
          ANIMALI DA ADOZIONE
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setContent("Pet Therapy")}
        >
          ANIMALI DA TERAPIA
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setContent("Pet Sitter")}
        >
          PET SITTERS
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setContent("Training")}
        >
          PET TRAINERS
        </button>
      </div>
    </div>
  );
}

export default Homepage;
