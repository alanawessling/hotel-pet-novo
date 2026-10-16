<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const API_URL = 'http://localhost:3000';
const route = useRoute();
const tutor = ref({});

async function carregarTutor() {
  try {
    const resposta = await fetch(`${API_URL}/tutores/${route.params.id}`);

    if (!resposta.ok) {
      console.log('Tutor não encontrado!');
      return;
    }

    tutor.value = await resposta.json();
  } catch (erro) {
    console.error('Erro ao carregar os dados do tutor:', erro);
  }
}

onMounted(carregarTutor);
</script>

<template>
  <div>
    <h1>Nome: {{ tutor.nome }}</h1>
    <p>Telefone: {{ tutor.telefone }}</p>
  </div>
</template>