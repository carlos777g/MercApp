import React, { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutView.css';

export default function CheckoutView() {
  const { carrito, setCarrito } = useCartContext();
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState({
    calle: '',
    ciudad: '',
    estado: '',
    cod_postal: '',
    pais: '',
  });

  const [metodoPago, setMetodoPago] = useState('');
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    vencimiento: '',
    titular: '',
    cvv: '',
  });

  const handleComprar = () => {
    if (
      !direccion.calle || !direccion.ciudad || !direccion.estado ||
      !direccion.cod_postal || !direccion.pais || !metodoPago ||
      !tarjeta.numero || !tarjeta.vencimiento || !tarjeta.titular || !tarjeta.cvv
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    const productosComprados = [...carrito];
    const diasEntrega = Math.floor(Math.random() * 5) + 1;
    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + diasEntrega);

    const pedido = {
      productos: productosComprados,
      direccion,
      metodoPago,
      fechaEntrega: fechaEntrega.toDateString(),
      estatus: "En preparación"
    };

    // Guardamos el pedido en localStorage
    localStorage.setItem("pedidoCliente", JSON.stringify(pedido));

    // Limpiar carrito
    setCarrito([]);

    alert('¡Compra realizada con éxito!');

    // Redirige a ReviewView
    setTimeout(() => {
      navigate('/review', { state: { productos: productosComprados } });
    }, 100);
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-2">Finalizar compra</h2>

      {/* Dirección */}
      <div className="mb-3">
        <label className="form-label">Calle y No.</label>
        <input className="form-control" value={direccion.calle} onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Ciudad</label>
        <input className="form-control" value={direccion.ciudad} onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Estado</label>
        <input className="form-control" value={direccion.estado} onChange={(e) => setDireccion({ ...direccion, estado: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Código Postal</label>
        <input className="form-control" value={direccion.cod_postal} onChange={(e) => setDireccion({ ...direccion, cod_postal: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">País</label>
        <input className="form-control" value={direccion.pais} onChange={(e) => setDireccion({ ...direccion, pais: e.target.value })} />
      </div>

      {/* Método de Pago */}
      <div className="mb-3">
        <label className="form-label">Tipo de Tarjeta</label>
        <select className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
          <option value="">Selecciona una</option>
          <option value="credito">Tarjeta de Crédito</option>
          <option value="debito">Tarjeta de Débito</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Número de Tarjeta</label>
        <input className="form-control" value={tarjeta.numero} onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Vencimiento</label>
        <input className="form-control" placeholder="MM/AA" value={tarjeta.vencimiento} onChange={(e) => setTarjeta({ ...tarjeta, vencimiento: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Nombre del Titular</label>
        <input className="form-control" value={tarjeta.titular} onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label">CVV</label>
        <input className="form-control" value={tarjeta.cvv} onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })} />
      </div>

      <button className="btn btn-success mt-3" onClick={handleComprar}>
        Confirmar compra 🛍️
      </button>
    </div>
  );
}
