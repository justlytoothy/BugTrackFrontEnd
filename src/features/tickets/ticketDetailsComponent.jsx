import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import moment from 'moment'

import {
	refreshTicketStatus,
	getTicket,
	getSelectedTicket,
} from './ticketSlice'
import { newComment, refreshCommentStatus } from '../comments/commentSlice'
import { CSSTransition } from 'react-transition-group'
import common from '../../common/commonImports'
import Modal from 'react-modal'

const TicketDetails = (props) => {
	const closeIt = useOutletContext()
	const { id } = useParams()
	const [showDetails, setShowDetails] = useState(false)
	const [selectedComment, setSelectedComment] = useState()
	const [modalIsOpen, setIsOpen] = useState(false)
	const nodeRef = React.useRef(null)

	const dispatch = useDispatch()
	const ticket = useSelector(getSelectedTicket)
	const refreshTicket = useSelector(refreshTicketStatus)
	const refreshComment = useSelector(refreshCommentStatus)
	useEffect(() => {
		dispatch(getTicket(id))
	}, [refreshTicket, refreshComment])
	Modal.setAppElement('#root')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const listComments = () => {
		let commentList = Array.from(ticket.ticket_comments)
		commentList.reverse()
		return (
			<div className='border-rich-black border overflow-scroll no-scroll-bar min-h-[20rem] max-h-[20rem] bg-white flex flex-col-reverse py-2'>
				{React.Children.toArray(
					commentList.map((comment) => {
						return (
							<div className='flex justify-end ml-4 my-4 pr-8'>
								<div className='p-2 w-1/2'>
									<p className='text-xs text-right font-extralight'>
										{moment(comment.created_at).format('MMMM Do YYYY, h:mm a')}
										&nbsp;&nbsp;&nbsp;
										{`${comment.creator.first_name} ${comment.creator.last_name}`}
									</p>
									<div className='border border-rich-black px-2 py-1'>
										{comment.message}
									</div>
								</div>
							</div>
						)
					})
				)}
			</div>
		)
	}

	const submitMe = (message) => {
		message.ticket_id = ticket._id
		dispatch(newComment(message))
		document.getElementById('comment').reset()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (Object.keys(ticket).length > 0) {
		return (
			<div
				className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
					<span className='self-center'>{`Details of ${ticket.ticket_name}`}</span>
				</div>
				<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
					<div className='col-span-8 max-h-fit min-h-[45rem] border-4 border-margencito w-[95%] mx-auto p-2'>
						<div className='grid grid-cols-8'>
							<div className='min-h-[20rem] grid grid-cols-4 border border-rich-black p-2 col-span-8'>
								<h1 className='text-2xl col-span-4 text-center'>
									Ticket Information
								</h1>
								<div className='flex col-span-4 justify-between px-16 flex-wrap text-lg'>
									<div className='flex flex-col space-y-4 text-left px-4 py-2'>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Description</h2>
											<p>{ticket.ticket_description}</p>
										</div>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Current Status</h2>
											<p>{ticket.ticket_status}</p>
										</div>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Priority</h2>
											<p>{ticket.ticket_priority}</p>
										</div>
									</div>
									<div className='flex flex-col space-y-4 text-left px-4 py-2'>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Type</h2>
											<p>{ticket.ticket_type}</p>
										</div>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Steps to replicate</h2>
											<p>{ticket.ticket_steps}</p>
										</div>
										<div className='flex flex-col space-y-2'>
											<h2 className='font-semibold'>Created By</h2>
											<p>{`${ticket.ticket_creator.first_name} ${ticket.ticket_creator.last_name}`}</p>
										</div>
									</div>
								</div>
							</div>
							<div className='col-span-8'>
								<h1 className='text-center font-semibold text-2xl mt-2 mb-1'>
									Comments
								</h1>

								{listComments()}
								<div className='min-w-full mt-1 flex justify-end h-8'>
									<form
										id='comment'
										onSubmit={handleSubmit(submitMe)}
										className='w-3/4 h-8'>
										<input
											className='h-full w-full px-2 border border-rich-black'
											type='text'
											placeholder='Leave a comment'
											name='message'
											{...register('message')}
										/>
									</form>
									<div className='flex flex-col justify-center'>
										<common.ActionButton
											extraClass='text-base h-fit'
											text='Send'
											type='submit'
											click={handleSubmit(submitMe)}></common.ActionButton>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-span-8 items-center text-xl'></div>

					<Modal
						className='bg-midnight-blue text-white h-1/2 fixed w-[30vw] right-[35vw] left-[35vw] top-1/4 bottom-1/4'
						overlayClassName=''
						isOpen={modalIsOpen}
						contentLabel='New Ticket Form'></Modal>
				</div>
			</div>
		)
	} else {
		return <common.SpinnerPage closeIt={closeIt}></common.SpinnerPage>
	}
}

export default TicketDetails
