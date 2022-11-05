import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/auth-header'
let initialState = {}
if (
	sessionStorage.length > 0 &&
	sessionStorage.getItem('user') !== 'undefined'
) {
	const userPre = sessionStorage.getItem('user')
	let user = JSON.parse(userPre)
	if (user != null) {
		if (user.token) {
			initialState = {
				isLoggedIn: true,
				user,
				loading: false,
				error: null,
				allUsers: [],
				fullName: `${user.first_name} ${user.last_name}`,
			}
		} else {
			initialState = {
				isLoggedIn: false,
				user: null,
				loading: false,
				error: null,
				allUsers: [],
				fullName: '',
			}
		}
	}
} else {
	initialState = {
		isLoggedIn: false,
		user: null,
		loading: false,
		error: null,
		allUsers: [],
		fullName: '',
	}
}

export const loginUser = createAsyncThunk('user/login', async (user) => {
	try {
		const response = await axios.post('user/login', user)
		return response.data
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured')
		throw error
	}
})
export const newUser = createAsyncThunk('user/register', async (user) => {
	try {
		const response = await axios.post('user/register', user)
		return response.data
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured')
		throw error
	}
})
export const listAllUsers = createAsyncThunk('user/list', async () => {
	try {
		const response = await axios.get('user')
		return response.data
	} catch (error) {
		console.log('An error of ' + error.message + ' has occured')
		throw error
	}
})

export const logoutUser = createAsyncThunk('user/logout', async () => {
	return true
})

export const deleteUser = createAsyncThunk('user/delete', async (data) => {
	try {
		const response = await axios.delete('user', {
			data: { id: data },
		})
		return response.data
	} catch (error) {
		console.log(error)
		throw error
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.push(action.payload)
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, (state, action) => {
				state.loading = true
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false
				state.isLoggedIn = true
				state.user = action.payload
				state.fullName = `${action.payload.first_name} ${action.payload.last_name}`
				let myString = JSON.stringify(action.payload)
				sessionStorage.setItem('user', myString)
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(logoutUser.pending, (state, action) => {
				state.loading = true
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.loading = false
				state.isLoggedIn = false
				state.user = null
				sessionStorage.removeItem('user')
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(listAllUsers.pending, (state, action) => {
				state.loading = true
			})
			.addCase(listAllUsers.fulfilled, (state, action) => {
				state.loading = false
				let users = action.payload
				users.forEach((user) => {
					user.password = ''
				})
				state.allUsers = users
			})
			.addCase(listAllUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(newUser.pending, (state, action) => {
				state.loading = true
			})
			.addCase(newUser.fulfilled, (state, action) => {
				state.loading = false
			})
			.addCase(newUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	},
})

export const getLoginStatus = (state) => state.auth.loading
export const getAllUsers = (state) => state.auth.allUsers
export const getIsLogged = (state) => state.auth.isLoggedIn
export const getLoginError = (state) => state.auth.error
export const getName = (state) => state.auth.fullName
export const getUser = (state) => state.auth.user
export const { login } = authSlice.actions
export default authSlice.reducer
