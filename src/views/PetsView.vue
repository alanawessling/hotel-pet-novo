<script setup>
import { onMounted, ref } from 'vue'

const API_URL = 'http://localhost:3000'

const pets = ref([])
const tutores = ref([])

// ve se ta carregando
const carregando = ref(true)

// guarda o erro
const erro = ref('')

// pega os dados
async function carregarDados() {
  try {
    // começou a carregar
    carregando.value = true

    // pega os pets
    const respostaPets = await fetch(`${API_URL}/pets`)

    // vê se deu certo
    if (!respostaPets.ok) {
      throw new Error('Erro ao buscar os pets')
    }

    // pega os dados
    pets.value = await respostaPets.json()

    // pega os tutores
    const respostaTutores = await fetch(`${API_URL}/tutores`)

    // ve se deu certo
    if (!respostaTutores.ok) {
      throw new Error('Erro ao buscar os tutores')
    }

    // pega os dados
    tutores.value = await respostaTutores.json()

  } catch (error) {
    // se der erro
    erro.value = 'Não foi possível carregar os dados.'

  } finally {
    // terminou de carregar
    carregando.value = false
  }
}

// roda quando abre a página
onMounted(carregarDados)
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">
        Listagem dos Pets cadastrados no sistema.
      </p>
    </header>
  </div>

  <table>
    <thead>
      <th>ID</th>
      <th>Nome</th>
      <th>Espécie</th>
      <th>Tutor</th>
    </thead>
    <tbody>
      <tr
        v-for="pet in pets"
        :key="pet.id"
      >
        <td>{{ pet.id }}</td>
        <td>{{ pet.nome }}</td>
        <td>{{ pet.especie }}</td>
        <td>
          {{
            tutores.find((t) => t.id === pet.tutorId)?.nome ||
            'Não especificado'
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
