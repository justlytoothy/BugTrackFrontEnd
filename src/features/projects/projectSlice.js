import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/auth-header';

const initialState = {
	loading: false,
	error: null,
	allProjects: [],
	selectedProject: {},
	refresh: 0,
};

export const newProject = createAsyncThunk('project/new', async (data) => {
	try {
		const response = await axios.post('project', data);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const getProject = createAsyncThunk('project/getone', async (data) => {
	try {
		let { id } = data;
		const response = await axios.get('project', {
			params: data,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
});
export const editProject = createAsyncThunk('project/edit', async (data) => {
	try {
		const response = await axios.put('project', data);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

export const getAllProjects = createAsyncThunk(
	'project/getall',
	async (arg, { getState }) => {
		try {
			const state = getState();
			const user_id = state.auth.user._id;
			const response = await axios.get('project/all', {
				params: user_id,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);
export const deleteProject = createAsyncThunk(
	'project/delete',
	async (data) => {
		try {
			const response = await axios.delete('project', {
				data: { id: data },
			});
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(newProject.pending, (state, action) => {
				state.loading = true;
				state.refresh++;
			})
			.addCase(newProject.fulfilled, (state, action) => {
				state.loading = false;
				state.refresh++;
				return action.payload;
			})
			.addCase(newProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.refresh++;
			})
			.addCase(editProject.pending, (state, action) => {
				state.loading = true;
				state.refresh++;
			})
			.addCase(editProject.fulfilled, (state, action) => {
				state.loading = false;
				state.refresh++;
				return action.payload;
			})
			.addCase(editProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.refresh++;
			})
			.addCase(getProject.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getProject.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProject = action.payload;
			})
			.addCase(getProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getAllProjects.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllProjects.fulfilled, (state, action) => {
				state.loading = false;
				state.allProjects = action.payload;
			})
			.addCase(getAllProjects.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteProject.pending, (state, action) => {
				state.loading = true;
				state.refresh++;
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				state.loading = false;
				state.refresh++;
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.refresh++;
			});
	},
});

export const projectStatus = (state) => state.project.loading;
export const refreshStatus = (state) => state.project.refresh;
export const allProjects = (state) => state.project.allProjects;
export const getSelectedProject = (state) => state.project.selectedProject;
export default projectSlice.reducer;
