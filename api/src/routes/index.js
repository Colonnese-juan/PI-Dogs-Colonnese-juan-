const { Router } = require("express");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Breeds, Temps } = require(`../db`);

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      img: el.image.url,
      name: el.name,
      temp: el.temperament,
      weight: el.weight.metric,
      life_span: el.life_span,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Breeds.findAll({
    include: {
      model: Temps,
      atributes: [`name`],
      through: {
        atributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

router.get(`/Dogs`, async (req, res) => {
  const dog = req.query.name;

  const dogsTotal = await getAllDogs();

  console.log(dog);
  if (dog) {
    console.log("entre");
    console.log(dog);
    // console.log(dogsTotal);
    const dogsName = dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(dog.toLowerCase())
    );
    // console.log(dogsName);
    !!dogsName
      ? res.status(200).send(dogsName)
      : res.status(404).send("dog is not found");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get(`/Dogs`, async (req, res) => {
  const body = req.query.temperament;
  const tempsTotal = await getAllDogs();
  console.log(body);
  // console.log(tempsTotal);
  if (body) {
    const tempsName = tempsTotal.filter((el) => {
      const arrTemps = el["temp"] ? el["temp"].split(", ") : [];
      if (arrTemps.includes(body)) return true;
    });
    !!tempsName
      ? res.status(200).send(tempsName)
      : res.status(404).send("temperament is not found");
  } else {
    res.status(200).send(tempsTotal);
    console.log("no entro");
  }
});

router.post("/Dogs", async (req, res) => {
  let { name, temp, minWeight, maxWeight, image, life_span } = req.body;
  let weight = minWeight + " / " + maxWeight;
  let createdByMe = true;
  const newDog = await Breeds.create({
    name,
    img,
    temp,
    weight,
    life_span,
    createdByMe,
  });
  newDog
    ? res.status(200).send(newDog)
    : res.status(404).send("no dog created");
});

module.exports = router;
