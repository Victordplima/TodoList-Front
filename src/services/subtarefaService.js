import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + '/subtarefas'

export const getSubtarefas = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao carregar subtarefas:', error)
    throw error
  }
}

export const postSubtarefa = async (subtarefa) => {
  try {
    const response = await axios.post(API_URL, subtarefa)
    return response.data
  } catch (error) {
    console.error('Erro ao criar subtarefa:', error)
    throw error
  }
}

export const putSubtarefa = async (id, atualizacao) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, atualizacao)
    return response.data
  } catch (error) {
    console.error('Erro ao editar subtarefa:', error)
    throw error
  }
}

export const deleteSubtarefa = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir subtarefa:', error)
    throw error
  }
}
