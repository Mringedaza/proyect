const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'partyfinder'
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos.');
});

module.exports = connection;
