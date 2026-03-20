const connection = require("../connection");

function fetchOwners(req, res, next) {
  connection.query("SELECT * FROM owner", (err, results) => {
    if (err) return next(err);
    req.owner = results
    next();
  });
}

function fetchOwnerById(req, res, next) {
  const OwnerId = req.params.id
  const sql = "SELECT * FROM owner WHERE id_owner = ?"
  
  connection.query(sql, OwnerId, (err, results) => {
    if (err) return next(err);
    
    if (!results.length) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    req.owner = results[0];
    next();
  });
}

function createOwner(req, res, next) {
  const { name, phone } = req.body;
  const sql = "INSERT INTO owner (name, phone, creation_date) VALUES (?, ?, NOW())";
  
  connection.query(sql, [name, phone], (err, result) => {
    if (err) return next(err);
    
    req.owner = { id_owner: result.insertId, name, phone, creation_date: result.creation_date };
    next();
  });
}

//revisar
function updateOwner(req, res, next) {
  const { name, phone } = req.body;
  const OwnerId = req.params.id;
  const sql = "UPDATE owner SET name = ?, phone = ? WHERE id_owner = ?";
  
  connection.query(sql, [name, phone, OwnerId], (err, result) => {
    if (err) return next(err);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    req.owner = { id_owner: OwnerId, name, phone };
    next();
  });
}

function deleteOwner(req, res, next) {
  const OwnerId = req.params.id;
  const sql = "DELETE FROM owner WHERE id_owner = ?";
  
  connection.query(sql, OwnerId, (err, result) => {
    if (err) return next(err);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    
    req.owner = { id_owner: OwnerId };
    next();
  });
}

function respondWithOwner(req, res, next) {
  res.json(req.owner);
}

module.exports = {
  fetchOwners,
  fetchOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
  respondWithOwner,
};