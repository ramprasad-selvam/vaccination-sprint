const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
  }

  connect() {
    if (this.db === null) {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error("Database connection failed:", err.message);
        } else {
          console.log(" Connected to SQLite database.");
        }
      });
    }
  }

  run(query, params = [], callback = () => {}) {
    if (!this.db) {
      console.error("Database is not connected.");
      return;
    }
    this.db.run(query, params, function (err) {
      if (err) {
        console.error("Error executing query:", err.message);
      } else {
        callback(this);
      }
    });
  }

  all(query, params = [], callback) {
    if (!this.db) {
      console.error("Database is not connected.");
      return;
    }
    this.db.all(query, params, (err, rows) => {
      if (err) {
        console.error("Error fetching rows:", err.message);
        callback(null, err);
      } else {
        callback(rows, null);
      }
    });
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error("Error closing the database:", err.message);
        } else {
          console.log(" Database connection closed.");
        }
      });
    }
  }
}

module.exports = Database;
