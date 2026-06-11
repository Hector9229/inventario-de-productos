import { supabase } from '../supabase'

const TABLE = 'productos'

export async function getProductos() {
  const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: true })
  if (error) throw error
  return data
}

export async function getProducto(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createProducto(producto) {
  const { data, error } = await supabase.from(TABLE).insert([producto]).select()
  if (error) throw error
  return data[0]
}

export async function updateProducto(id, producto) {
  const { data, error } = await supabase.from(TABLE).update(producto).eq('id', id).select()
  if (error) throw error
  return data[0]
}

export async function deleteProducto(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
