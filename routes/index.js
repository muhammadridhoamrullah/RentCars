const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

// List of available endpoints:​

// POST /login

router.post("/login", Controller.login);

// And routes below need authentication
router.use(authentication);

// POST /add-user
router.post("/add-user", Controller.addUser);

// GET /cars
// GET /cars/:id
// POST /cars
// GET /types
// POST /types
router.get("/cars", Controller.getCars);
router.get("/cars/:id", Controller.getCarById);
router.post("/cars", Controller.addCar);
router.get("/types", Controller.getTypes);
router.post("/types", Controller.addType);

// And routes below need authorization

// PUT /cars/:id
// DELETE /cars/:id

router.put("/cars/:id", authorization, Controller.updateCar);
// router.delete("/cars/:id", Controller.deleteCar);

// Public routes (no auth needed):

// GET /pub/cars
// GET /pub/cars/:id

// router.get("/pub/cars", Controller.getPubCars);
// router.get("/pub/cars/:id", Controller.getPubCarById);

module.exports = {
  router,
};
