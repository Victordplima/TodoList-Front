<template>
  <div class="container">
    <q-btn @click="loadTarefas" label="Carregar Tarefas" color="primary" class="q-mb-md" />

    <q-list bordered class="q-list-custom">
      <q-item v-for="tarefa in tarefas" :key="tarefa.id">
        <TarefaComponente :tarefa="tarefa" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { getTarefas } from 'src/services/tarefasService'
import TarefaComponente from './TarefaComponente.vue'

export default {
  name: 'ListaTarefas',
  components: {
    TarefaComponente,
  },
  data() {
    return {
      tarefas: [],
      loading: false,
    }
  },
  methods: {
    async loadTarefas() {
      this.loading = true
      try {
        const response = await getTarefas()
        if (response.status) {
          this.tarefas = response.tarefas
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error)
      } finally {
        this.loading = false
      }
    },
  },
  onMounted() {
    this.loadTarefas()
  },
}
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 0 auto;
}

.q-list-custom {
  max-height: 500px;
  overflow-y: auto;
}
</style>
