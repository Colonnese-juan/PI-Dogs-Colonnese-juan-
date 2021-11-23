import React from "react";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div>
      <img src={image} alt="img is not found" widht="200px" height="250px" />
      <h3>{name}</h3>
      <h5>{temperament}</h5>
      <h5>{weight}</h5>
    </div>
  );
}
