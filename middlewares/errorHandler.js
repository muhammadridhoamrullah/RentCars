function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors[0] });
  } else if (err.name === "DATA_NOT_FOUND") {
    res.status(404).json({ message: "Data not found" });
  } else if (err.name === "EMAIL_PASSWORD_REQUIRED") {
    res.status(400).json({ message: "Email and password required" });
  } else if (err.name === "EMAIL_PASSWORD_INVALID") {
    res.status(400).json({ message: "Invalid email or password" });
  } else if (err.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.name === "FORBIDDEN") {
    res.status(403).json({ message: "You have no access" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  errorHandler,
};
