const app = require("./app");

const {
  fetchOwners, respondWithOwners
} = require("./middlewares/owner");

app.get('/owners', fetchOwners, respondWithOwners)