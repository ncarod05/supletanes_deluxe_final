import React from "react";

function formatCLP(num) {
  return "$" + num.toLocaleString("es-CL");
}

const Carrito = ({ cart, setCart }) => {
  const handleCantidad = (idx, value) => {
    const nuevaCantidad = Math.max(1, Number(value));
    setCart(cart =>
      cart.map((item, i) =>
        i === idx ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const handleEliminar = idx => {
    setCart(cart => cart.filter((_, i) => i !== idx));
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleCompra = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    alert('Compra realizada con éxito 🎉');
    setCart([]);
  };

  return (
    <main>
      <div className="container my-5">
        <h2 className="mb-4 text-center">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-center text-muted">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={item.nombre}>
                      <td>{item.nombre}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          className="form-control form-control-sm cantidad"
                          onChange={e => handleCantidad(idx, e.target.value)}
                        />
                      </td>
                      <td>{formatCLP(item.precio)}</td>
                      <td className="subtotal">{formatCLP(item.precio * item.cantidad)}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm btn-eliminar"
                          onClick={() => handleEliminar(idx)}
                          aria-label={`Eliminar ${item.nombre}`}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="table-secondary">
                    <th colSpan="3" className="text-end">Total:</th>
                    <th id="totalCarrito">{formatCLP(total)}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="text-end">
              <button id="btnComprar" className="btn btn-success btn-lg" onClick={handleCompra}>
                Realizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Carrito;