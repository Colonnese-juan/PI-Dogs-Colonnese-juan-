import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs } from "./actions";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CreateDog from "./pages/CreateDog";
import Logo from "./components/Logo";
import React from "react";

function App() {
  const dispatch = useDispatch();

  //Pedido inicial de los perros
  React.useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className="App">
      <Logo />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/dogs" element={<Home />} />
          <Route exact path="/dogs/:id" element={<Detail />} />
          <Route exact path="/dogs/create" element={<CreateDog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
