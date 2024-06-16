import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: '',
    statusFilter: 'all',
  }),
  getters: {
    filteredTodos(state) {
      let filtered = state.todos;

      // Filter berdasarkan teks pencarian
      if (state.filter) {
        const filterLower = state.filter.toLowerCase();
        filtered = filtered.filter(todo =>
          todo.name.toLowerCase().includes(filterLower) ||
          (todo.desc && todo.desc.toLowerCase().includes(filterLower))
        );
      }

      // Filter berdasarkan status
      if (state.statusFilter === 'completed') {
        filtered = filtered.filter(todo => todo.selected);
      } else if (state.statusFilter === 'not_completed') {
        filtered = filtered.filter(todo => !todo.selected);
      }

      return filtered;
    },
  },
  actions: {
    addTodo(newName) {
      if (newName) {
        this.todos.push({ name: newName, desc: '', status: 'Belum Selesai', selected: false });
      }
    },
    editTodoName(index, newName) {
      if (newName) {
        this.todos[index].name = newName;
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    setFilter(filter) {
      this.filter = filter;
    },
    setStatusFilter(status) {
      this.statusFilter = status;
    },
    updateTodoStatus() {
      this.todos.forEach(todo => {
        todo.status = todo.selected ? 'Selesai' : 'Belum Selesai';
      });
    },
  },
});
