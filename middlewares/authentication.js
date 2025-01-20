const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");
async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Unauthorized" };
    }

    const token = authorization.split(" ")[1];

    const decoded = verifyToken(token);

    const findUser = await User.findByPk(decoded.id);

    if (!findUser) {
      throw { name: "Unauthorized" };
    }

    req.userId = findUser.id;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
