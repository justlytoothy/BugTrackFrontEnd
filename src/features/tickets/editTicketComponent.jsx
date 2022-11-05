import React, { useEffect, useState } from 'react'
import common from '../../common/commonImports.js'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { typeOptions, priorityOptions, statusOptions } from './optionArrays.js'
import { newTicket } from './ticketSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getSelectedProject } from '../projects/projectSlice.js'

const EditTicketComponent = (props) => {
	const dispatch = useDispatch()
	const selectedProject = useSelector(getSelectedProject)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [assignedEmployees, setAssignedEmployees] = useState([])
	const [ticketPriority, setTicketPriority] = useState(0)
	const [ticketStatus, setTicketStatus] = useState('')
	const [ticketType, setTicketType] = useState('')
	const onChange = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				setAssignedEmployees([])
				break
			case 'select-option':
				setAssignedEmployees([])
				setAssignedEmployees([newValue._id])
				break

			default:
				break
		}
	}
	const onInputChangePriority = (newValue, actionMeta) => {}
	const onChangePriority = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				setTicketPriority(0)
				break
			case 'select-option':
				setTicketPriority(newValue.id)
				break
			default:
				break
		}
	}
	const onInputChangeStatus = (newValue, actionMeta) => {}
	const onChangeStatus = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				setTicketStatus('')
				break
			case 'select-option':
				setTicketStatus(newValue.label)
				break
			default:
				break
		}
	}
	const onInputChangeType = (newValue, actionMeta) => {}
	const onChangeType = (newValue, actionMeta) => {
		switch (actionMeta.action) {
			case 'clear':
				setTicketType('')
				break
			case 'select-option':
				setTicketType(newValue.label)
				break
			default:
				break
		}
	}
	const onInputChange = (newValue, actionMeta) => {}
	const submitMe = (data) => {
		const ticket = {
			project_id: props.project_id,
			ticket_name: data.ticket_name,
			ticket_description: data.ticket_description,
			ticket_status: ticketStatus,
			ticket_type: ticketType,
			ticket_steps: data.ticket_steps,
			ticket_priority: ticketPriority,
			assigned_employees: assignedEmployees,
			ticket_creator: '',
		}
		console.log(ticket)
		dispatch(newTicket(ticket))
		props.close()
	}
	const dot = (color = 'transparent') => ({
		alignItems: 'center',
		display: 'flex',

		':before': {
			backgroundColor: color,
			borderRadius: 10,
			content: '" "',
			display: 'block',
			marginRight: 8,
			height: 10,
			width: 10,
		},
	})
	const customStyles = (type) => {
		return type === 'priority'
			? {
					control: (styles) => {
						styles.minHeight = '2rem'
						return {
							...styles,
						}
					},
					option: (styles, { data, isSelected }) => {
						let dotColor =
							data.option === 'Low'
								? 'yellow'
								: data.option === 'Medium'
								? 'orange'
								: 'red'
						return {
							...styles,
							...dot(dotColor),
						}
					},
					singleValue: (styles, state) => {
						let dotColor =
							state.children === 'Low'
								? 'yellow'
								: state.children === 'Medium'
								? 'orange'
								: 'red'

						return { ...styles, ...dot(dotColor) }
					},
			  }
			: {
					control: (styles) => {
						styles.minHeight = '2rem'
						return {
							...styles,
						}
					},
			  }
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div className='h-fit w-fit min-w-[25vw]'>
			<form className='text-rich-black h-full w-full grid grid-cols-8 items-center'>
				<h1 className='col-span-8 text-2xl text-center pb-4'>New Ticket</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-2xl fixed top-3 right-4'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<input
					className='col-span-4 ml-7 h-[2.3rem] m-2 pl-2 border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='New Ticket Name'
					name='ticket_name'
					{...register('ticket_name')}
				/>
				<Select
					className='col-span-4 w-11/12 m-2 mx-auto mr-7'
					isSearchable
					styles={customStyles('priority')}
					classNamePrefix='custom-select'
					isClearable
					placeholder='Select Priority'
					options={priorityOptions}
					getOptionLabel={(option) => option.option}
					name='priority-select'
					onInputChange={onInputChangePriority}
					onChange={onChangePriority}
					getOptionValue={(option) => option.id}
				/>
				<TextareaAutosize
					className='h-48 col-span-8 w-11/12 mx-auto pl-2 m-2 border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black resize-none'
					minRows={3}
					maxRows={8}
					placeholder='Description of ticket'
					name='ticket_description'
					{...register('ticket_description')}
				/>

				<Select
					isSearchable
					className='col-span-4 w-11/12 m-2 ml-5 pl-2'
					classNamePrefix='custom-select'
					isClearable
					styles={customStyles('')}
					placeholder='Select Status'
					options={statusOptions}
					getOptionLabel={(option) => option.label}
					name='type-select'
					onInputChange={onInputChangeStatus}
					onChange={onChangeStatus}
					getOptionValue={(option) => option.label}
				/>
				<Select
					isSearchable
					className='col-span-4 w-11/12 m-2 mx-auto mr-7'
					classNamePrefix='custom-select'
					isClearable
					styles={customStyles('')}
					placeholder='Select Type'
					options={typeOptions}
					getOptionLabel={(option) => option.label}
					name='type-select'
					onInputChange={onInputChangeType}
					onChange={onChangeType}
					getOptionValue={(option) => option.label}
				/>

				<TextareaAutosize
					className='h-48 col-span-8 w-11/12 mx-auto pl-2 m-2 border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black resize-none'
					minRows={3}
					maxRows={8}
					placeholder='Steps to reproduce'
					name='ticket_steps'
					{...register('ticket_steps')}
				/>

				<span className='col-span-1'></span>
				<Select
					isSearchable
					styles={customStyles('')}
					className='col-span-6'
					classNamePrefix='custom-select'
					isClearable
					placeholder='Select Employees'
					options={selectedProject.employees}
					getOptionLabel={(option) =>
						`${option.first_name} ${option.last_name}`
					}
					name='employee-select'
					onInputChange={onInputChange}
					onChange={onChange}
					getOptionValue={(option) => option._id}
				/>
				<span className='col-span-1'></span>

				<common.ActionButton
					extraClass='col-span-8 mx-auto h-8 mt-4 mb-[-0.5rem]'
					text='Submit Ticket'
					type='submit'
					click={handleSubmit(submitMe)}></common.ActionButton>
			</form>
		</div>
	)
}

export default EditTicketComponent
