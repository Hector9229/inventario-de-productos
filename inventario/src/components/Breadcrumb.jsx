import { Link, useLocation } from 'react-router-dom'

const labels = {
  productos: 'Equipos',
  agregar: 'Agregar',
  editar: 'Editar',
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = [{ path: '/', label: 'Inicio' }]

  segments.reduce((acc, segment, i) => {
    if (/^\d+$/.test(segment)) return acc
    const path = `/${segments.slice(0, i + 1).join('/')}`
    const label = labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    crumbs.push({ path, label })
    return path
  }, '')

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb-content">
        <ol>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={crumb.path}>
                {isLast ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <>
                    <Link to={crumb.path}>{crumb.label}</Link>
                    <span className="breadcrumb-separator">/</span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
