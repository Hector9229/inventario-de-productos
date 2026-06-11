import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos, deleteProducto } from '../../services/productoService'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getProductos()
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await deleteProducto(id)
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      alert('Error al eliminar: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="loading"><div className="spinner" /> Cargando productos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-msg">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Productos</h1>
        <p>Listado de productos tecnológicos registrados</p>
      </div>

      <div className="actions">
        <Link to="/productos/agregar" className="btn">+ Nuevo Producto</Link>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>No hay productos registrados aún.</p>
                  </div>
                </td>
              </tr>
            ) : (
              productos.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.nombre}</strong></td>
                  <td>{p.categoria}</td>
                  <td><strong>${Number(p.precio).toFixed(2)}</strong></td>
                  <td>{p.cantidad}</td>
                  <td>
                    <span className={`estado-badge ${p.estado}`}>{p.estado}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/productos/editar/${p.id}`} className="link-btn edit">Editar</Link>
                      <button className="link-btn delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
