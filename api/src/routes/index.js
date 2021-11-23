const { Router } = require("express");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Breeds, Temps } = require(`../db`);
// const { QueryTypes } = require("sequelize/types");
// const { Op } = require("sequelize");
//  Importar todos los routers;
//  Ejemplo: const authRouter = require('./auth.js');

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
      temperament: el.temperament,
      weight: el.weight.metric,
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
  const dog = req.body.name;
  const dogsTotal = await getAllDogs();

  if (dog) {
    console.log("entre");
    console.log(dog);
    console.log(dogsTotal);
    const dogsName = dogsTotal.find(
      (el) => el.name.toLowerCase() === dog.toLowerCase()
    );
    console.log(dogsName);
    // const dogsName = await dogsTotal.filter((el) =>
    //   el.name.toLowerCase().includes(dog.toLowerCase())
    // );
    //  console.log(dogsName);
    !!dogsName
      ? res.status(200).send(dogsName)
      : res.status(404).send("dog is not found");
  } else {
    res.status(200).send(dogsTotal);
  }
});

// router.get("/Dogs/:id", async (req, res) => {
//   const id = req.params.id;
//   let dogsIdTotal = await getAllDogs();
//   console.log(dogsIdTotal);
//   if (id) {
//     const dogId = await dogsIdTotal.filter((el) => el.id === id);
//     dogId.lenght !== 0
//       ? res.status(200).json(dogId)
//       : res.status(404).send("no se encontro ese id");
//   }
// });
//
////////////////   POST   ///////////////////
//

// async function postDog(req, res) {
//   try {
//     const { name, height, weight, life_span, image, temperaments } = req.body;
//     if (name && height && weight) {
//       console.log(temperaments);
//       if (temperaments) {
//         //BUSCO LOS TEMPERAMENTOS EN LA DB PARA VINCULARLOS
//         var arrayOfTempers = [];
//         for (let i = 0; i < temperaments.length; i++) {
//           const temper = await Temps.findOne({
//             where: {
//               name: {
//                 [Op.iLike]: `%${temperaments[i]}%`,
//               },
//             },
//             atributes: ["id", "name"],
//           });
//           arrayOfTempers.push(temper);
//         }
//       }

//       const id = uuidv4();
//       const dog = await Dog.create({
//         id,
//         name,
//         height,
//         weight,
//         life_span,
//         image,
//         createdByMe: true,
//       });
//       for (let i of arrayOfTempers) {
//         console.log(i.name);
//         dog.setTemperaments(i);
//       }
//       res.send(dog);
//     } else {
//       res.sendStatus(400);
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// }

// router.post("/Dogs", postDog);

module.exports = router;
