const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Car, Type } = require("../models/index");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "EMAIL_PASSWORD_INVALID" };
      }

      const checkPassword = comparePassword(password, findUser.password);

      if (!checkPassword) {
        throw { name: "EMAIL_PASSWORD_INVALID" };
      }

      const access_token = signToken({
        id: findUser.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { email, password, role } = req.body;

      const newUser = await User.create({
        email,
        password,
        role,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCars(req, res, next) {
    try {
      const allCars = await Car.findAll({
        include: [
          Type,
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  static async getCarById(req, res, next) {
    try {
      const { id } = req.params;

      const car = await Car.findByPk(id, {
        include: [
          Type,
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  static async addCar(req, res, next) {
    try {
      const {
        name,
        brand,
        price,
        description,
        year,
        transmission,
        imageUrl,
        available,
        TypeId,
      } = req.body;

      const newCar = await Car.create({
        name,
        brand,
        price,
        description,
        year,
        transmission,
        imageUrl,
        available,
        TypeId,
        UserId: req.userId,
      });

      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }

  static async getTypes(req, res, next) {
    try {
      const allTypes = await Type.findAll();

      res.status(200).json(allTypes);
    } catch (error) {
      next(error);
    }
  }

  static async addType(req, res, next) {
    try {
      const { name } = req.body;

      const newType = await Type.create({
        name,
      });

      res.status(201).json(newType);
    } catch (error) {
      next(error);
    }
  }

  static async updateCar(req, res, next) {
    try {
      const { id } = req.params;

      const {
        name,
        brand,
        price,
        description,
        year,
        transmission,
        imageUrl,
        available,
        TypeId,
      } = req.body;

      const findCar = await Car.findByPk(id);

      if (!findCar) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const updatedCar = await Car.update(
        {
          name,
          brand,
          price,
          description,
          year,
          transmission,
          imageUrl,
          available,
          TypeId,
          updatedAt: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Car has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCar(req, res, next) {
    try {
      const { id } = req.params;

      const findCar = await Car.findByPk(id);

      if (!findCar) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const deletedCar = await Car.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Car has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPubCars(req, res, next) {
    try {
      const allCars = await Car.findAll({
        include: [
          Type,
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  static async getPubCarById(req, res, next) {
    try {
      const { id } = req.params;

      const car = await Car.findByPk(id, {
        include: [
          Type,
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  Controller,
};
