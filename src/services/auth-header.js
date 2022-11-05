import axios from 'axios'
import { logoutUser } from '../features/auth/authSlice'
let store
export const injectStore = (_store) => {
	store = _store
}
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.interceptors.request.use((request) => {
	if (
		sessionStorage.length > 0 &&
		sessionStorage.getItem('user') !== 'undefined' &&
		sessionStorage.getItem('user') != null
	) {
		const userPre = sessionStorage.getItem('user')
		const user = JSON.parse(userPre)
		if (user.hasOwnProperty('token')) {
			request.headers.common['x-access-token'] = user.token
		}
	}

	return request
})
axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.log(error)
		if (error.response.status === 403) {
			window.location.href = '/'
			store.dispatch(logoutUser())
			sessionStorage.clear()
		}
	}
)
export default axios
