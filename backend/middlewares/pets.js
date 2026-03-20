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
//Esta funcion podria incluir algun tipo de verificacion para que el id dado sea correspondiente a algun owner existente, pero ppr ahora veo como solucion mas sencilla y valida el poner esta limitacion desde el frontend con la manera de insertar los datos, en este caso con un dropdown
function createPet(req, res, next) {
  const { owner_id, name, species, breed, sex, birth_date, weight, notes } = req.body;
  const sql = "INSERT INTO pets ( owner_id, name, species, breed, sex, birth_date, weight, notes ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  connection.query(sql, [ owner_id, name, species, breed, sex, birth_date, weight, notes ], (err, result) => {
    if (err) return next(err);
    
    req.pet = { id_pet: result.insertId,  owner_id, name, species, breed, sex, birth_date, weight, notes };
    next();
  });
}

function updatePet(req, res, next) {
  const PetId = req.params.id;
  const { owner_id, name, species, breed, sex, birth_date, weight, notes } = req.body;
  const sql = "UPDATE pets SET owner_id = ?, name = ?, species = ?, breed = ?, sex = ?,  birth_date = ?, weight = ?, notes = ? WHERE id_pet = ?";
  
  connection.query(sql, [owner_id, name, species, breed, sex, birth_date, weight, notes, PetId], (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.affectedRows) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    req.pet = { id_pet: results.insertId,  owner_id, name, species, breed, sex, birth_date, weight, notes };
    next()
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