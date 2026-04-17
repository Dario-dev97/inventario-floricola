const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express(); // 👈 PRIMERO esto
const PORT = process.env.PORT || 3000;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

// 👇 SERVIR ARCHIVOS
app.use(express.static(__dirname));

// 👇 FORZAR QUE / CARGUE index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Crear tabla si no existe
pool.query(
  `
  CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre_flor VARCHAR(100),
  cantidad INT,
  precio NUMERIC,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
`)
.then(() => console.log("Tabla productos lista"))
.catch(err => console.error("Error creando tabla:", err));

pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    rol VARCHAR(20) DEFAULT 'empleado'
  );
`)
.then(() => console.log("Tabla usuarios lista"))
.catch(err => console.error("Error creando usuarios:", err));

pool.query(`
  ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
`);

// GET productos
app.get('/productos', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM productos');
  res.json(resultado.rows);
});

// POST producto
app.post('/productos', async (req, res) => {
  const { nombre_flor, cantidad, precio } = req.body;

  const resultado = await pool.query(
  'INSERT INTO productos (nombre_flor, cantidad, precio, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *',
  [nombre_flor, cantidad, precio]
);


  res.json(resultado.rows[0]);
});

// DELETE producto
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    'DELETE FROM productos WHERE id = $1',
    [id]
  );

  res.json({ mensaje: 'Producto eliminado' });
});

// PUT producto
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_flor, cantidad, precio } = req.body;

  await pool.query(
    'UPDATE productos SET nombre_flor=$1, cantidad=$2, precio=$3 WHERE id=$4',
    [nombre_flor, cantidad, precio, id]
  );

  res.json({ mensaje: 'Producto actualizado' });
});

// REGISTRO DE USUARIO
app.post('/registro', async (req, res) => {
  const { username, password, rol } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (username, password, rol) VALUES ($1, $2, $3) RETURNING *',
      [username, password, rol || 'empleado']
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Usuario ya existe' });
  }
});

// Servidor
app.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});

