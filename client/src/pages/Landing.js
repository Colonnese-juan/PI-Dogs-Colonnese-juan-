import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const goToDogs = () => navigate("/dogs");

  return (
    <div>
      <h1>Welcome to Dogs App</h1>
      <div className="center">
        <button className="btn-home" onClick={goToDogs}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Landing;
