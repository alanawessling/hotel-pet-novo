
<script setup>
import { onMounted, ref, computed } from 'vue';

const API_URL = 'http://localhost:3000';

const tutores = ref([]);
const pets = ref([]);
const pesquisaTutor = ref('');

// Filtra os tutores pela pesquisa
const tutoresFiltrados = computed(() => {
  const termo = pesquisaTutor.value.toLowerCase().trim();

  return tutores.value.filter(tutor => {
    return [
      tutor.nome,
      tutor.cpfCnpj,
      tutor.email
    ].some(valor =>
      String(valor || '').toLowerCase().includes(termo)
    );
  });
});

// Encontra os pets de cada tutor
function petsDoTutor(id) {
  return pets.value.filter(
    pet => String(pet.tutorId).trim() === String(id).trim()
  );
}

// Carrega os tutores e os pets
async function carregarDados() {
  const respostaTutores = await fetch(`${API_URL}/tutores`);

  if (!respostaTutores.ok) {
    console.error('Erro ao carregar tutores');
    return;
  }

  tutores.value = await respostaTutores.json();

  const respostaPets = await fetch(`${API_URL}/pets`);

  if (!respostaPets.ok) {
    console.error('Erro ao carregar pets');
    return;
  }

  pets.value = await respostaPets.json();
}

// Exclui um tutor
async function deletarTutor(id) {
  if (petsDoTutor(id).length > 0) {
    alert('Remova os pets antes de excluir o tutor!');
    return;
  }

  const confirmarDelete = confirm(
    'Deseja realmente remover este tutor?'
  );

  if (!confirmarDelete) return;

  const resposta = await fetch(`${API_URL}/tutores/${id}`, {
    method: 'DELETE'
  });

  if (!resposta.ok) {
    alert('Erro ao excluir tutor');
    return;
  }

  await carregarDados();
}

onMounted(carregarDados);
</script>

<template>
  <div class="container">
    <header class="mb-4">
      <h1 class="h2">Listagem de Tutores</h1>

      <p class="text-secondary">
        Listagem dos tutores cadastrados no sistema.
      </p>

      <RouterLink to="/tutores/novo" class="btn btn-success">
        Novo tutor
      </RouterLink>
    </header>

    <!-- Pesquisa de tutores -->
    <div class="d-flex gap-3 align-items-center mb-3">
      <input
        v-model="pesquisaTutor"
        class="form-control"
        placeholder="Pesquisar tutor por nome, CPF/CNPJ ou e-mail"
      />

      <RouterLink to="/tutores/novo" class="btn btn-primary">
        + Cadastrar Tutor
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Quantidade de pets</th>
            <th>Pets</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="tutor in tutoresFiltrados"
            :key="tutor.id"
          >
            <td>{{ tutor.id }}</td>
            <td>{{ tutor.nome }}</td>
            <td>{{ tutor.cpfCnpj || 'Não informado' }}</td>
            <td>{{ tutor.telefone }}</td>
            <td>{{ tutor.email || 'Não informado' }}</td>

            <td>{{ petsDoTutor(tutor.id).length }}</td>

            <td>
              <span v-if="petsDoTutor(tutor.id).length === 0">
                Nenhum pet
              </span>

              <span
                v-for="pet in petsDoTutor(tutor.id)"
                :key="pet.id"
                class="me-2"
              >
                {{ pet.nome }}
              </span>
            </td>

            <td>
              <RouterLink
                :to="`/tutores/${tutor.id}`"
                class="btn btn-primary btn-sm me-2"
              >
                Visualizar
              </RouterLink>

              <button
                @click="deletarTutor(tutor.id)"
                class="btn btn-danger btn-sm"
              >
                Deletar
              </button>
            </td>
          </tr>

          <tr v-if="tutoresFiltrados.length === 0">
            <td colspan="8">
              Nenhum tutor encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
