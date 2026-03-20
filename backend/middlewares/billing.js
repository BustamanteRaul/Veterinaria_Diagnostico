const connection = require("../connection");

function fetchBills(req, res, next) {
  connection.query("SELECT * FROM billing", (error, results) => {
    if (error) {
      return next(error);
    }
    req.bill = results;
    next();
  });
}

function fetchBillById(req, res, next) {
  const BillId = req.params.id;
  const sql = "SELECT * FROM billing WHERE id_payment = ?";

  connection.query(sql, BillId, (err, results) => {
    if (err) return next(err);

    if (!results.length) {
      return res.status(404).json({ error: "Payment not found" });
    }

    req.bill = results[0];
    next();
  });
}

function fetchBillByVisitId(req, res, next) {
  const VisitId = req.params.id;
  const sql = "SELECT * FROM billing WHERE visit_id = ?";

  connection.query(sql, VisitId, (err, results) => {
    if (err) return next(err);

    if (!results.length) {
      return res.status(404).json({ error: "Payment not found" });
    }

    req.bill = results[0];
    next();
  });
}

function deleteBill(req, res, next) {
  const BillId = req.params.id;
  const sql = "DELETE FROM billing WHERE id_payment = ?";

  connection.query(sql, BillId, (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.affectedRows) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(204).end();
  });
}

function createBill(req, res, next) {
  const { visit_id, amount, payment_date, paid } = req.body;
  const sql = "INSERT INTO billing (visit_id, amount, payment_date, paid) VALUES (?, ?, ?, ?)";

  connection.query(sql, [visit_id, amount, payment_date, paid], (err, result) => {
    if (err) return next(err);

    req.bill = { id_payment: result.insertId, visit_id, amount, payment_date, paid };
    next();
  });
}

function updateBill(req, res, next) {
  const BillId = req.params.id;
  const { visit_id, amount, payment_date, paid } = req.body;
  const sql = "UPDATE billing SET visit_id = ?, amount = ?, payment_date = ?, paid = ? WHERE id_payment = ?";

  connection.query(sql, [visit_id, amount, payment_date, paid, BillId], (error, results) => {
    if (error) {
      return next(error);
    }
    if (!results.affectedRows) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    req.bill = { id_payment: results.insertId, visit_id, amount, payment_date, paid };
    next();
  });
}

function respondWithBill(req, res) {
  res.json(req.bill);
}

module.exports = {
  fetchBills,
  fetchBillById,
  respondWithBill,
  fetchBillByVisitId,
  deleteBill,
  createBill,
  updateBill
};
