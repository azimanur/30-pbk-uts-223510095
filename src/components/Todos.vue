<template>
  <div>
    <q-card flat class="cont">
      <q-card-section>
        <h2 class="q-mb-md">Fitur Todos</h2>
        <q-btn @click="promptAddTodo" label="Tambah Todo Baru" class="add" />
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Cari Todos"
          class="q-mt-md"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="q-mt-md">
          <q-btn-group>
            <q-btn
              :outline="statusFilter !== 'all'"
              label="Tampilkan Semua"
              @click="setStatusFilter('all')"
            />
            <q-btn
              :outline="statusFilter !== 'not_completed'"
              label="Belum Selesai"
              @click="setStatusFilter('not_completed')"
            />
            <q-btn
              :outline="statusFilter !== 'completed'"
              label="Selesai"
              @click="setStatusFilter('completed')"
            />
          </q-btn-group>
        </div>
      </q-card-section>

      <q-separator />

      <div class="todos-list todos-container">
        <q-card
          v-for="(todo, index) in filteredTodos"
          :key="todo.name"
          class="todo-card q-pa-xs"
          :class="{ 'bg-grey-9': todo.selected, 'bg-grey-2': !todo.selected }"
        >
          <q-card-section >
            <q-checkbox dense v-model="todo.selected" :label="todo.name" color="primary" @update:model-value="updateTodoStatus" />
          </q-card-section>
          <q-separator />
          <q-item v-for="(col, colIndex) in columns" :key="colIndex">
            <q-item-section>
              <q-item-label>{{ col.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label :class="{ 'completed': todo.selected }" caption>
                {{ todo[col.name] }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-actions align="right">
            <q-btn @click="promptEditTodo(index)" label="Edit" />
            <q-btn @click="deleteTodo(index)" color="negative" label="Hapus" />
          </q-card-actions>
        </q-card>
      </div>

    </q-card>
  </div>
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useTodosStore } from '../stores/todos.js'; // Import the Pinia store

export default defineComponent({
  setup() {
    const store = useTodosStore();

    // Watch the store's todos and call updateTodoStatus when it changes
    watch(() => store.todos, () => {
      store.updateTodoStatus();
    }, { deep: true });

    return {
      todos: store.todos,
      filter: store.filter,
      statusFilter: store.statusFilter,
      filteredTodos: store.filteredTodos,
      addTodo: store.addTodo,
      editTodoName: store.editTodoName,
      deleteTodo: store.deleteTodo,
      setFilter: store.setFilter,
      setStatusFilter: store.setStatusFilter,
      updateTodoStatus: store.updateTodoStatus,
    };
  },
  computed: {
    columns() {
      return [
        { name: 'name', label: 'Nama Todo' },
        { name: 'status', label: 'Status' },
      ];
    },
  },
  methods: {
    promptAddTodo() {
      const newName = prompt('Masukkan nama todo baru:');
      if (newName) {
        this.addTodo(newName);
      }
    },
    promptEditTodo(index) {
      const newName = prompt('Masukkan nama todo baru:', this.todos[index].name);
      if (newName) {
        this.editTodoName(index, newName);
      }
    },
    deleteTodo(index) {
      if (confirm('Anda yakin ingin menghapus todo ini?')) {
        this.deleteTodo(index);
      }
    },
  },
});
</script>

<style scoped>

h2{
  font-size: 24px;
}
.add {
  background-color: rgba(255, 255, 255, 0.573);
}
.cont {
  background-color: rgba(255, 255, 255, 0.3);
}
.todos-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.todos-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.todo-card {
  max-width: 250px; /* Atur lebar maksimum kartu */
  margin: 10px; /* Berikan jarak antar kartu */
  transition: background-color 0.3s ease; /* Animasi perubahan warna latar belakang */
}

.bg-grey-9 {
  background-color: #424242;
}

.bg-grey-2 {
  background-color: #f0f0f0;
}

.completed {
  text-decoration: line-through;
  color: red; /* Warna merah untuk coretan */
}
</style>
