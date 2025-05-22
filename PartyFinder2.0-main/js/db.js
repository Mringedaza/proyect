const mysql = require('mysql2');
require('dotenv').config(); // útil si usas .env en desarrollo local

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
    return;
  }
  console.log('✅ Conexión exitosa a Clever Cloud');
});

// Ejemplo de consulta
connection.query('SELECT NOW()', (err, results) => {
  if (err) throw err;
  console.log('Hora actual:', results[0]);
});

