const { User, Type, Car } = require("../models/index");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    const find = await Car.findByPk(id, {
      include: User,
    });
    console.log(find.User, "ini find author");

    const findUser = await User.findByPk(req.userId);
    console.log(findUser, "ini find user di author");

    if (!find) {
      throw { name: "DATA_NOT_FOUND" };
    }

    if (
      find.UserId === req.userId ||
      findUser.role === "Admin" ||
      findUser.role === "Staff"
    ) {
      next();
    } else {
      console.log("kena");

      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
};
