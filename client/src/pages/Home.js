import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDogs } from "../actions";
import Card from "../components/Card";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allDogs = useSelector((state) => state.dogs);
  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPP = 8;
  const indexOfLastDog = currentPage * dogsPP; //1*8
  const indexOfFirstDog = indexOfLastDog - dogsPP;
  const [currentDogs, setCurrentDogs] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  // funcion para siempre setear el el array de perros filtrado y respetando el paginado
  const handleSetDogs = (dogs) => {
    setCurrentDogs(dogs.slice(indexOfFirstDog, indexOfLastDog));
  };

  // Limite de paginas
  const maxPages = allDogs.length / dogsPP;

  //Funcion para ir a la pagina individual del perro "get DEtails"
  const goToDogsDetails = (idDog) => navigate(`/dogs/${idDog}`);

  //Funcion para buscar perros en el input
  const searchDogs = () => {
    setFilter("all");
    dispatch(getDogs(search));
  };

  //Ordenar perros en orden ascendete=alfabeticamente
  function sortAlfAsc(x, y) {
    if (x.name > y.name) {
      return -1;
    }
    return 0;
  }
  //Ordenar perros en orden descendete=alfabeticamente
  function sortAlfDes(x, y) {
    if (x.name < y.name) {
      return -1;
    }
    return 0;
  }

  //Ordenar perros en orden ascendete=peso
  function sortWeightDes(x, y) {
    const weightA = x.weight.split(" - ");
    const weightB = y.weight.split(" - ");

    const pesoA = parseInt(weightA[0]);
    const pesoB = parseInt(weightB[0]);
    if (pesoA < pesoB) {
      return -1;
    }
    return 0;
  }

  //Ordenar perros en orden ascendete=peso
  function sortWeightAsc(x, y) {
    const weightA = x.weight.split(" - ");
    const weightB = y.weight.split(" - ");

    const pesoA = parseInt(weightA[0]);
    const pesoB = parseInt(weightB[0]);
    if (pesoA > pesoB) {
      return -1;
    }
    return 0;
  }

  // useEffect que actualiza los perros cuando se actualiza el filtro  y el paginado
  useEffect(() => {
    if (filter === "weightDes") {
      const dogs = allDogs.sort(sortWeightDes);
      handleSetDogs(dogs);
    }

    if (filter === "weightAsc") {
      const dogs = allDogs.sort(sortWeightAsc);
      handleSetDogs(dogs);
    }

    if (filter === "alfAsc") {
      const dogs = allDogs.sort(sortAlfAsc);
      handleSetDogs(dogs);
    }
    if (filter === "alfDes") {
      const dogs = allDogs.sort(sortAlfDes);
      handleSetDogs(dogs);
    }

    if (filter === "all") {
      handleSetDogs(allDogs);
    }
  }, [filter, currentPage, allDogs]);

  //Setea el filtro
  const updateFilter = (e) => {
    setFilter(e.target.value);
  };

  //aumenta el paginado
  const updgradePage = () => {
    if (currentPage <= maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //resta al paginado
  const downgradePage = () => {
    if (currentPage > 1 && currentPage <= maxPages) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Vuelve todo el filtro por default
  const resetAll = () => {
    setFilter("all");
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="filters">
        <button onClick={() => navigate("/dogs/create")}>
          Create a new dog
        </button>
      </div>
      <div className="filters">
        <div>
          <h5>Peso</h5>
          <select onChange={updateFilter}>
            <option value="weightAsc">weight asc</option>
            <option value="weightDes">weight des</option>
          </select>
        </div>
        <div>
          <h5>Alfabetico</h5>
          <select onChange={updateFilter}>
            <option value="alfAsc">alfabetico asc</option>
            <option value="alfDes">alfabetico des</option>
          </select>
        </div>
        <div>
          <h5>Fuente</h5>
          <select>
            <option value="apiBreed">ApiBreed</option>
            <option value="createBreed">CreatedBreed</option>
            <option value="all">all</option>
          </select>
        </div>
      </div>
      <div className="filters">
        <div>
          <label>Search dogs</label>
          <input onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => searchDogs(search)} className="btn-search">
            Search
          </button>
        </div>
        <div>
          <button className="btn" onClick={resetAll}>
            Reset Filter
          </button>
        </div>
      </div>
      <div className="filters">
        <button onClick={downgradePage}>{"<"}</button>
        <div>{currentPage}</div>
        <button onClick={updgradePage}>{">"}</button>
      </div>
      {currentDogs &&
        currentDogs.map((c) => {
          return (
            <>
              <Card
                key={c.id}
                id={c.id}
                name={c.name}
                image={c.img}
                temperament={c.temp}
                weight={c.weight}
                lifeSpan={c.life_span}
              />
              <button onClick={() => goToDogsDetails(c.id)}>See dog</button>
            </>
          );
        })}
    </div>
  );
}
