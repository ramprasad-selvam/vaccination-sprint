const crypto = require("crypto");
const { asyncQuery } = require("../libs/lib");
const { encrypt, decrypt } = require("../libs/crypto");
const { setAuth } = require("../libs/auth");
const Database = require("../libs/db");
const db = new Database("./database.db");
db.connect();
module.exports = {
  getUser: function (req, res) {
    const { id } = req.params;
    db.all("SELECT * FROM users", [], (rows, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        rows.map((row) => {
          row.email = decrypt(row.email);
          row.mobile = decrypt(row.mobile);
          row.password = decrypt(row.password);
        });
        res.json(rows);
      }
    });
  },
  setUser: async function (req, res) {
    const { email, password, mobile, role } = req.body;
    const checkexsisting = await asyncQuery(
      db,
      "SELECT id FROM users WHERE email = ? OR mobile = ?",
      [encrypt(email), encrypt(mobile)]
    );
    if (checkexsisting.length) {
      return res.status(400).json({ error: "User already exists" });
    }
    const query =
      "INSERT INTO users (email, mobile, password, type) VALUES (?, ?, ?, ?)";
    db.run(
      query,
      [encrypt(email), encrypt(mobile), encrypt(password), role],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({
            message: "User created successfully",
            userId: this.lastID,
          });
        }
      }
    );
  },

  updateUser: function (req, res) {
    db.all("SELECT * FROM users", [], (rows, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  },

  checkUser: function (req, res) {
    const { email, mobile, password } = req.body;
    db.all(
      "SELECT * FROM users WHERE (email=? OR mobile=?) AND password=?",
      [encrypt(email), encrypt(mobile), encrypt(password)],
      (rows, err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          const jsonString = crypto.randomBytes(32).toString("hex");
          setAuth(jsonString, { id: rows[0].id, t: Date.now() });
          res.json(rows);
        }
      }
    );
  },

  getDashboard: function (req, res) {
    const { id } = req.params;
    db.all("SELECT * FROM log WHERE patientId=?", [id], (rows, err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  },
  setDashboard: function (req, res) {
    const { email, password, mobile, role } = req.body;
    const query =
      "INSERT INTO log (patientId,providerId,vaccineId,confirmedDate,actualDate) VALUES (?, ?, ?, ?)";
    db.run(
      query,
      [patientId, providerId, vaccineId, confirmedDate, actualDate],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({
            message: "User created successfully",
            userId: this.lastID,
          });
        }
      }
    );
  },
};
