import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import LoginComponent from './features/auth/loginComponent'
import { getIsLogged, logoutUser } from './features/auth/authSlice'
import MyRoutes from './features/sidebar/routes'

function App() {
	const loggedIn = useSelector(getIsLogged)
	const dispatch = useDispatch()
	let fullApp
	if (loggedIn) {
		fullApp = (
			<div className='px-2 pt-2 overscroll-x-contain overflow-x-hidden min-h-[101vh] h-full w-full'>
				<MyRoutes />
			</div>
		)
	} else {
		fullApp = (
			<div className='min-w-[100vw] overflow-y-hidden overflow-x-hidden min-h-full p-2'>
				<LoginComponent></LoginComponent>
			</div>
		)
	}

	return fullApp
}

export default App
