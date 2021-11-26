import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateDog = () => {
  const navigate = useNavigate();
  const temps = [];

  return (
    <div>
      <div className="center">
        <button onClick={() => navigate("/dogs")}> Back to dogs</button>
      </div>
      <div className="center">Create a new Dog</div>
      <form className="form">
        {/*name */}
        <label>name</label>
        <input />
        {/*img */}
        <label>img</label>
        <input />
        {/*Peso */}
        <div className="form">
          <label>Peso</label>
          <div className="center">
            <div>
              <label>Min</label>
              <input type="number" />
            </div>
            <div>
              <label>Max</label>
              <input type="number" />
            </div>
          </div>
        </div>
        {/*Altura */}
        <div className="form">
          <label>Altura</label>
          <div className="center">
            <div>
              <label>Min</label>
              <input type="number" />
            </div>
            <div>
              <label>Max</label>
              <input type="number" />
            </div>
          </div>
        </div>
        {/*Temperamento */}
        <select>
          {/*Mapear temps */}
          {temps.map((temp) => (
            <option key={temp.option} value={temp.option}>
              temp
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateDog;
