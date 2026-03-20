const connection = require("../connection");

function fetchVisits(req, res, next) {
  connection.query("SELECT * FROM visit", (error, results) => {
    if (error) {
      return next(error);
    }
    req.visit = results;
    next();
  });
}

function fetchVisitById(req, res, next) {
  const VisitId = req.params.id;
  const sql = "SELECT * FROM visit WHERE id_visit = ?"
  
  connection.query(sql, VisitId, (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.length) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    req.visit = results[0];
    next();
  });
}

function fetchVisitsByPetId(req, res, next) {
  const PetId = req.params.id;
  const sql = "SELECT * FROM visit WHERE pet_id = ?"
  
  connection.query(sql, PetId, (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.length) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    req.visit = results;
    next();
  });
}

function respondWithVisit(req, res) {
  res.json(req.visit);
}

function deleteVisit(req, res, next) {
  const VisitId = req.params.id;
  const sql = "DELETE FROM visit WHERE id_visit = ?"

  connection.query(sql, VisitId, (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.affectedRows) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.status(204).end();
  });
}

function createVisit(req, res, next) {
  const { pet_id, visit_date, reason, notes } = req.body;
  const sql = "INSERT INTO visit (pet_id, visit_date, reason, notes) VALUES (?, ?, ?, ?)";
  
  connection.query(sql, [pet_id, visit_date, reason, notes], (err, result) => {
    if (err) return next(err);
    
    req.visit = { id_visit: result.insertId, pet_id, visit_date, reason, notes };
    next();
  });
}

function updateVisit(req, res, next) {
  const VisitId = req.params.id;
  const { pet_id, visit_date, reason, notes } = req.body;
  const sql = "UPDATE visit SET pet_id = ?, visit_date = ?, reason = ?, notes = ? WHERE id_visit = ?";
  
  connection.query(sql, [pet_id, visit_date, reason, notes, VisitId], (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.affectedRows) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    req.visit = { id_visit: results.insertId, pet_id, visit_date, reason, notes };
    next();
  });
}

module.exports = {
  fetchVisits,
  fetchVisitById,
  fetchVisitsByPetId,
  respondWithVisit,
  deleteVisit,
  createVisit,
  updateVisit
};