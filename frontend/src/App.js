import React, { useEffect, useState } from 'react';
import logo from './logo.png';



function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState('');
const [password, setPassword] = useState('');
const [logueado, setLogueado] = useState(false);

const productosBajos = productos.filter(item => item.cantidad < 50).length;
const productoCaro = Math.max(...productos.map(item => Number(item.precio)));
const mayorStock = Math.max(...productos.map(item => Number(item.cantidad)));


const totalStock = productos.reduce((acc, item) => acc + item.cantidad, 0);


const iniciarSesion = () => {
  if (usuario === 'admin' && password === '1234') {
    setLogueado(true);
  } else {
    alert('Usuario o contraseña incorrectos');
  }
};

  const valorTotal = productos.reduce(
  (total, producto) => total + Number(producto.cantidad) * Number(producto.precio),
  0
);


  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

if (!logueado) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login Inventario</h2>

      <input
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        style={{ margin: '10px', padding: '8px' }}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '8px' }}
      />

      <br />

      <button onClick={iniciarSesion}>
        Entrar
      </button>
    </div>
  );
}


  return ( 
    
    <div div style={{
  padding: '30px',
  fontFamily: 'Arial',
  backgroundColor: '#fffaf0',
  minHeight: '100vh' }}>
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <img 
    src={logo}
    alt="Logo DC"
    style={{
      width: '170px',
      borderRadius: '25px'
    }}
  />

  <h2 style={{ margin: '10px 0 0 0', color: '#1b3a57' }}>
    Sistema Inventario Florícola
  </h2>

</div>


      <h1 style={{ color: 'green' }}>🌷 Inventario Florícola</h1>
<div style={{
  display: 'flex',
  gap: '20px',
  marginBottom: '30px',
  flexWrap: 'wrap'
}}>

  <div style={{
    backgroundColor: '#d4edda',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}>
    <h3>Total productos</h3>
    <p>{productos.length}</p>
  </div>

  <div style={{
    backgroundColor: '#d1ecf1',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}>
    <h3>Stock total</h3>
    <p>{totalStock}</p>
  </div>

  <div style={{
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}>
    <h3>Valor inventario</h3>
    <p>{valorTotal.toFixed(2)}</p>
  </div>
<div style={{
  backgroundColor: '#f8d7da',
  padding: '15px',
  borderRadius: '10px',
  minWidth: '180px'
}}>
  <h3>Productos críticos</h3>
  <p>{productosBajos}</p>
</div>
<div style={{
  backgroundColor: '#d1ecf1',
  padding: '15px',
  borderRadius: '10px',
  minWidth: '180px'
}}>
  <h3>Precio más alto</h3>
  <p>{productoCaro}</p>
</div>
<div style={{
  backgroundColor: '#fff3cd',
  padding: '15px',
  borderRadius: '10px',
  minWidth: '180px'
}}>
  <h3>Mayor stock</h3>
  <p>{mayorStock}</p>
</div>
</div>
<div style={{
  backgroundColor: '#FFC100',
  padding: '15px',
  borderRadius: '10px',
  minWidth: '180px'
}}>
  <h3>Fecha actual</h3>
  <p>{new Date().toLocaleDateString()}</p>
</div>
<table>
  
</table>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={nombre}
          placeholder="Nombre flor"
          onChange={(e) => setNombre(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        />

        <input
          value={cantidad}
          placeholder="Cantidad"
          onChange={(e) => setCantidad(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        />

        <input
          value={precio}
          placeholder="Precio"
          onChange={(e) => setPrecio(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        />
        

        <button
          style={{
            margin: '5px',
  padding: '10px 20px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'

            
          }}
          onClick={() => {
            fetch('http://localhost:3000/productos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nombre_flor: nombre,
                cantidad,
                precio
              })
            })
            .then(() => fetch('http://localhost:3000/productos'))
            .then(res => res.json())
            .then(data => {
              setProductos(data);
              setNombre('');
              setCantidad('');
              setPrecio('');
            })
          }}
        >
          Guardar
        </button>
        <input
  value={busqueda}
  placeholder="Buscar flor"
  onChange={(e) => setBusqueda(e.target.value)}
  style={{ margin: '10px', padding: '8px' }}
/>
<button
  style={{
    margin: '10px',
    padding: '8px',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  }}
  onClick={() => {
    const ordenados = [...productos].sort((a, b) => a.precio - b.precio);
    setProductos(ordenados);
  }}
>
  Ordenar por precio
</button>

      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#d4edda' }}>
            <th>Flor</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          {productos
  .filter(producto =>
    producto.nombre_flor.toLowerCase().includes(busqueda.toLowerCase())
  )
  .map(producto => (
            <tr key={producto.id}>
  <td>{producto.nombre_flor}</td>
  <td style={{
  color: producto.cantidad < 60 ? 'red' : 'green',
  fontWeight: 'bold'
}}>
  {producto.cantidad}
</td>
  <td>{producto.precio}</td>
 <td>{new Date(producto.fecha).toLocaleDateString()}</td>
  <td>
    <button
  style={{
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px'
  }}
  onClick={() => {
    if (window.confirm('¿Seguro que deseas eliminar esta flor?')) {
      fetch(`http://localhost:3000/productos/${producto.id}`, {
        method: 'DELETE'
      })
      .then(() => fetch('http://localhost:3000/productos'))
      .then(res => res.json())
      .then(data => setProductos(data))
    }
  }}
>
  Eliminar
</button>
  </td>
  <td>
  <button 
  
  style={{
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  marginRight: '5px',
  borderRadius: '5px'

}}
  
  onClick={() => {
    const nuevoNombre = prompt('Nuevo nombre', producto.nombre_flor);
    const nuevaCantidad = prompt('Nueva cantidad', producto.cantidad);
    const nuevoPrecio = prompt('Nuevo precio', producto.precio);

    fetch(`http://localhost:3000/productos/${producto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_flor: nuevoNombre,
        cantidad: nuevaCantidad,
        precio: nuevoPrecio
      })
    })
    .then(() => fetch('http://localhost:3000/productos'))
    .then(res => res.json())
    .then(data => setProductos(data))
  }}>
    Editar
    
  </button>
</td>
</tr>
          ))}
        </tbody>
      </table>


<p style={{
  marginTop: '50px',
  textAlign: 'center',
  fontSize: '14px',
  color: 'black'
}}>
  Desarrollado por DC © 2026
</p>

</div>
);
}

export default App;