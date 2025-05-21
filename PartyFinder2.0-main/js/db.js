const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_party',
  password: '8!P5QC&Y!fnv23@',
  database: 'freedb_partyfinder'
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
