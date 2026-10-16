<template>
  <div class="container mt-4">
    <h2>Detalhes do Tutor</h2>

    <p><strong>ID:</strong> {{ tutor.id }}</p>
    <p><strong>Nome:</strong> {{ tutor.nome }}</p>
    <p><strong>Telefone:</strong> {{ tutor.telefone }}</p>

    <router-link to="/tutores" class="btn btn-secondary">Voltar</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tutor = ref({})

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/tutores/${route.params.id}`)
  tutor.value = await res.json()
})
</script>