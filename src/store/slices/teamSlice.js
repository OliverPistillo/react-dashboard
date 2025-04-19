// src/store/slices/teamSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teamService from '../../services/teamService';

// Async Thunks
export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teamService.getAllTeamMembers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTeamMember = createAsyncThunk(
  'team/createTeamMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await teamService.createTeamMember(memberData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTeamMember = createAsyncThunk(
  'team/updateTeamMember',
  async ({ memberId, memberData }, { rejectWithValue }) => {
    try {
      const response = await teamService.updateTeamMember(memberId, memberData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTeamMember = createAsyncThunk(
  'team/deleteTeamMember',
  async (memberId, { rejectWithValue }) => {
    try {
      await teamService.deleteTeamMember(memberId);
      return memberId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  members: [],
  currentMember: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setCurrentMember: (state, action) => {
      state.currentMember = action.payload;
    },
    clearCurrentMember: (state) => {
      state.currentMember = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTeamMembers
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createTeamMember
      .addCase(createTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(createTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateTeamMember
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.members.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.members[index] = action.payload;
        }
        if (state.currentMember && state.currentMember.id === action.payload.id) {
          state.currentMember = action.payload;
        }
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteTeamMember
      .addCase(deleteTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(member => member.id !== action.payload);
        if (state.currentMember && state.currentMember.id === action.payload) {
          state.currentMember = null;
        }
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentMember, clearCurrentMember } = teamSlice.actions;

export default teamSlice.reducer;