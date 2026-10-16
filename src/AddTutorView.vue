<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// chamando a minha API para exibir os dados de Tutor
const API_URL = 'http://localhost:3000';
const router = useRouter();

// exibindo a lista de tutores da aplicação
const tutores = ref([]);

async function carregarTutores() {
  const resposta = await fetch(`${API_URL}/tutores`);
  console.log('tutores', resposta.json);
  // tranformando os valores da minha API para o formato JSON
  tutores.value = await resposta.json();
}

// chamando a minha API para salvar os dados de Tutor
const novoTutor = ref({
  nome: '',
  telefone: '',
  id: '',
});

async function salvarTutor() {
  // fazendo uma requisição para o servidor
  await fetch(`${API_URL}/tutores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoTutor.value),
  });
  router.push('/tutores');
}

onMounted(carregarTutores);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastro de Tutores</h1>
      <p class="text-body-secondary mb-0">Cadastro de Tutores no sistema.</p>
    </header>
    <!--
    <RouterLink
      class="btn btn-primary"
      :to="{ name: 'addPet' }"
    >
      Adicionar Pet
    </RouterLink> -->

    <form @submit.prevent="salvarTutor">
      <div class="col-md-6">
        <label
          for="nome"
          class="form-label"
          >Nome do Tutor:</label
        >
        <input
          type="text"
          id="nome"
          v-model="novoTutor.nome"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label
          for="telefone"
          class="form-label"
          >Telefone:</label
        >
        <input
          type="number"
          id="telefone"
          v-model="novoTutor.telefone"
          class="form-control"
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-success"
      >
        Salvar Pet
      </button>
    </form>
  </div>
</template>