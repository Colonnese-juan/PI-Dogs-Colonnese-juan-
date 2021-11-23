import React from "react";
import { usestate, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  //para q no se recargue innecesariamente
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <Link to="/Dogs">Create Dog</Link>
      <h1>aaaaaaa</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        recargar dogs
      </button>
      <div>
        <select>
          <option value="weightAsc">weight asc</option>
          <option value="weightDes">weight des</option>
        </select>
        <select>
          <option value="alfAsc">alfabetico asc</option>
          <option value="alfDes">alfabetico des</option>
        </select>
        <select>
          <option value="apiBreed">ApiBreed</option>
          <option value="createBreed">CreatedBreed</option>
          <option value="all">all</option>
        </select>
        {allDogs &&
          allDogs.map((el) => {
            return (
              <Card
                name={el.name}
                image={el.image}
                temperament={el.temperament}
                weight={el.weight}
              />
            );
          })}
      </div>
    </div>
  );
}
