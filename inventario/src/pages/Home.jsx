import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../services/productoService'

export default function Home() {
  const [total, setTotal] = useState(null)
  const [activos, setActivos] = useState(null)

  useEffect(() => {
    getProductos().then(data => {
      setTotal(data.length)
      setActivos(data.filter(p => p.estado === 'activo').length)
    }).catch(() => {})
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Panel de Control</h1>
        <p>Bienvenido al sistema de inventario tecnológico</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon purple">📦</div>
          <div className="stat-value">{total ?? '—'}</div>
          <div className="stat-label">Productos registrados</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-value">{activos ?? '—'}</div>
          <div className="stat-label">Productos activos</div>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Gestión de Productos</h3>
          <p>Administra el catálogo completo de productos tecnológicos: agrega, edita y elimina registros.</p>
          <Link to="/productos">Ir a Productos</Link>
        </div>
      </div>
    </div>
  )
}
