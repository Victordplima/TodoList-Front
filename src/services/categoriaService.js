import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + '/categorias'

export const getCategorias = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
    throw error
  }
}

export const postCategoria = async (categoria) => {
  try {
    const response = await axios.post(API_URL, categoria)
    return response.data
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    throw error
  }
}

export const putCategoria = async (id, categoriaAtualizada) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoriaAtualizada)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    throw error
  }
}

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)
    throw error
  }
}

export const addCategoriasToTarefa = async (tarefaId, categoriaIds) => {
  try {
    const response = await axios.post(`/api/tarefas/${tarefaId}/categorias`, {
      categorias: categoriaIds,
    })
    return response.data
  } catch (error) {
    console.error('Erro ao adicionar categorias à tarefa:', error)
    throw error
  }
}
