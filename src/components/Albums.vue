<template>
    <q-page class="albums-page">
      <q-card class="q-pa-md">
        <q-card-section>
          <h2 class="text-h4 q-mb-md">Albums</h2>
          <q-form @submit.stop.prevent="fetchPhotos">
            <q-input
              outlined
              dense
              v-model="albumId"
              label="Masukkan ID Album"
              type="number"
              placeholder="ID Album"
              class="q-mb-md"
            />
            <q-btn type="submit" color="primary" label="Cari Foto" />
          </q-form>
        </q-card-section>
  
        <q-separator />
  
        <q-card-section v-if="photos.length > 0">
          <h3 class="text-h5 q-mb-sm">Foto dari Album ID {{ albumId }}</h3>
          <div class="photo-list">
            <q-card v-for="photo in photos" :key="photo.id" class="photo-card">
              <q-card-section class="q-pt-none">
                <q-img
                  :src="photo.thumbnailUrl"
                  :alt="photo.title"
                  class="photo-thumbnail"
                  @click="viewPhotoDetail(photo)"
                />
              </q-card-section>
              <q-card-section class="q-pb-xs">
                <q-item-label>{{ photo.title }}</q-item-label>
                <q-item-label caption class="photo-url">
                  <a :href="photo.url" target="_blank">{{ formatUrl(photo.url) }}</a>
                </q-item-label>
                <q-btn @click="viewPhotoDetail(photo)" label="Lihat Foto" color="primary" />
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
  
        <q-card-section v-else>
          <q-card>
            <q-card-section class="text-center q-pa-md">
              <p v-if="albumId !== ''">Silahkan Tekan Tombol Cari untuk Album ID {{ albumId }}</p>
              <p v-else>Silakan masukkan ID Album untuk mencari foto.</p>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
  
      <!-- Dialog untuk menampilkan detail foto -->
      <q-dialog v-model="showDialog">
        <q-card class="photo-dialog-card">
          <q-card-section class="q-pt-none">
            <q-img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="photo-detail" />
          </q-card-section>
          <q-card-section>
            <q-item-label>{{ selectedPhoto.title }}</q-item-label>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="closeDialog" label="Tutup" color="primary" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        albumId: '',
        photos: [],
        showDialog: false,
        selectedPhoto: {},
      };
    },
    methods: {
      async fetchPhotos() {
        try {
          this.$router.push(`/albums/${this.albumId}`);
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          this.photos = json.map(photo => ({
            ...photo,
            title: photo.title,
            thumbnailUrl: photo.thumbnailUrl,
            url: photo.url,
          }));
        } catch (error) {
          console.error('Error fetching photos data:', error);
          this.photos = [];
        }
      },
      viewPhotoDetail(photo) {
        this.selectedPhoto = photo;
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = false;
      },
      formatUrl(url) {
        return url;
      },
    },
    mounted() {
      const albumId = this.$route.params.id;
      if (albumId) {
        this.albumId = albumId;
        this.fetchPhotos();
      }
    },
    watch: {
      $route(to) {
        if (to.params.id) {
          this.albumId = to.params.id;
          this.fetchPhotos();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .albums-page {
    padding: 20px;
  }
  
  .photo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo-card {
    max-width: 200px;
    margin: 10px;
    text-align: center;
  }
  
  .photo-thumbnail {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .photo-url {
    word-wrap: break-word;
  }
  
  .photo-detail {
    max-width: 600px;
    max-height: 600px;
    width: 600px;
    height: 600px;
    object-fit: contain;
  }
  
  .photo-dialog-card {
    max-width: 800px;
    width: auto;
    height: auto;
    max-height: 90vh;
  }
  </style>
  