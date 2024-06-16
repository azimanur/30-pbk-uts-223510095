<template>
  <div class="q-pa-md ">
    <q-card class="cont">
      <q-card-section class="q-pb-sm">
        <h2 class="text-h4 q-mb-md">Fitur Postingan</h2>
        <q-select
          v-model="selectedUser"
          outlined
          dense
          emit-value
          label="Pilih Pengguna"
          :options="userOptions"
          option-label="name" 
          option-value="id" 
        />
      </q-card-section>
    </q-card>

    <q-card v-if="posts.length > 0" class="q-mt-md cont">
      <q-card-section>
        <h3 class="text-h5 q-mb-sm">Postingan oleh {{ selectedUserName }}</h3>
        <q-list bordered separator class="q-pt-xs">
          <q-item
            v-for="post in filteredPosts"
            :key="post.id"
            class="q-pa-xs"
            :class="{ 'bg-grey-1': post.id % 2 === 0, 'bg-grey-3': post.id % 2 !== 0 }"
          >
            <q-item-section>
              <q-item-label>{{ post.title }}</q-item-label>
              <q-item-label caption>{{ post.body }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card v-else class="q-mt-md">
      <q-card-section class="text-center q-pa-md">
        <p>Tidak ada postingan untuk pengguna ini.</p>
      </q-card-section>
    </q-card>
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
    userOptions() {
      return this.users.map((user) => ({
        name: user.name, // Menggunakan 'name' untuk label opsi
        id: user.id, // Menggunakan 'id' untuk nilai opsi
      }));
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

<style scoped>
.cont {
  background-color: rgba(255, 255, 255, 0.674);
}
.bg-grey-1 {
  background-color: #f5f5f5;
}

.bg-grey-3 {
  background-color: #e0e0e0;
}
</style>
