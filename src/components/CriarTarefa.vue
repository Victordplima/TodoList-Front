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
          <q-input v-model="descricao" label="Descrição (opcional)" filled type="textarea" />

          <q-select
            v-model="categoriasSelecionadas"
            :options="categorias"
            label="Selecione as Categorias"
            multiple
            option-value="id"
            option-label="nome"
            filled
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="closeModal" label="Cancelar" color="secondary" />
          <q-btn @click="criarTarefa" label="Criar" color="primary" :disable="isLoading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { postTarefa } from 'src/services/tarefasService'
import { getCategorias } from 'src/services/categoriaService'
import { Notify } from 'quasar'

export default {
  name: 'CriarTarefa',
  data() {
    return {
      isModalOpen: false,
      titulo: '',
      descricao: '',
      categoriasSelecionadas: [],
      categorias: [],
      isLoading: false,
    }
  },
  methods: {
    async openModal() {
      this.isModalOpen = true
      await this.loadCategorias()
    },

    closeModal() {
      this.isModalOpen = false
      this.resetForm()
    },

    async loadCategorias() {
      try {
        const response = await getCategorias()
        this.categorias = response.categorias || []
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    },

    async criarTarefa() {
      if (this.titulo) {
        const novaTarefa = {
          titulo: this.titulo,
          descricao: this.descricao || '',
          categorias: this.categoriasSelecionadas.map((categoria) => categoria.id) || '',
        }

        try {
          const tarefaCriada = await postTarefa(novaTarefa)
          this.$emit('tarefa-criada', tarefaCriada)
          Notify.create({ type: 'positive', message: 'Tarefa criada com sucesso!' })
          this.closeModal()
        } catch (error) {
          console.error('Erro ao criar tarefa:', error)
          Notify.create({
            type: 'negative',
            message: 'Erro ao criar tarefa. Por favor, tente novamente.',
          })
        }
      } else {
        Notify.create({ type: 'warning', message: 'O título é obrigatório!' })
      }
    },

    resetForm() {
      this.titulo = ''
      this.descricao = ''
      this.categoriasSelecionadas = []
    },
  },
}
</script>

<style scoped>
.q-card {
  width: 600px;
}
</style>
