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
          precio: String(data.precio),
          cantidad: String(data.cantidad),
          estado: data.estado,
        })
      )
      .catch(err => {
        alert('Error al cargar producto: ' + err.message)
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
        precio: parseFloat(form.precio),
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
      <div className="page">
        <div className="loading"><div className="spinner" /> Cargando producto...</div>
      </div>
    )
  }

  if (!form) return null

  return (
    <div className="page">
      <div className="page-header">
        <h1>Editar Producto</h1>
        <p>Actualiza los datos del producto</p>
      </div>

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
                <option value="Laptops">Laptops</option>
                <option value="Monitores">Monitores</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Almacenamiento">Almacenamiento</option>
                <option value="Componentes">Componentes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio ($)</label>
              <input type="number" name="precio" value={form.precio} onChange={handleChange} required step="0.01" min="0" />
            </div>
            <div className="form-group">
              <label>Cantidad</label>
              <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required min="0" />
            </div>
          </div>

          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </form>
      </div>
    </div>
  )
}
