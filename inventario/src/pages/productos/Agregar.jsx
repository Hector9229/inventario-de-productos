import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProducto } from '../../services/productoService'

export default function Agregar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    precio: '',
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
        precio: parseFloat(form.precio),
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
    <div className="page">
      <div className="page-header">
        <h1>Agregar Producto</h1>
        <p>Completa los campos para registrar un nuevo producto</p>
      </div>

      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre <span className="hint">— nombre del producto</span></label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej. Laptop Pro 15" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required>
                <option value="">Seleccionar...</option>
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
              <input type="number" name="precio" value={form.precio} onChange={handleChange} required placeholder="0.00" step="0.01" min="0" />
            </div>
            <div className="form-group">
              <label>Cantidad</label>
              <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required placeholder="0" min="0" />
            </div>
          </div>

          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </form>
      </div>
    </div>
  )
}
