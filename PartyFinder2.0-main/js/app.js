const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./db');

const app = express();
const PORT = 3000;

// Configura CORS para permitir peticiones desde cualquier origen (puedes ajustar)
app.use(cors());

// Middleware para parsear datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON si usas JSON en peticiones
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname, '..')));

// Ruta GET para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
}); 

// Ruta POST para registrar usuario (datos recibidos desde el formulario)

const bcrypt = require('bcrypt'); 

app.post('/registro', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Faltan datos requeridos');
  }

  db.query(
    'SELECT * FROM usuarios WHERE username = ? OR email = ?',
    [username, email],
    async (err, results) => {
      if (err) {
        console.error('Error en la consulta SELECT:', err);
        return res.status(500).send('Error en la base de datos');
      }

      if (results.length > 0) {
        return res.status(409).send('El usuario o email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO usuarios (username, email, contrasena) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Error en la consulta INSERT:', err);
            return res.status(500).send('Error al registrar usuario');
          }

          res.status(200).send('Usuario registrado con éxito');
        }
      );
    }
  );
});


// Ruta POST para el login de usuario 
// Ruta POST para login real desde base de datos
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).send('Error en la base de datos');
    }

    if (results.length === 0) {
      return res.status(401).send('Correo no registrado');
    }

    const user = results[0];
    const passwordCorrecta = await bcrypt.compare(password, user.contrasena);

    if (!passwordCorrecta) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Login exitoso
    res.status(200).send('Login exitoso');
  });
});







// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});




