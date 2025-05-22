const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'b5egfcyu38ao00c4vlnz-mysql.services.clever-cloud.com',
  user: 'uu6x7l7zmqu4jtp0',
  password: 'SxQhzLMXUo5MYJ2n0Kln',
  database: 'b5egfcyu38ao00c4vlnz'
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

