import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + '/tarefas'

export const getTarefas = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
    throw error
  }
}

export const postTarefa = async (tarefa) => {
  try {
    const response = await axios.post(API_URL, tarefa)
    return response.data
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
    throw error
  }
}

export const putTarefa = async (id, atualizacao) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, atualizacao)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    throw error
  }
}

export const deleteTarefa = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
    throw error
  }
}
