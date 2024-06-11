<!-- Posts.vue -->
<template>
    <div class="centered-content posts-section">
      <h2>Fitur Postingan</h2>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <div v-if="posts.length > 0">
        <h3>Postingan oleh {{ selectedUserName }}</h3>
        <ul>
          <li v-for="post in filteredPosts" :key="post.id">
            {{ post.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Tidak ada postingan untuk pengguna ini.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        posts: [],
        selectedUser: null,
      };
    },
    computed: {
      selectedUserName() {
        const user = this.users.find((u) => u.id === this.selectedUser);
        return user ? user.name : "";
      },
      filteredPosts() {
        return this.posts.filter((post) => post.userId === this.selectedUser);
      },
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const json = await response.json();
          this.users = json;
        } catch (error) {
          console.error("Error fetching users data:", error);
        }
      },
      async fetchPosts() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const json = await response.json();
          this.posts = json;
        } catch (error) {
          console.error("Error fetching posts data:", error);
        }
      },
    },
    mounted() {
      this.fetchUsers();
      this.fetchPosts();
    },
  };
  </script>
  
  <style>
  /* Tambahkan CSS sesuai kebutuhan Anda */
  .posts-section h2,
  .posts-section h3,
  .posts-section select,
  .posts-section ul,
  .posts-section p {
    font-size: 1.2em; /* Perbesar ukuran font */
  }
  
  .posts-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .posts-section ul li {
    margin: 10px 0;
  }
  </style>
  