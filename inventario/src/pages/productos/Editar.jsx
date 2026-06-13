import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProducto, updateProducto } from '../../services/productoService'

export default function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProducto(id)
      .then(data =>
        setForm({
          nombre: data.nombre,
          categoria: data.categoria,
          cantidad: String(data.cantidad),
          estado: data.estado,
        })
      )
      .catch(err => {
        alert('Error al cargar equipo: ' + err.message)
        navigate('/productos')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      await updateProducto(id, {
        nombre: form.nombre,
        categoria: form.categoria,
        cantidad: parseInt(form.cantidad, 10),
        estado: form.estado,
      })
      navigate('/productos')
    } catch (err) {
      alert('Error al actualizar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading"><div className="spinner" /> Cargando equipo...</div>
      </div>
    )
  }

  if (!form) return null

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <h1 className="hero-title">Editar Equipo</h1>
        <p className="hero-subtitle">Actualiza los datos del equipo</p>
      </header>

      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required maxLength={250} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required>
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
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required min="0" />
          </div>

          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Actualizando...' : 'Actualizar Equipo'}
          </button>
        </form>
      </div>
    </div>
  )
}
