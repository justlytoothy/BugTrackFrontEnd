import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/auth-header'

const initialState = {
	status: 'none',
	error: null,
	allComments: [],
	selectedComment: {},
	refresh: 0,
}

export const newComment = createAsyncThunk(
	'comment/new',
	async (data, { getState }) => {
		try {
			const state = getState()
			const user_id = state.auth.user._id
			const { message, ticket_id } = data
			let temp = {
				message: message,
				creator: user_id,
				ticket_id: ticket_id,
			}
			const response = await axios.post('comment', temp)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

export const getComment = createAsyncThunk('comment/getone', async (data) => {
	try {
		const response = await axios.get('comment', {
			params: data,
		})
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
})

export const getAllProjectComments = createAsyncThunk(
	'comment/project/getall',
	async (data) => {
		try {
			const response = await axios.get('comment/all/project', {
				params: data,
			})
			return response.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)
export const getAllUserComments = createAsyncThunk(
	'comment/user/getall',
	async (arg, { getState }) => {
		try {
			const state = getState()
			const user_id = state.auth.user._id
			const response = await axios.get('comment/all/user', {
				params: user_id,
			})
			return response.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)
export const deleteComment = createAsyncThunk(
	'comment/delete',
	async (data) => {
		try {
			const response = await axios.delete('comment', {
				data: { id: data },
			})
			return response.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		login(state, action) {
			state.push(action.payload)
		},
		register(state, action) {
			return {
				...state,
				status: 'loading',
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(newComment.pending, (state, action) => {
				state.refresh++

				state.status = 'loading'
			})
			.addCase(newComment.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh++
				return action.payload
			})
			.addCase(newComment.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getComment.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getComment.fulfilled, (state, action) => {
				state.status = 'success'
				state.selectedComment = action.payload
			})
			.addCase(getComment.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getAllUserComments.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getAllUserComments.fulfilled, (state, action) => {
				state.status = 'success'
				state.allComments = action.payload
			})
			.addCase(getAllUserComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getAllProjectComments.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(getAllProjectComments.fulfilled, (state, action) => {
				state.status = 'success'
				state.allComments = action.payload
			})
			.addCase(getAllProjectComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(deleteComment.pending, (state, action) => {
				state.status = 'loading'
				state.refresh++
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh = state.refresh + 1
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const commentStatus = (state) => state.comment.status
export const refreshCommentStatus = (state) => state.comment.refresh
export const allComments = (state) => state.comment.allComments
export const getSelectedComment = (state) => state.comment.selectedComment
export const { login, register } = commentSlice.actions
export default commentSlice.reducer
