import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos, deleteProducto } from '../../services/productoService'

const categorias = ['Todos', 'Estructura', 'Luces', 'Sonido', 'Herramientas', 'Mobiliario', 'Cables', 'Esquineros']
const estados = [
  { value: 'Todos', label: 'Todos los estados' },
  { value: 'activo', label: 'Activo' },
  { value: 'en-reparacion', label: 'En reparación' },
  { value: 'dañado', label: 'Dañado' },
]

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getProductos()
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const productosFiltrados = productos
    .filter(p => filtroCategoria === 'Todos' || p.categoria === filtroCategoria)
    .filter(p => filtroEstado === 'Todos' || p.estado === filtroEstado)

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este equipo?')) return
    try {
      await deleteProducto(id)
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      alert('Error al eliminar: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading"><div className="spinner" /> Cargando equipos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-msg">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <h1 className="hero-title">Inventario de Equipos</h1>
        <p className="hero-subtitle">Listado de equipos para eventos de sonido</p>
      </header>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/productos/agregar" className="btn">+ Nuevo Equipo</Link>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-h)' }}
        >
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-h)' }}
        >
          {estados.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  <div className="empty-state">
                    <p>No hay equipos registrados con esos filtros.</p>
                  </div>
                </td>
              </tr>
            ) : (
              productosFiltrados.map(p => {
                const estadoLabels = {
                  'activo': 'Activo',
                  'en-reparacion': 'En reparación',
                  'dañado': 'Dañado',
                }
                return (
                  <tr key={p.id}>
                    <td><strong>{p.nombre}</strong></td>
                    <td>{p.categoria}</td>
                    <td>{p.cantidad}</td>
                    <td>
                      <span className={`estado-badge ${p.estado}`}>{estadoLabels[p.estado] || p.estado}</span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <Link to={`/productos/editar/${p.id}`} className="link-btn edit">Editar</Link>
                        <button className="link-btn delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
