
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const route = useRoute();
const router = useRouter();

const tutor = ref({});
const pets = ref([]);
const nomePet = ref('');
const especiePet = ref('');

// Carrega os dados do tutor
async function carregarTutor() {
  try {
    const resposta = await fetch(
      `${API_URL}/tutores/${route.params.id}`
    );

    if (!resposta.ok) {
      console.log('Tutor não encontrado!');
      return;
    }

    tutor.value = await resposta.json();
  } catch (erro) {
    console.error('Erro ao carregar os dados do tutor:', erro);
  }
}

// Carrega os pets vinculados ao tutor
async function carregarPets() {
  try {
    const resposta = await fetch(
      `${API_URL}/pets?tutorId=${route.params.id}`
    );

    if (resposta.ok) {
      pets.value = await resposta.json();
    }
  } catch (erro) {
    console.error('Erro ao carregar os pets:', erro);
  }
}

// Cadastra um novo pet
async function cadastrarPet() {
  if (!nomePet.value.trim() || !especiePet.value) {
    alert('Preencha o nome e a espécie do pet!');
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nomePet.value.trim(),
        especie: especiePet.value,
        tutorId: String(route.params.id)
      })
    });

    if (!resposta.ok) {
      alert('Não foi possível cadastrar o pet.');
      return;
    }

    nomePet.value = '';
    especiePet.value = '';

    await carregarPets();
  } catch (erro) {
    console.error('Erro ao cadastrar pet:', erro);
    alert('Erro ao cadastrar pet.');
  }
}

// Remove o tutor
async function removerTutor() {
  await carregarPets();

  if (pets.value.length > 0) {
    alert('Remova os pets antes de remover este tutor!');
    return;
  }

  const confirmar = window.confirm(
    'Deseja realmente remover este tutor?'
  );

  if (!confirmar) return;

  const resposta = await fetch(
    `${API_URL}/tutores/${route.params.id}`,
    { method: 'DELETE' }
  );

  if (resposta.ok) {
    router.push('/tutores');
  } else {
    alert('Erro ao remover tutor.');
  }
}

onMounted(() => {
  carregarTutor();
  carregarPets();
});
</script>

<template>
  <div class="container">
    <h1>Nome: {{ tutor.nome }}</h1>
    <p>Telefone: {{ tutor.telefone }}</p>

    <p>CPF/CNPJ: {{ tutor.cpfCnpj || 'Não informado' }}</p>
    <p>E-mail: {{ tutor.email || 'Não informado' }}</p>
    <p>
      Data de nascimento:
      {{ tutor.dataNascimento || 'Não informado' }}
    </p>

    <h2>Endereço</h2>
    <p>Rua: {{ tutor.rua || 'Não informado' }}</p>
    <p>Número: {{ tutor.numero || 'Não informado' }}</p>
    <p>Bairro: {{ tutor.bairro || 'Não informado' }}</p>
    <p>Cidade: {{ tutor.cidade || 'Não informado' }}</p>
    <p>Estado: {{ tutor.estado || 'Não informado' }}</p>
    <p>CEP: {{ tutor.cep || 'Não informado' }}</p>

    <hr class="my-4" />

    <h2>Pets do tutor</h2>

    <p v-if="pets.length === 0">
      Nenhum pet vinculado a este tutor.
    </p>

    <div v-else class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pet in pets" :key="pet.id">
            <td>{{ pet.id }}</td>
            <td>{{ pet.nome }}</td>
            <td>{{ pet.especie }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr class="my-4" />

    <h2>Cadastrar pet</h2>

    <form @submit.prevent="cadastrarPet">
      <div class="mb-3">
        <label for="nomePet" class="form-label">Nome do pet</label>
        <input
          id="nomePet"
          v-model="nomePet"
          class="form-control"
          placeholder="Nome do pet"
          required
        />
      </div>

      <div class="mb-3">
        <label for="especiePet" class="form-label">Espécie</label>
        <select
          id="especiePet"
          v-model="especiePet"
          class="form-select"
          required
        >
          <option value="">Selecione</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Calopsita">Calopsita</option>
          <option value="Coelho">Coelho</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <button type="submit" class="btn btn-success">
        Cadastrar pet
      </button>

      <button
        type="button"
        class="btn btn-danger ms-2"
        @click="removerTutor"
      >
        Remover tutor
      </button>

      <RouterLink to="/tutores" class="btn btn-secondary ms-2">
        Voltar
      </RouterLink>
    </form>
  </div>
</template>
