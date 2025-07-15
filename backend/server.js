const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conexión a MongoDB local (asegúrate de tener MongoDB corriendo)
mongoose.connect('mongodb://localhost:27017/tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión:', err));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos (html, css, js, imágenes)
app.use(express.static(path.join(__dirname, '../frontend')));

// Ejemplo de esquema y modelo para usuarios
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Ruta para crear usuario
app.post('/api/usuarios', async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
});

// Ruta principal (opcional, sirve Proyecto.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Proyecto.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});