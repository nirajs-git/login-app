const db = require('../db'); // Create a MySQL connection and export it as 'db'

function createUser(name, email, password, callback) {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err) => {
    callback(err);
  });
}

function authenticateUser(email, password, callback) {
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.length > 0 ? results[0] : null);
    }
  });
}

module.exports = { createUser, authenticateUser };
