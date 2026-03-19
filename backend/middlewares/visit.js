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

module.exports = {
  fetchVisits,
  fetchVisitById,
  fetchVisitsByPetId,
  respondWithVisit,
  deleteVisit,
  createVisit,
  updateVisit
};