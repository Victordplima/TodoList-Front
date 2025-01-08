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
    const response = await axios.post(API_URL, {
      titulo: tarefa.titulo, // Obrigatório
      descricao: tarefa.descricao || '', // Opcional
      categorias: tarefa.categorias || [], // Array de IDs das categorias (máximo 3)
    })

    return response.data // Retorna os dados da tarefa criada
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)

    if (error.response) {
      // Exibe mensagens detalhadas baseadas no erro HTTP
      console.error('Detalhes do erro:', error.response.data)
    }

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
