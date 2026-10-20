
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
  cpfCnpj: '',
  email: '',
  dataNascimento: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
});

async function salvarTutor() {
  //Não deixa ficar vazio
  if (!novoTutor.value.nome.trim() || !novoTutor.value.telefone.trim()) {
    alert('Preencha o nome e o telefone!');
    return;
  }

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
      <p class="text-body-secondary mb-0">
        Cadastro de Tutores no sistema.
      </p>
    </header>

    <form @submit.prevent="salvarTutor">
      <h2 class="h5 mb-3">Dados do Tutor</h2>

      <div class="row g-3">
        <div class="col-md-6">
          <label for="nome" class="form-label">
            Nome Completo:
          </label>
          <input
            type="text"
            id="nome"
            v-model="novoTutor.nome"
            class="form-control"
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div class="col-md-6">
          <label for="cpfCnpj" class="form-label">
            CPF / CNPJ
          </label>
          <input
            id="cpfCnpj"
            v-model="novoTutor.cpfCnpj"
            class="form-control"
            placeholder="Digite o CPF ou CNPJ"
          />
        </div>

        <div class="col-md-6">
          <label for="telefone" class="form-label">
            Telefone / Celular / WhatsApp:
          </label>
          <input
            type="tel"
            id="telefone"
            v-model="novoTutor.telefone"
            class="form-control"
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div class="col-md-6">
          <label for="emailTutor" class="form-label">
            E-mail
          </label>
          <input
            id="emailTutor"
            v-model="novoTutor.email"
            type="email"
            class="form-control"
            placeholder="nome@example.com"
          />
        </div>

        <div class="col-md-6">
          <label for="dataNascimento" class="form-label">
            Data de Nascimento
          </label>
          <input
            id="dataNascimento"
            v-model="novoTutor.dataNascimento"
            type="date"
            class="form-control"
          />
        </div>
      </div>

      <hr class="my-4" />

      <h2 class="h5 mb-3">Endereço</h2>

      <div class="row g-3">
        <div class="col-md-8">
          <label for="ruaTutor" class="form-label">Rua</label>
          <input
            id="ruaTutor"
            v-model="novoTutor.rua"
            class="form-control"
            placeholder="Digite o nome da rua"
          />
        </div>

        <div class="col-md-4">
          <label for="numeroTutor" class="form-label">
            Número
          </label>
          <input
            id="numeroTutor"
            v-model="novoTutor.numero"
            class="form-control"
            placeholder="Número"
          />
        </div>

        <div class="col-md-6">
          <label for="bairroTutor" class="form-label">
            Bairro
          </label>
          <input
            id="bairroTutor"
            v-model="novoTutor.bairro"
            class="form-control"
            placeholder="Digite o bairro"
          />
        </div>

        <div class="col-md-6">
          <label for="cidadeTutor" class="form-label">
            Cidade
          </label>
          <input
            id="cidadeTutor"
            v-model="novoTutor.cidade"
            class="form-control"
            placeholder="Digite a cidade"
          />
        </div>

        <div class="col-md-6">
          <label for="estadoTutor" class="form-label">
            Estado
          </label>
          <select
            id="estadoTutor"
            v-model="novoTutor.estado"
            class="form-select"
          >
            <option value="">Selecione</option>
            <option value="SC">SC</option>
            <option value="PR">PR</option>
            <option value="RS">RS</option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
            <option value="MG">MG</option>
          </select>
        </div>

        <div class="col-md-6">
          <label for="cepTutor" class="form-label">CEP</label>
          <input
            id="cepTutor"
            v-model="novoTutor.cep"
            class="form-control"
            placeholder="00000-000"
          />
        </div>
      </div>

      <div class="mt-4">
        <RouterLink to="/tutores" class="btn btn-secondary me-2">
          Cancelar
        </RouterLink>

        <button
          type="submit"
          class="btn btn-success"
        >
          Cadastrar Tutor
        </button>
      </div>
    </form>
  </div>
</template>
