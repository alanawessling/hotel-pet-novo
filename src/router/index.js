import { createRouter, createWebHistory } from 'vue-router'
import TutorView from '../views/TutorView.vue'
import AddTutor from '../views/AddTutor.vue'
import TutorDetailsView from '../views/TutorDetailsView.vue'

const routes = [
  {
  path: '/',
  redirect: '/tutores'
},
  {
    path: '/tutores',
    name: 'tutores',
    component: TutorView
  },
  {
    path: '/tutores/novo',
    name: 'addTutor',
    component: AddTutor
  },
  {
    path: '/tutores/:id',
    name: 'tutorDetails',
    component: TutorDetailsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
