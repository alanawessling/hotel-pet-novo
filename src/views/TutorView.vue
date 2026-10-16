<template>
  <div class="container mt-4">
    <h2>Lista de Tutores</h2>
    
    <router-link to="/tutores/novo" class="btn btn-primary mb-3">
      Novo Tutor
    </router-link>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tutor in tutores" :key="tutor.id">
          <td>{{ tutor.id }}</td>
          <td>{{ tutor.nome }}</td>
          <td>{{ tutor.telefone }}</td>
          <td>
            <router-link :to="`/tutores/${tutor.id}`" class="btn btn-warning btn-sm me-1">
              Visualizar
            </router-link>
            <button @click="excluir(tutor.id)" class="btn btn-danger btn-sm">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tutores = ref([])

const buscarTutores = async () => {
  const res = await fetch('http://localhost:3000/tutores')
  tutores.value = await res.json()
}

const excluir = async (id) => {
  if (confirm('Deseja apagar?')) {
    await fetch(`http://localhost:3000/tutores/${id}`, { method: 'DELETE' })
    buscarTutores()
  }
}

onMounted(buscarTutores)
</script>