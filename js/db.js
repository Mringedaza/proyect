require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mainline.proxy.rlwy.net',
  port: 16166,                      // Puerto de Railway
  user: 'root',                      // Usuario de la base
  password: 'HjLnsDeJfdCgVXAFiftqEUFwDWiUkwly',         // Contraseña
  database: 'railway'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
