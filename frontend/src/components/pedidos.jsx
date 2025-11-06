import React from "react";

const Pedidos = () => {
  return (
    <>
      <main className="container my-5">
        <h2 className="mb-4 text-center">Historial de Pedidos</h2>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th># Pedido</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#PED-00123</td>
                <td>03/09/2025</td>
                <td>Prostar Whey Protein 5LB</td>
                <td>$59.990</td>
                <td><span className="badge bg-success">Entregado</span></td>
                <td>
                  <a href="/producto_individual" className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye"></i> Ver detalle
                  </a>
                  <a href="/resenas" className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-pencil-square me-1"></i> Dejar reseña
                  </a>
                </td>
              </tr>
              <tr>
                <td>#PED-00124</td>
                <td>01/09/2025</td>
                <td>Multivitamínicos Deluxe</td>
                <td>$11.990</td>
                <td><span className="badge bg-warning text-dark">En tránsito</span></td>
                <td>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye"></i> Ver detalle
                  </button>
                </td>
              </tr>
              <tr>
                <td>#PED-00125</td>
                <td>28/08/2025</td>
                <td>Gold Standard Whey 5LB</td>
                <td>$69.990</td>
                <td><span className="badge bg-secondary">Cancelado</span></td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm" disabled>
                    <i className="bi bi-eye-slash"></i> Sin detalle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Pedidos;