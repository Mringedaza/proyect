require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./js/db');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 8080;
const transporter = require('./js/correo'); 

// Configura CORS para permitir peticiones desde cualquier origen (puedes ajustar)
app.use(cors());

// Middleware para parsear datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON si usas JSON en peticiones
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Ruta GET para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}); 









// Ruta POST para registrar usuario (datos recibidos desde el formulario)
app.post('/registro', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Faltan datos requeridos');
  }

  // Validar si ya existe en `usuarios` o `registro_pendiente`
  db.query(
  'SELECT * FROM usuarios WHERE email = ?',
  [email],
  async (err, users) => {
    if (err) return res.status(500).send('Error en la base de datos');

    if (users.length > 0) {
      return res.status(409).send('El email ya está registrado');
    }

      /*db.query(
        'SELECT * FROM registro_pendiente WHERE email = ?',
        [email],
        async (err2, pendientes) => {
          if (err2) return res.status(500).send('Error validando pendientes');

          if (pendientes.length > 0) {
            return res.status(409).send('Ya se ha iniciado un registro con este correo');
          }

          // Hashear contraseña y generar código
          const hashedPassword = await bcrypt.hash(password, 10);
          const codigo = crypto.randomInt(100000, 999999).toString();

          // Guardar en tabla temporal
          db.query(
            'INSERT INTO registro_pendiente (username, email, contrasena, codigo_verificacion) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, codigo],
            (err3) => {
              if (err3) {
                console.error(err3);
                return res.status(500).send('Error guardando registro pendiente');
              }

              // Enviar código por correo
              const mailOptions = {
                from: 'partyfinder@gmail.com',
                to: email,
                subject: 'Código de verificación',
                text: `Tu código de verificación es: ${codigo}`
              };

              transporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) {
                  console.error('Error enviando correo:', mailErr);
                  return res.status(500).send('No se pudo enviar el código');
                }

                res.status(200).send('Código enviado. Verifica tu correo para completar el registro');
              });
            }
          );
        }
      );*/

       const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar directamente en la tabla usuarios
      db.query(
        'INSERT INTO usuarios (username, email, contrasena, verificado) VALUES (?, ?, ?, 1)',
        [username, email, hashedPassword],
        (insertErr) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).send('Error al crear usuario');
          }

          res.status(200).send('Usuario registrado correctamente');
        }
      );
    }
  );
});





/*Verificacion registro 
app.post('/verificar-codigo', (req, res) => {
  const { email, codigo } = req.body;

  db.query(
    'SELECT * FROM registro_pendiente WHERE email = ? ORDER BY creado_en DESC LIMIT 1',
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error del servidor');
      }

      if (results.length === 0) {
        return res.status(404).send('No hay un registro pendiente para este correo');
      }

      const usuarioPendiente = results[0];

      if (usuarioPendiente.codigo_verificacion.toString().trim() === codigo.toString().trim()) {
        db.query(
          'INSERT INTO usuarios (username, email, contrasena, verificado) VALUES (?, ?, ?, 1)',
          [usuarioPendiente.username, usuarioPendiente.email, usuarioPendiente.contrasena],
          (insertErr) => {
            if (insertErr) {
              console.error('Error insertando en usuarios:', insertErr);
              return res.status(500).send('No se pudo completar el registro');
            }

            db.query(
              'DELETE FROM registro_pendiente WHERE email = ?',
              [email],
              () => {
                res.status(200).send('Registro completado con éxito. Ya puedes iniciar sesión');
              }
            );
          }
        );
      } else {
        return res.status(401).send('Código incorrecto');
      }
    }
  );
});
*/














// Ruta POST para el login de usuario 
// Ruta POST para login real desde base de datos

app.post('/login', (req, res) => { 
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).send('Error en la base de datos');
      if (results.length === 0) return res.status(401).send('Correo no registrado');

      const user = results[0];
      const passwordCorrecta = await bcrypt.compare(password, user.contrasena);

      if (!passwordCorrecta) {
        return res.status(401).send('Contraseña incorrecta');
      }

      res.status(200).send('Inicio de sesion correcto');
    }
  );
});



app.get('/api/perfil/:id', async (req, res) => {
    const userId = req.params.id;

    const [rows] = await db.query('SELECT username FROM usuarios WHERE id = ?', [userId]);

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
});




// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});





