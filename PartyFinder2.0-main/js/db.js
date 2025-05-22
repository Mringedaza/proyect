require('dotenv').config(); // primero, carga las variables de entorno
console.log('DATABASE_URL:', process.env.DATABASE_URL); // luego puedes imprimirla

const mysql = require('mysql2');

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('❌ DATABASE_URL no está definida. Revisa tu archivo .env');
}

const connection = mysql.createConnection(dbUrl);

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

module.exports = connection;


