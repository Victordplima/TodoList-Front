<template>
  <div>
    <q-btn @click="openModal" label="Nova Tarefa" color="primary" class="q-mb-md" />

    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Criar Nova Tarefa</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="titulo" label="Título" filled />
          <q-input v-model="descricao" label="Descrição" filled type="textarea" />

          <q-select
            v-model="categoriaSelecionada"
            :options="categorias"
            label="Selecione a Categoria"
            emit-value
            map-options
          />
        </q-card-section>

        <q-card-actions>
          <q-btn @click="closeModal" label="Cancelar" color="secondary" />
          <q-btn @click="criarTarefa" label="Criar" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { postTarefa } from 'src/services/tarefaService'
import { getCategorias } from 'src/services/categoriaService'

export default {
  name: 'CriarTarefa',
  data() {
    return {
      isModalOpen: false,
      titulo: '',
      descricao: '',
      categoriaSelecionada: null,
      categorias: [],
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
      this.loadCategorias()
    },

    closeModal() {
      this.isModalOpen = false
      this.resetForm()
    },

    async loadCategorias() {
      try {
        const response = await getCategorias()
        this.categorias = response.categorias
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    },

    async criarTarefa() {
      if (this.titulo && this.descricao && this.categoriaSelecionada) {
        const tarefa = {
          titulo: this.titulo,
          descricao: this.descricao,
          categoria_id: this.categoriaSelecionada,
        }

        try {
          await postTarefa(tarefa)
          this.closeModal()
        } catch (error) {
          console.error('Erro ao criar tarefa:', error)
        }
      } else {
        alert('Preencha todos os campos!')
      }
    },

    resetForm() {
      this.titulo = ''
      this.descricao = ''
      this.categoriaSelecionada = null
    },
  },
}
</script>

<style scoped>
.q-dialog {
  max-width: 400px;
}
</style>
