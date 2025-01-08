<template>
  <div>
    <q-btn flat round dense icon="more_vert" aria-label="Opções" @click="openMenu" ref="menuBtn" />

    <q-menu v-model="menuOpen" :offset="[10, 5]" transition-show="scale" transition-hide="scale">
      <q-list style="min-width: 150px">
        <q-item clickable v-ripple @click="editar">
          <q-item-section>Editar</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="excluir">
          <q-item-section>Excluir</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
export default {
  name: 'MenuOpcoes',
  props: {
    tarefaId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    openMenu() {
      this.menuOpen = true
    },

    editar() {
      this.$emit('editar-tarefa', this.tarefaId)
      this.menuOpen = false
    },

    excluir() {
      this.$emit('excluir-tarefa', this.tarefaId)
      this.menuOpen = false
    },
  },
}
</script>

<style scoped></style>
