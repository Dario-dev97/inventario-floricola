import React, { useEffect, useState } from 'react';
import './App.css';
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
const API = "https://inventario-floricola.onrender.com/productos";


const productosBajos = productos.filter(item => item.cantidad < 50).length;
const productoCaro = productos.length > 0
  ? Math.max(...productos.map(item => Number(item.precio)))
  : 0;

const mayorStock = productos.length > 0
  ? Math.max(...productos.map(item => Number(item.cantidad)))
  : 0;


const totalStock = productos.reduce((acc, item) => acc + item.cantidad, 0);


  const iniciarSesion = () => {

  // VALIDACIÓN FUERTE
  if (usuario.trim() === '' || password.trim() === '') {
    alert("Ingresa usuario y contraseña");
    return;
  }

  fetch('https://inventario-floricola.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: usuario,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.usuario) {
      setLogueado(true);
    } else {
      alert('Credenciales incorrectas');
    }
  })
  .catch(() => {
    alert('Error conectando con el servidor');
  });
};
const registrarUsuario = () => {

  if (usuario.trim() === '' || password.trim() === '') {
    alert("Completa los datos");
    return;
  }

  fetch('https://inventario-floricola.onrender.com/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: usuario,
      password: password,
      rol: 'empleado'
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Usuario creado correctamente");
  })
  .catch(() => {
    alert("Error al registrar");
  });
};

  const valorTotal = productos.reduce(
  (total, producto) => total + Number(producto.cantidad) * Number(producto.precio),
  0
);


  useEffect(() => {
    fetch('https://inventario-floricola.onrender.com/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

if (!logueado) {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Sistema Inventario Florícola</h2>

        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={iniciarSesion}>
          Entrar
        </button>

        <button onClick={registrarUsuario}>
  Crear cuenta
</button>
      </div>
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
<p style={{ color: '#555', marginTop: '10px' }}>
  📅 {new Date().toLocaleDateString()}
</p>
</div>


      <h1 style={{ color: 'green' }}>🌷 Inventario Florícola</h1>
<div 
  className="dashboard" 
>

   <div className="card" style={{
    backgroundColor: '#d4edda'
  }}>
    
    <h3>Total productos</h3>
    <p>{productos.length}</p>
  </div>

  <div  className="card" style={{
    backgroundColor: '#d4edda'
  }}>
    <h3>Stock total</h3>
    <p>{totalStock}</p>
  </div>

  <div className="card" style={{ backgroundColor: '#d4edda' }}>
    <h3>Valor inventario</h3>
    <p>{valorTotal.toFixed(2)}</p>
  </div>
<div  className="card" style={{ backgroundColor: '#d4edda' }}>
  <h3>Productos críticos</h3>
  <p>{productosBajos}</p>
</div>
<div className="card" style={{ backgroundColor: '#d4edda' }}>
  <h3>Precio más alto</h3>
  <p>{productoCaro}</p>
</div>
<div  className="card" style={{ backgroundColor: '#d4edda' }}>
  <h3>Mayor stock</h3>
  <p>{mayorStock}</p>
</div>
</div>

<table>
  
</table>
      <div style={{
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}}>
        <input
          value={nombre}
          placeholder="Nombre flor"
          onChange={(e) => setNombre(e.target.value)}
          style={{  margin: '5px',
  padding: '10px',
  width: '300px',
  borderRadius: '8px',
  border: '1px solid #ccc' }}
          className="input-form"
        />

        <input
          value={cantidad}
          placeholder="Cantidad"
          onChange={(e) => setCantidad(e.target.value)}
          style={{ margin: '5px',
  padding: '10px',
  width: '300px',
  borderRadius: '8px',
  border: '1px solid #ccc' }}
          className="input-form"
        />

        <input
          value={precio}
          placeholder="Precio"
          onChange={(e) => setPrecio(e.target.value)}
          style={{  margin: '5px',
  padding: '10px',
  width: '300px',
  borderRadius: '8px',
  border: '1px solid #ccc' }}
          className="input-form"
        />
        

        <button
  className="btn-guardar"
  style={{
  margin: '10px',
  padding: '10px',
  width: '320px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
}}
  onClick={() => {
    fetch('https://inventario-floricola.onrender.com/productos', {
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
    .then(() => fetch('https://inventario-floricola.onrender.com/productos'))
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
  style={{  margin: '5px',
  padding: '10px',
  width: '300px',
  borderRadius: '8px',
   }}
  className="input-form"
/>
<button
  className="btn-ordenar"
  style={{
  margin: '10px',
  padding: '10px',
  width: '320px',
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
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
 <td>
  {producto.fecha 
    ? new Date(producto.fecha).toLocaleDateString() 
    : "Sin fecha"}
</td>
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
      fetch(`https://inventario-floricola.onrender.com/productos/${producto.id}`, {
        method: 'DELETE'
      })
      .then(() => fetch('https://inventario-floricola.onrender.com/productos'))
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

    fetch(`https://inventario-floricola.onrender.com/productos/${producto.id}`, {
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
    .then(() => fetch('https://inventario-floricola.onrender.com/productos'))
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