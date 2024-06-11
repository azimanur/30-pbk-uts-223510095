<!-- Todos.vue -->
<template>
  <div class="centered-content">
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
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      filter: 'all', // Default filter: show all activities
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
    },
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
    },
  },
};
</script>

<style>
/* Tambahkan CSS sesuai kebutuhan Anda */
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
