<template>
  <div class="container mt-4">
    <h2>Cadastrar Tutor</h2>

    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label>Nome:</label>
        <input type="text" v-model="nome" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Telefone:</label>
        <input type="text" v-model="telefone" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success">Salvar</button>
      <router-link to="/tutores" class="btn btn-secondary ms-2">Voltar</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nome = ref('')
const telefone = ref('')

const salvar = async () => {
  await fetch('http://localhost:3000/tutores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome.value, telefone: telefone.value })
  })
  
  router.push('/tutores')
}
</script>