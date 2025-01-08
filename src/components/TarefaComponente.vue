<template>
  <q-card class="q-mb-md">
    <q-card-section>
      <div :class="{ 'completed-task': tarefaLocal.status === 'concluída' }">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h6">{{ tarefaLocal.titulo }}</div>
            <div class="text-subtitle2">{{ tarefaLocal.descricao }}</div>
            <div>
              <span
                v-for="categoria in tarefaLocal.categorias"
                :key="categoria.id"
                :style="{ backgroundColor: categoria.cor_em_hexadecimal }"
                class="category-label q-mr-sm"
              >
                {{ categoria.nome }}
              </span>
            </div>
          </div>
          <MenuOpcoes
            :tarefaId="tarefaLocal.id"
            @editar-tarefa="editarTarefa"
            @excluir-tarefa="excluirTarefa"
          />
        </div>
      </div>

      <div class="q-mt-md">
        <q-btn
          v-if="tarefaLocal.status === 'pendente'"
          @click="startTask"
          label="Começar Tarefa"
          color="primary"
          size="sm"
        />

        <q-checkbox
          v-if="tarefaLocal.status !== 'pendente'"
          v-model="isTaskCompleted"
          label="Marcar como Concluída"
          color="secondary"
          @update:model-value="toggleTaskCompletion"
        />
      </div>
    </q-card-section>

    <q-card-section v-if="showSubtarefas">
      <div v-if="tarefaLocal.subtarefas && tarefaLocal.subtarefas.length > 0">
        <q-item-label v-for="subtarefa in tarefaLocal.subtarefas" :key="subtarefa.id">
          <div>
            <div>{{ subtarefa.titulo }}</div>
            <div>
              <strong>Status:</strong>
              <span>{{ subtarefa.status }}</span>

              <q-checkbox
                v-model="subtarefa.status"
                true-value="concluída"
                false-value="em andamento"
                label="Concluída"
                color="green"
                @update:model-value="updateSubtaskStatus(subtarefa)"
              />
            </div>
          </div>
        </q-item-label>
      </div>
      <div v-else>
        <q-item-label>No subtarefas available.</q-item-label>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { putTarefa } from 'src/services/tarefasService'
import { putSubtarefa } from 'src/services/subtarefaService'
import { Notify } from 'quasar'
import MenuOpcoes from './MenuOpcoes.vue'

export default {
  name: 'TarefaComponente',
  props: {
    tarefa: {
      type: Object,
      required: true,
    },
  },
  components: {
    MenuOpcoes,
  },
  data() {
    return {
      showSubtarefas: false,
      tarefaLocal: { ...this.tarefa },
    }
  },
  computed: {
    isTaskCompleted() {
      return this.tarefaLocal.status === 'concluída'
    },
  },
  methods: {
    toggleSubtarefas() {
      this.showSubtarefas = !this.showSubtarefas
    },

    async startTask() {
      try {
        this.tarefaLocal.status = 'em andamento'
        await putTarefa(this.tarefaLocal.id, { status: 'em andamento' })
        Notify.create({ type: 'positive', message: 'Tarefa iniciada com sucesso!' })
      } catch (error) {
        console.error('Erro ao começar tarefa:', error)
        Notify.create({ type: 'negative', message: 'Erro ao começar a tarefa.' })
      }
    },

    async toggleTaskCompletion(isCompleted) {
      try {
        const newStatus = isCompleted ? 'concluída' : 'em andamento'
        this.tarefaLocal.status = newStatus
        await putTarefa(this.tarefaLocal.id, { status: newStatus })
        const message = isCompleted
          ? 'Tarefa marcada como concluída!'
          : 'Tarefa marcada como em andamento!'
        Notify.create({ type: 'positive', message })
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error)
        Notify.create({ type: 'negative', message: 'Erro ao atualizar a tarefa.' })
      }
    },

    async updateSubtaskStatus(subtarefa) {
      try {
        const updatedSubtarefa = await putSubtarefa(subtarefa.id, { status: subtarefa.status })
        const index = this.tarefaLocal.subtarefas.findIndex((t) => t.id === updatedSubtarefa.id)
        if (index !== -1) {
          this.tarefaLocal.subtarefas[index] = updatedSubtarefa
        }
        Notify.create({ type: 'positive', message: 'Status da subtarefa atualizado!' })
      } catch (error) {
        console.error('Erro ao atualizar subtarefa:', error)
        Notify.create({ type: 'negative', message: 'Erro ao atualizar subtarefa.' })
      }
    },

    editarTarefa(tarefaId) {
      console.log('Editar tarefa:', tarefaId)
      // Lógica para editar a tarefa
    },

    excluirTarefa(tarefaId) {
      console.log('Excluir tarefa:', tarefaId)
      // Lógica para excluir a tarefa
    },
  },
}
</script>

<style scoped>
.q-card {
  cursor: pointer;
  width: 100%;
}

.category-label {
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  display: inline-block;
}

.completed-task {
  text-decoration: line-through;
  color: gray;
}
</style>
