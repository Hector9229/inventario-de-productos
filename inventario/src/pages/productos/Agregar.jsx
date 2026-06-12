import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProducto } from '../../services/productoService'

export default function Agregar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    estado: 'activo',
  })
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      await createProducto({
        nombre: form.nombre,
        categoria: form.categoria,
        cantidad: parseInt(form.cantidad, 10),
        estado: form.estado,
      })
      navigate('/productos')
    } catch (err) {
      alert('Error al guardar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <h1 className="hero-title">Agregar Equipo</h1>
        <p className="hero-subtitle">Completa los campos para registrar un nuevo equipo</p>
      </header>

      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Estructura">Estructura</option>
                <option value="Luces">Luces</option>
                <option value="Sonido">Sonido</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Mobiliario">Mobiliario</option>
                <option value="Cables">Cables</option>
                <option value="Esquineros">Esquineros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange}>
                <option value="activo">Activo</option>
                <option value="en-reparacion">En reparación</option>
                <option value="dañado">Dañado</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required placeholder="0" min="0" />
          </div>

          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Equipo'}
          </button>
        </form>
      </div>
    </div>
  )
}
