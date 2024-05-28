<!-- App.vue -->
<template>
<<<<<<< HEAD
  <div>
    <header>
      <nav>
        <ul class="menu">
          <li><button @click="showTodos">Todos</button></li>
          <li><button @click="showPosts">Posts</button></li>
        </ul>
      </nav>
    </header>
    <div v-if="activeMenu === 'todos'" class="centered-content">
      <h2>Fitur Todos</h2>
      <div class="container">
        <div class="cont-input">
          <h1>Daftar Kegiatan</h1>
          <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru">
          <button @click="addActivity">Tambah</button>
        </div>
    
        <div class="cont-isi">
          <div class="cont-filter">
            <h3>Filter Kegiatan</h3>
            <button @click="showAll">Semua Kegiatan</button>
            <button @click="showIncomplete">Kegiatan Belum Selesai</button>
            <button @click="showCompleted">Kegiatan Selesai</button>
          </div>
    
          <table>
            <thead>
              <tr>
                <th class="judul-tabel">Nama Kegiatan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in filteredActivities" :key="index">
                <td>
                  <input type="checkbox" v-model="activity.completed">
                  <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
                </td>
                <td>
                  <span :class="{ 'selesai': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
                </td>
                <td>
                  <button @click="cancelActivity(index)" class="cancel-button">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else-if="activeMenu === 'posts'" class="centered-content posts-section">
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
    <div v-else class="centered-content">
      <p>Pilih menu untuk melihat fitur.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "",
      selectedUser: null,
      activities: [],
      newActivity: '',
      filter: 'all' // Default filter: show all activities
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
    filteredActivities() {
      if (this.filter === 'incomplete') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.filter === 'completed') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
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
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.posts = json;
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
    },
    showTodos() {
      this.activeMenu = "todos";
    },
    showPosts() {
      this.activeMenu = "posts";
      this.fetchPosts();
    },
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = '';
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    showAll() {
      this.filter = 'all';
    },
    showIncomplete() {
      this.filter = 'incomplete';
    },
    showCompleted() {
      this.filter = 'completed';
    }
  },
  mounted() {
    this.fetchUsers();
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

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.posts-section h2, .posts-section h3, .posts-section select, .posts-section ul, .posts-section p {
  font-size: 1.5em; /* Perbesar ukuran font */
}

.posts-section ul {
  list-style-type: none;
  padding: 0;
}

.posts-section ul li {
  margin: 10px 0;
}

.completed {
  text-decoration: line-through;
}

.selesai {
  color: rgb(247, 33, 18);
}

.cancel-button {
  color: rgb(24, 23, 23);
}
</style>
=======
  <div class="container">
    <div class="cont-input">
      <h1>Daftar Kegiatan</h1>
      <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru">
      <button @click="addActivity">Tambah</button>
    </div>
  
    <div class="cont-isi">
      <div class="cont-filter">
        <h3>Filter Kegiatan</h3>
        <button @click="showAll" class="">Semua Kegiatan</button>
        <button @click="showIncomplete">Kegiatan Belum Selesai</button>
        <button @click="showCompleted">Kegiatan Selesai</button>
      </div>
  
      <table>
        <thead>
          <tr>
            <th class="judul-tabel">Nama Kegiatan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in filteredActivities" :key="index">
            <td>
              <input type="checkbox" v-model="activity.completed">
              <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
            </td>
            <td>
            <span :class="{ 'selesai': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
          </td>
            <td>
              <button @click="cancelActivity(index)" class="cancel-button">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  </template>
  
  <script>
  export default {
    data() {
      return {
        activities: [],
        newActivity: '',
        filter: 'all' // Default filter: show all activities
      };
    },
    computed: {
      filteredActivities() {
        if (this.filter === 'incomplete') {
          return this.activities.filter(activity => !activity.completed);
        } else if (this.filter === 'completed') {
          return this.activities.filter(activity => activity.completed);
        } else {
          return this.activities;
        }
      }
    },
    methods: {
      addActivity() {
        if (this.newActivity.trim() !== '') {
          this.activities.push({ name: this.newActivity, completed: false });
          this.newActivity = '';
        }
      },
      cancelActivity(index) {
        this.activities.splice(index, 1);
      },
      showAll() {
        this.filter = 'all';
      },
      showIncomplete() {
        this.filter = 'incomplete';
      },
      showCompleted() {
        this.filter = 'completed';
      }
    }
  };
  </script>
  
>>>>>>> origin/main
