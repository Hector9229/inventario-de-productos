import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../services/productoService'

export default function Home() {
  const [total, setTotal] = useState(null)
  const [activos, setActivos] = useState(null)
  const [enReparacion, setEnReparacion] = useState(null)
  const [dañados, setDañados] = useState(null)

  useEffect(() => {
    getProductos().then(data => {
      setTotal(data.length)
      setActivos(data.filter(p => p.estado === 'activo').length)
      setEnReparacion(data.filter(p => p.estado === 'en-reparacion').length)
      setDañados(data.filter(p => p.estado === 'dañado').length)
    }).catch(() => {})
  }, [])

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <h1 className="hero-title">Sistema de Gestión</h1>
        <p className="hero-subtitle">Centro de control para equipamiento técnico</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card-modern">
          <div className="stat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="/icons.svg#icon-package" /></svg>
          </div>
          <div className="stat-value">{total ?? '—'}</div>
          <div className="stat-label">Equipos registrados</div>
        </div>
        <div className="stat-card-modern">
          <div className="stat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="/icons.svg#icon-check" /></svg>
          </div>
          <div className="stat-value">{activos ?? '—'}</div>
          <div className="stat-label">Equipos activos</div>
        </div>
        <div className="stat-card-modern">
          <div className="stat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="/icons.svg#icon-repair" /></svg>
          </div>
          <div className="stat-value">{enReparacion ?? '—'}</div>
          <div className="stat-label">Equipos en reparación</div>
        </div>
        <div className="stat-card-modern">
          <div className="stat-icon-wrapper broken">
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="/icons.svg#icon-broken" /></svg>
          </div>
          <div className="stat-value">{dañados ?? '—'}</div>
          <div className="stat-label">Equipos dañados</div>
        </div>
      </div>

      <section className="quick-action">
        <h3>Administración</h3>
        <p>Mantén el control total de tu equipo para eventos. Administra tu inventario de forma rápida y sencilla para que nada te falte en cada ocasión.</p>
        <Link to="/productos" className="card-link">Ir a Equipos</Link>
      </section>
    </div>
  )
}
