import React, { useEffect } from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useDispatch } from 'react-redux'
import { deleteTicket } from './ticketSlice'
ChartJS.register(ArcElement, Tooltip, Legend)

const TicketCard = (props) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const openTicketPage = () => {
		navigate(`/ticket/${props.ticket._id}`)
		props.close()
	}
	const deleteOne = () => {
		dispatch(deleteTicket(props.ticket._id))
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (props.ticket !== null) {

		return (
			<div className='grid grid-cols-4 h-fit w-fit'>
				<div className='col-span-4 flex justify-between pb-4'>
					<h1 className='w-full text-3xl font-semibold'>
						{props.ticket.ticket_name}
						<common.FontAwesomeIcon
							className='cursor-pointer text-edit-pad hover:text-edit-pad-hover pl-4 pb-1 text-2xl'
							icon='fa-solid fa-edit'
							onClick={props.edit}></common.FontAwesomeIcon>
					</h1>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
				</div>
				<div className='col-span-4 flex flex-col justify-between border border-rich-black p-2'>
					{/**Information about ticket */}
					<div className='flex justify-between flex-wrap'>
						<div className='flex flex-col space-y-4 text-left px-4 py-2'>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Description</h2>
								<p>{props.ticket.ticket_description}</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Current Status</h2>
								<p>{props.ticket.ticket_status}</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Priority</h2>
								<p>{props.ticket.ticket_priority}</p>
							</div>
						</div>
						<div className='flex flex-col space-y-4 text-left px-4 py-2'>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Type</h2>
								<p>{props.ticket.ticket_type}</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Steps to replicate</h2>
								<p>{props.ticket.ticket_steps}</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<h2 className='font-semibold'>Created By</h2>
								<p>{`${props.ticket.ticket_creator.first_name} ${props.ticket.ticket_creator.last_name}`}</p>
							</div>
						</div>
					</div>

					{/**Employees assigned to it */}
					<div></div>
				</div>
				<div className='grid grid-cols-4 col-span-4'>
					<div className='col-span-2 flex justify-start ml-[-1rem] mt-1'>
						<common.ActionButton
							type='cancel'
							text='Close'
							extraClass=''
							click={props.close}></common.ActionButton>
						<common.ActionButton
							text='Delete Ticket'
							click={deleteOne}
							type='delete'></common.ActionButton>
					</div>
					<div className='col-span-2 flex justify-end mr-[-1rem] mt-1'>
						<common.ActionButton
							type='edit'
							text='Edit Ticket'
							extraClass=''
							click={props.editTicket}></common.ActionButton>
						<common.ActionButton
							type='info'
							text='More Info'
							extraClass=''
							click={openTicketPage}></common.ActionButton>
					</div>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default TicketCard
