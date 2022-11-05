import React, { useEffect, useState } from 'react'
import common from '../../common/commonImports.js'
import { useForm } from 'react-hook-form'
import { newProject } from './projectSlice'
import { useDispatch, useSelector } from 'react-redux'
import { listAllUsers, getAllUsers } from '../auth/authSlice.js'
import makeAnimated from 'react-select/animated'
import TextareaAutosize from 'react-textarea-autosize'

import Select from 'react-select'

const NewProjectComponent = (props) => {
	const dispatch = useDispatch()
	const user = JSON.parse(sessionStorage.getItem('user'))
	const [assignedEmployees, setAssignedEmployees] = useState([])
	const [count, setCount] = useState(0)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const animatedComponents = makeAnimated()

	const allEmployees = useSelector(getAllUsers)

	useEffect(() => {
		dispatch(listAllUsers())
	}, [])

	const submitMe = (data) => {
		data.createdBy = user._id
		data.employees = assignedEmployees
		dispatch(newProject(data))
		props.close()
	}
	const onChange = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				setAssignedEmployees([])
				break
			case 'select-option':
				setAssignedEmployees(newValue)
				break
			case 'remove-value':
				setAssignedEmployees(newValue)
				break
			default:
				break
		}
	}

	const currentEmployee = () => {
		let foundEmployee = ''
		allEmployees.forEach((emp) => {
			if (emp._id === user._id) {
				foundEmployee = emp
			}
		})
		let index = allEmployees.indexOf(foundEmployee)
		if (count < 1) {
			setAssignedEmployees([allEmployees[index]])
			setCount(47)
		}
		return index
	}
	const onInputChange = (newValue, actionMeta) => {}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className='h-fit w-fit min-h-[50h] lg:max-h-[80vh] relative sm:min-w-[40vw] lg:max-w-[50vw] 2xl:max-w-[45vw]'>
			<form className='text-rich-black h-full w-full grid grid-cols-8 items-center space-y-8'>
				<div className='col-span-8 flex justify-between'>
					<span className='invisible'></span>
					<h1 className='col-span-8 text-3xl text-midnight-blue pt-4 text-center'>
						New Project
					</h1>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
				</div>

				<input
					className='h-10 col-span-8 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='New Project Name'
					name='projName'
					{...register('projName')}
				/>
				<TextareaAutosize
					className='h-48 col-span-8 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black resize-none'
					minRows={4}
					maxRows={9}
					placeholder='Description of project'
					name='projDesc'
					{...register('projDesc')}
				/>
				<span className='col-span-1'></span>
				<div className='col-span-6'>
					{allEmployees.length > 0 ? (
						<Select
							isSearchable
							isClearable
							isMulti
							maxMenuHeight={140}
							defaultValue={allEmployees[currentEmployee()]}
							options={allEmployees}
							getOptionLabel={(option) =>
								`${option.first_name} ${option.last_name}`
							}
							components={animatedComponents}
							name='employee-select'
							onInputChange={onInputChange}
							onChange={onChange}
							getOptionValue={(option) => option._id}
						/>
					) : (
						<div></div>
					)}
				</div>
				<span className='col-span-1'></span>
				<common.ActionButton
					extraClass='col-span-8 mx-auto h-8'
					text='Create Project'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	)
}

export default NewProjectComponent
