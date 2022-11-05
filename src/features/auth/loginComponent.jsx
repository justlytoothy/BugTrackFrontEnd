import React, { useState } from 'react'
import common from '../../common/commonImports.js'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus, loginUser } from './authSlice.js'
import Modal from 'react-modal'
import NewUserComponent from './newUserComponent.jsx'
const LoginComponent = () => {
	Modal.setAppElement('#root')
	const dispatch = useDispatch()
	const loginStatus = useSelector(getLoginStatus)
	const [modalIsOpen, setIsOpen] = useState(false)
	const openForm = () => {
		setIsOpen(true)
	}
	const closeForm = () => {
		setIsOpen(false)
	}
	let isLoading
	if (loginStatus === 'loading') {
		isLoading = true
	} else {
		isLoading = false
	}
	let errorStatus
	if (loginStatus === 'failed') {
		errorStatus = true
	} else {
		errorStatus = false
	}

	const [formInput, setFormInput] = useState({
		username: '',
		password: '',
	})

	function inputChanged(e) {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value,
		})
	}

	function submit(e) {
		e.preventDefault()
		let data = formInput
		dispatch(loginUser(data))
	}
	const errorMsg = () => {
		if (errorStatus) {
			return (
				<h3 className='text-delete-red font-bold text-sm col-span-5'>
					Error: &nbsp;
					<span className='text-white font-normal'>
						Username and/or password incorrect
					</span>
				</h3>
			)
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div className='overflow-hidden overflow-y-hidden overflow-x-hidden overscroll-contain min-h-[102vh] h-full min-w-[101vw] bg-[url("./images/imageBG.jpeg")] bg-cover bg-[rgba(0, 0, 0, 0.288)] bg-blend-multiply absolute'>
			<div className='w-full h-full flex flex-col justify-center'>
				<form className='border-gray-500 rounded-md grid grid-cols-5 text-center bg-prime-color text-black mx-auto min-h-fit w-3/4 sm:w-1/2 lg:w-2/5 2xl:w-1/4 space-y-8'>
					<h1 className='text-white text-3xl m-1 mt-12 w-full col-span-5'>
						Login:
					</h1>
					{errorMsg()}
					<div className='col-span-5 flex justify-center'>
						<input
							className='mx-4 h-12 w-3/4 border-none rounded-md pl-2 focus:outline-2 focus:outline-white-filled'
							name='username'
							placeholder='Username'
							onChange={inputChanged}
							value={formInput.username}></input>
					</div>
					<div className='col-span-5 flex justify-center'>
						<input
							className='mx-4 h-12 w-3/4 border-none pl-2 rounded-md focus:outline-2 focus:outline-white-filled'
							name='password'
							type='password'
							placeholder='Password'
							onChange={inputChanged}
							value={formInput.password}></input>
					</div>
					<h4 className='text-white col-span-5'>
						Don't have an account? Register{' '}
						<span
							className='font-semibold underline hover:font-extrabold hover:text-carolina-blue cursor-pointer'
							onClick={openForm}>
							here
						</span>
					</h4>
					<div className='col-span-5 pb-6 flex justify-center'>
						<common.ActionButton
							extraClass='h-10 basis-1/3'
							loading={isLoading}
							click={submit}
							text='Login'
							type='submit'></common.ActionButton>
					</div>
				</form>
			</div>
			<Modal
				// className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
				overlayClassName='fix-modal-overlay'
				className='fix-modal'
				style={{
					content: {
						WebkitOverflowScrolling: 'touch',
					},
				}}
				isOpen={modalIsOpen}
				onRequestClose={closeForm}
				contentLabel='New User Form'>
				<NewUserComponent close={closeForm}></NewUserComponent>
			</Modal>
		</div>
	)
}
export default LoginComponent
