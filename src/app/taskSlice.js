import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: (() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  })(),
  darkMode: (() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  })(),
  filter: '',
  snackbar: {
    open: false,
    message: '',
    severity: 'success', // 'success' or 'error'
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (action.payload.trim()) {
        state.tasks.push(action.payload.trim());
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        state.snackbar = {
          open: true,
          message: 'Task added successfully!',
          severity: 'success',
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.snackbar = {
        open: true,
        message: 'Task deleted successfully!',
        severity: 'success',
      };
    },
    updateTask: (state, action) => {
      const { index, title } = action.payload;
      if (index !== null && title.trim()) {
        state.tasks[index] = title.trim();
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        state.snackbar = {
          open: true,
          message: 'Task updated successfully!',
          severity: 'success',
        };
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', JSON.stringify(state.darkMode));
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { addTask, deleteTask, updateTask, setFilter, toggleDarkMode, closeSnackbar } = taskSlice.actions;
export default taskSlice.reducer;