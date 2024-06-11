<!-- App.vue -->
<template>
  <div>
    <header>
      <nav>
        <ul class="menu">
          <li><button @click="showTodos">Todos</button></li>
          <li><button @click="showPosts">Posts</button></li>
        </ul>
      </nav>
    </header>
    <Todos v-if="activeMenu === 'todos'" />
    <Posts v-if="activeMenu === 'posts'" />
    <Slot v-else />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';
import Slot from './components/Slot.vue';

export default {
  components: {
    Todos,
    Posts,
    Slot,
  },
  data() {
    return {
      activeMenu: '',
    };
  },
  methods: {
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
  },
};
</script>

<style>
/* Tambahkan CSS sesuai kebutuhan Anda */
.menu {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.menu li {
  margin: 0 10px;
}
</style>
