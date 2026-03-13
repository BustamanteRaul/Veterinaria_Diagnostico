const connection = require("../connection");

function fetchOwners(req, res, next) {
  connection.query("SELECT * FROM owner", (err, results) => {
    if (err) return next(err);
    req.owner = results
    next();
  });
}

function respondWithOwners(req, res, next) {
  res.json(req.owner);
}

module.exports = {
  fetchOwners,
  respondWithOwners
};