import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Albums from '../components/Albums.vue';
import Slot from '../components/Slot.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:albumId', name: 'AlbumDetail', component: Albums, props: true }, // Rute dinamis untuk detail album
  { path: '/', component: Slot },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
