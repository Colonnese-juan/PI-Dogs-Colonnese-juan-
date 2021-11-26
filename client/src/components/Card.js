import React from "react";

function Card({ name, image, temperament, weight, lifeSpan, id }) {
  return (
    <div className="card-dog">
      <div className="center">
        <img src={image} alt={name} widht="100px" height="200px" />
      </div>
      <h3 className="title">{name}</h3>
      <h5 className="temps">{temperament}</h5>
      <h5 className="weight">{weight} kg</h5>
      <h5 className="life_span">{lifeSpan}</h5>
    </div>
  );
}

export default Card;
