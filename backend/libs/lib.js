function asyncQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch((err) => {
    return err;
  });
}
module.exports = { asyncQuery };
