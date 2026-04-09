const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432,
});

app.get('/productos', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM public.productos');
  res.json(resultado.rows);
});

app.post('/productos', async (req, res) => {
  const { nombre_flor, cantidad, precio } = req.body;

  const resultado = await pool.query(
    'INSERT INTO productos (nombre_flor, cantidad, precio) VALUES ($1, $2, $3) RETURNING *',
    [nombre_flor, cantidad, precio]
  );

  res.json(resultado.rows[0]);
});

app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    'DELETE FROM public.productos WHERE id = $1',
    [id]
  );

  res.json({ mensaje: 'Producto eliminado' });
});
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_flor, cantidad, precio } = req.body;

  await pool.query(
    'UPDATE productos SET nombre_flor=$1, cantidad=$2, precio=$3 WHERE id=$4',
    [nombre_flor, cantidad, precio, id]
  );

  res.json({ mensaje: 'Producto actualizado' });
});

app.listen(3000, () => {
  console.log('Servidor funcionando en puerto 3000');
});