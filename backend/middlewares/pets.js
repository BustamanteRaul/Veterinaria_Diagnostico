const connection = require("../connection");

function fetchPets(req, res, next) {
  connection.query("SELECT * FROM pets", (error, results) => {
    if (error) {
      return next(error);
    }
    req.pet = results;
    next();
  });
}

function fetchPetById(req, res, next) {
  const PetId = req.params.id
  const sql = "SELECT * FROM pets WHERE id_pet = ?"
  
  connection.query(sql, PetId, (err, results) => {
    if (err) return next(err);
    
    if (!results.length) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    req.pet = results[0];
    next();
  });
}

function fetchPetsByOwnerId(req, res, next) {
  const OwnerId = req.params.id
  const sql = "SELECT * FROM pets WHERE owner_id = ?"
  
  connection.query(sql, OwnerId, (err, results) => {
    if (err) return next(err);
    
    if (!results.length) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    req.pet = results;
    next();
  });
}


function deletePet(req, res, next) {
  const PetId = req.params.id
  const sql = "DELETE FROM pets WHERE id_pet = ?"
  
  connection.query(sql, PetId, (err, results) => {
    if (err) return next(err);
    
    if (!results.length) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    req.pet = results;
    next();
  });
}

function respondWithPet(req, res) {
  res.json(req.pet);
}

module.exports = {
  fetchPets,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePet,
  respondWithPet,
  createPet,
  updatePet
};