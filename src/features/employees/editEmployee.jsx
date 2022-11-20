import React, { useState } from 'react'
import common from '../../common/commonImports'
import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { deleteUser, editUser } from '../auth/authSlice.js'
import { useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { roleOptions } from '../tickets/optionArrays'
///////////////////
///////////////////
const EditEmployee = (props) => {
	const dispatch = useDispatch()
	const [isChanged, setIsChanged] = useState(false)
	const animatedComponents = makeAnimated()
	const [role, setRole] = useState(props.employee.role)
	const user = JSON.parse(sessionStorage.getItem('user'))

	let changedEmployee = Object.assign({}, props.employee)
	useEffect(() => {
		if (!changedEmployee.hasOwnProperty('preferred_full_name')) {
			changedEmployee.preferred_full_name = `${props.employee.first_name} ${props.employee.last_name}`
			setIsChanged(true)
		} else {
			if (
				changedEmployee.preferred_full_name == null ||
				changedEmployee.preferred_full_name == ''
			) {
				changedEmployee.preferred_full_name = `${props.employee.first_name} ${props.employee.last_name}`
				setIsChanged(true)
			}
		}
	}, [])

	const updateEmployee = (data) => {
		let changed = isChanged
		if (
			data.firstName != changedEmployee.first_name ||
			data.lastName != changedEmployee.last_name ||
			data.prefName != changedEmployee.preferred_full_name
		) {
			changed = true
		}
		if (changed) {
			data.role = role
			data._id = props.employee._id
			data.editedBy = user._id
			dispatch(editUser(data))
		}
		props.close()
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onInputChangeRole = (newValue, actionMeta) => {}
	const onChangeRole = (newValue, actionMeta) => {
		console.log(actionMeta)
		switch (actionMeta.action) {
			case 'select-option':
				setRole(newValue.label)
				setIsChanged(true)
				break
			default:
				break
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (props.employee !== null && changedEmployee != null) {
		return (
			<div className='h-fit w-fit min-w-[25vw]'>
				<form className='text-rich-black h-full w-full grid grid-cols-8 items-center space-y-8'>
					<h1 className='col-span-8 text-3xl text-midnight-blue pt-4 text-center'>
						{`Edit ${props.employee.first_name} ${props.employee.last_name}`}
					</h1>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl fixed -top-4 right-4'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
					<div className='col-span-4 flex flex-col'>
						<label className='pl-2' htmlFor='fname'>
							First Name
						</label>
						<input
							className='h-10 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
							type='text'
							id='fname'
							placeholder='First Name'
							defaultValue={changedEmployee.first_name}
							name='firstName'
							{...register('firstName')}
						/>
					</div>

					<div className='col-span-4 flex flex-col'>
						<label className='pl-2' htmlFor='lname'>
							Last Name
						</label>
						<input
							className='h-10 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
							type='text'
							id='lname'
							placeholder='Last Name'
							defaultValue={changedEmployee.last_name}
							name='lastName'
							{...register('lastName')}
						/>
					</div>
					<div className='col-span-4 flex flex-col'>
						<label className='pl-2' htmlFor='pname'>
							Preferred Name
						</label>
						<input
							className='h-10 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
							type='text'
							id='pname'
							placeholder='Preferred Name'
							defaultValue={changedEmployee.preferred_full_name}
							name='prefName'
							{...register('prefName')}
						/>
					</div>
					<div className='col-span-4 flex flex-col'>
						<label className='pl-2' htmlFor='role'>
							Employee Role
						</label>
						<Select
							isSearchable
							className='m-2'
							classNamePrefix='custom-select'
							id='role'
							placeholder='Select Role'
							defaultValue={{ label: props.employee.role }}
							options={roleOptions}
							getOptionLabel={(option) => option.label}
							name='type-select'
							onInputChange={onInputChangeRole}
							onChange={onChangeRole}
							getOptionValue={(option) => option.label}
						/>
					</div>

					<div className='col-span-8 flex justify-between'>
						<common.ActionButton
							type='cancel'
							text='Cancel'
							extraClass=''
							click={props.close}></common.ActionButton>
						<common.ActionButton
							extraClass=''
							text='Save Changes'
							type='submit'
							click={handleSubmit(updateEmployee)}></common.ActionButton>
					</div>
				</form>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default EditEmployee

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
