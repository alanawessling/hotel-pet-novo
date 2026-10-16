<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav aria-label="Menu da PetSchool">
    <div class="nav flex-column nav-pills gap-1">
      <RouterLink
        class="nav-link"
        active-class="active"
        to="/pets"
      >
        <i
          class="bi bi-heart me-2"
          aria-hidden="true"
        ></i>
        Pets
      </RouterLink>

      <RouterLink
        class="nav-link"
        active-class="active"
        to="/pets/novo"
      >
        <i
          class="bi bi-plus-circle me-2"
          aria-hidden="true"
        ></i>
        Novo pet
      </RouterLink>

      <router-link
        class="nav-link"
        active-class="active"
        to="/tutores"
      >
        <i
          class="bi bi-people me-2"
          aria-hidden="true"
        ></i>
        Tutores
    </router-link>

    <router-link
        class="nav-link"
        active-class="active"
        to="/tutores/novo"
      >
        <i
          class="bi bi-plus-circle me-2"
          aria-hidden="true"
        ></i>
        Novo tutor
    </router-link>
    </div>
  </nav>
</template>
