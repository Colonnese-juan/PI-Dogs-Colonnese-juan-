import React from "react";

export default function Paginado(dogsPP, allDogs, setCurrentPage, currentPage) {
  const PageNumber = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPP); i++) {
    PageNumber.push(i + 1);
  }

  const updgradePage = () => {
    setCurrentPage((prevState) => prevState++);
  };

  const downgradePage = () => {
    setCurrentPage((prevState) => prevState--);
  };

  return (
    <div className="filters">
      <button onClick={downgradePage}>{"<"}</button>
      <div>{currentPage}</div>
      <button onClick={updgradePage}>{">"}</button>
    </div>
  );
}
