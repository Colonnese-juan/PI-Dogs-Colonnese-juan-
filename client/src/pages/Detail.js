import React from "react";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogs } from "../actions";

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allDogs = useSelector((state) => state.dogs);
  const [dog, setDog] = React.useState({});
  //Pedido inicial de los perros
  React.useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  React.useEffect(() => {
    if (allDogs) {
      const newDog = allDogs.filter((d) => d.id === parseInt(id));
      console.log(newDog[0]);
      setDog(newDog[0]);
    }
  }, [allDogs, id]);

  return (
    <div className="center">
      {console.log(dog)}
      {dog ? (
        <div>Loading...</div>
      ) : (
        <>
          {dog && (
            <Card
              name={dog.name}
              image={dog.img}
              temperament={dog.temp}
              weight={dog.weight}
              lifeSpan={dog.life_span}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
