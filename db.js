const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_yogini',
  password: '?v2k%cN4aH#mT!B',
  database: 'freedb_login_app',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to Database..!');
});

module.exports = db;
