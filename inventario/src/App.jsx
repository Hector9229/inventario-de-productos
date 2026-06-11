import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Breadcrumb from './components/Breadcrumb'
import Home from './pages/Home'
import Productos from './pages/productos/Productos'
import Agregar from './pages/productos/Agregar'
import Editar from './pages/productos/Editar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/agregar" element={<Agregar />} />
        <Route path="/productos/editar/:id" element={<Editar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
