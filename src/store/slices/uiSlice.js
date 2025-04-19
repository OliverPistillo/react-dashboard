// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  taskModal: {
    open: false,
    taskData: null
  },
  notifications: [],
  darkMode: false,
  loading: {
    global: false,
    projects: false,
    tasks: false,
    documents: false
  },
  filters: {
    projects: {
      status: 'all',
      search: '',
      sort: 'name'
    },
    tasks: {
      status: 'all',
      priority: 'all',
      assignee: 'all',
      search: '',
      sort: 'dueDate'
    }
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTaskModal: (state, action) => {
      state.taskModal = {
        open: action.payload.open,
        taskData: action.payload.taskData || null
      };
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(notif => notif.id !== action.payload);
    },
    markNotificationAsRead: (state, action) => {
      const notifIndex = state.notifications.findIndex(notif => notif.id === action.payload);
      if (notifIndex !== -1) {
        state.notifications[notifIndex].read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notif => {
        notif.read = true;
      });
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setFilters: (state, action) => {
      const { type, filters } = action.payload;
      state.filters[type] = {
        ...state.filters[type],
        ...filters
      };
    },
    resetFilters: (state, action) => {
      const type = action.payload;
      if (type === 'projects') {
        state.filters.projects = initialState.filters.projects;
      } else if (type === 'tasks') {
        state.filters.tasks = initialState.filters.tasks;
      }
    }
  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTaskModal,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  toggleDarkMode,
  setDarkMode,
  setLoading,
  setFilters,
  resetFilters
} = uiSlice.actions;

export default uiSlice.reducer;