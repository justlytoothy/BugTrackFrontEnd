import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProject, getSelectedProject, refreshStatus } from '../projectSlice'
import { refreshTicketStatus, deleteTicket } from '../../tickets/ticketSlice'
import { CSSTransition } from 'react-transition-group'
import common from '../../../common/commonImports'
import NewTicketComponent from '../../tickets/newTicketComponent'
import Modal from 'react-modal'
import TicketCard from '../../tickets/ticketCardComponent'
import { Doughnut } from 'react-chartjs-2'
import EditTicketComponent from '../../tickets/editTicketComponent'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import {
	statusChartData,
	typeChartData,
	priorityChartData,
} from '../graphData.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)
//Chart Default Sizes Responsive
ChartJS.overrides['doughnut'].plugins.legend.position = 'right'
if (window.innerWidth >= 1440) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 15,
	}
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 23,
	}
} else if (window.innerWidth >= 1024) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 12,
	}
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 20,
	}
} else if (window.innerWidth >= 768) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 10,
	}
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 18,
	}
} else {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 7,
	}
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 15,
	}
}
///////////////////
///////////////////

const ProjectDetails = (props) => {
	const closeIt = useOutletContext()
	const { id } = useParams()
	const [selectedTicket, setSelectedTicket] = useState(null)
	const [showDetails, setShowDetails] = useState(false)
	const [modalIsOpen, setIsOpen] = useState(false)
	const [editTicket, setEditTicket] = useState(false)
	const nodeRef = React.useRef(null)
	const dispatch = useDispatch()
	const refresh = useSelector(refreshStatus)
	const refreshTicket = useSelector(refreshTicketStatus)
	const project = useSelector(getSelectedProject)
	useEffect(() => {
		dispatch(getProject(id))
		setTimeout(() => dispatch(getProject(id)), 100)
	}, [refresh, refreshTicket])
	Modal.setAppElement('#root')

	/**
	 * Responsively change font size of chart title and legend labels
	 */
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 1440) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 15,
			}
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 23,
			}
		} else if (window.innerWidth >= 1024) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 12,
			}
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 20,
			}
		} else if (window.innerWidth >= 768) {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 10,
			}
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 18,
			}
		} else {
			ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
				...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
				size: 7,
			}
			ChartJS.defaults.plugins.title.font = {
				...ChartJS.defaults.plugins.title.font,
				size: 15,
			}
		}
	})

	const openForm = () => {
		setIsOpen(true)
	}
	const closeForm = () => {
		setIsOpen(false)
	}
	const showTicket = (ticket) => {
		setSelectedTicket(ticket)
		openDetails()
	}
	const openDetails = () => {
		setShowDetails(true)
	}
	const closeDetails = () => {
		setShowDetails(false)
	}

	const deleteSelectedTicket = () => {
		if (selectedTicket !== null) {
			dispatch(deleteTicket(selectedTicket))
		}
	}
	const openEditTicket = () => {
		setEditTicket(true)
	}
	const closeEditTicket = () => {
		setEditTicket(false)
	}

	const listTickets = () => {
		return (
			<div className='border-rich-black border overflow-scroll no-scroll-bar min-h-[15rem] max-h-[15rem] 2xl:min-h-[20rem] 2xl:max-h-[20rem] bg-white'>
				<div className='grid grid-cols-8 text-xl'>
					<span className='col-span-2 p-2 border-y border-r border-rich-black'>
						Ticket Name
					</span>
					<span className='col-span-1 p-2 border-y border-r border-rich-black'>
						Status
					</span>
					<span className='col-span-1 p-2 border-y border-r border-rich-black'>
						Type
					</span>
					<span className='col-span-2 p-2 border-y border-r border-rich-black'>
						Submitted By
					</span>
					<span className='col-span-2 p-2 border-y border-rich-black'>
						Assigned To
					</span>
				</div>
				{React.Children.toArray(
					project.tickets.map((ticket) => {
						let iter = project.tickets.length - 1
						if (iter !== 0) {
							iter--
							return (
								<div
									className='grid grid-cols-8 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'
									tabIndex={project.tickets.length - iter}
									onClick={() => showTicket(ticket)}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{ticket.ticket_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_status}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_type}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{`${ticket.ticket_creator.first_name} ${ticket.ticket_creator.last_name}`}
									</span>
									<span className='p-2 border-b border-rich-black col-span-2'>
										{`${ticket.assigned_employees[0].first_name} ${ticket.assigned_employees[0].last_name}`}
									</span>
								</div>
							)
						} else {
							return (
								<div
									tabIndex={project.tickets.length - iter}
									className='grid grid-cols-8 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white'
									onClick={() => showTicket(ticket)}>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{ticket.ticket_name}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_status}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-1'>
										{ticket.ticket_type}
									</span>
									<span className='p-2 border-r border-b border-rich-black col-span-2'>
										{`${ticket.ticket_creator.first_name} ${ticket.ticket_creator.last_name}`}
									</span>
									<span className='p-2 border-b border-rich-black col-span-2'>
										{`${ticket.assigned_employees[0].first_name} ${ticket.assigned_employees[0].last_name}`}
									</span>
								</div>
							)
						}
					})
				)}
			</div>
		)
	}

	const listEmployees = () => {
		return (
			<div className='overflow-scroll no-scroll-bar min-h-[17rem] 2xl:min-h-[23rem] bg-white'>
				<div className='grid grid-cols-4'>
					<span className='col-span-2 p-2 border-b border-r border-rich-black text-xl'>
						Employee Name
					</span>
					<span className='col-span-1 p-2 border-b border-r border-rich-black text-xl'>
						Job
					</span>
					<span className='col-span-1 p-2 border-b border-rich-black text-xl'>
						Tickets
					</span>
				</div>
				<div className='min-h-[17rem] max-h-[17rem] 2xl:min-h-[23rem] 2xl:max-h-[23rem] overflow-scroll no-scroll-bar'>
					{React.Children.toArray(
						project.employees.map((employee) => {
							let iter = project.employees.length - 1
							if (iter !== 0) {
								iter--
								return (
									<div
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
										tabIndex={project.employees.length - iter}>
										<span className='p-2 border-r border-b border-rich-black col-span-2'>
											{employee.first_name + ' ' + employee.last_name}
										</span>
										<span className='p-2 border-r border-b border-rich-black col-span-1'>
											{employee.role}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1'>
											{employee.role}
										</span>
									</div>
								)
							} else {
								return (
									<div
										tabIndex={project.employees.length - iter}
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'>
										<span className='p-2 border-r border-b border-rich-black col-span-2'>
											{employee.first_name + ' ' + employee.last_name}
										</span>
										<span className='p-2 border-r border-b border-rich-black col-span-1'>
											{employee.role}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1'>
											{employee.role}
										</span>
									</div>
								)
							}
						})
					)}
				</div>
			</div>
		)
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (Object.keys(project).length > 0) {
		return (
			<div
				className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-3xl font-semibold'>
					<span className='self-center'>{`${project.project_name}`}</span>
				</div>
				<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
					<div className='col-span-8 max-h-fit min-h-[45rem] border-4 border-margencito w-[95%] mx-auto p-4'>
						<div className='grid grid-cols-8'>
							<div className='col-span-8 flex flex-row justify-between'>
								<div className='grid grid-cols-4 border min-h-[17rem] 2xl:min-h-[23rem] border-rich-black p-2 w-[49%]'>
									<div className='col-span-4 flex flex-col'>
										<h1 className='text-2xl w-full border-b border-rich-black text-center'>
											Project Description
										</h1>
										<div className='text-xl pt-2 max-h-[17rem] 2xl:max-h-[23rem] overflow-scroll no-scroll-bar'>
											{project.project_description}
										</div>
									</div>
								</div>
								<div className='border-rich-black border w-[49%]'>
									{listEmployees()}
								</div>
							</div>
							<div className='col-span-8 flex flex-col'>
								<div className='mt-4 border border-rich-black'>
									<h1 className='py-2 text-2xl col-span-4 text-center'>
										Tickets
									</h1>
								</div>
								{listTickets()}
							</div>
							<div className='col-span-8 flex justify-between mt-2'>
								<div className='h-36 lg:h-52 flex justify-between w-[32%] p-2 border border-rich-black'>
									<Doughnut
										options={{
											maintainAspectRatio: false,
											responsive: true,
											aspectRatio: 1,
											plugins: {
												title: {
													display: true,
													text: 'Ticket Status',
												},
											},
										}}
										data={statusChartData(project)}></Doughnut>
								</div>
								<div className='h-36 lg:h-52 flex justify-between w-[32%] p-2 border border-rich-black'>
									<Doughnut
										options={{
											maintainAspectRatio: false,
											responsive: true,
											aspectRatio: 1,
											plugins: {
												title: {
													display: true,
													text: 'Ticket Priority',
												},
											},
										}}
										data={priorityChartData(project)}></Doughnut>
								</div>
								<div className='h-36 lg:h-52 flex justify-between w-[32%] p-2 border border-rich-black'>
									<Doughnut
										options={{
											maintainAspectRatio: false,
											responsive: true,
											aspectRatio: 1,
											plugins: {
												title: {
													display: true,
													text: 'Ticket Types',
												},
											},
										}}
										data={typeChartData(project)}></Doughnut>
								</div>
							</div>
						</div>
					</div>

					<div className='col-span-8 items-center text-xl'>
						<span className='items-center py-2 ml-6 mr-6 h-fit flex justify-between'>
							<common.ActionButton
								text={<div>New Ticket</div>}
								click={openForm}
								type='submit'
								extraClass=''></common.ActionButton>
							<common.ActionButton
								text={<div className=''>Delete Ticket</div>}
								type='delete'
								click={deleteSelectedTicket}></common.ActionButton>
						</span>
					</div>

					<Modal
						overlayClassName='fix-modal-overlay'
						className='fix-modal'
						style={{
							content: {
								WebkitOverflowScrolling: 'touch',
							},
						}}
						isOpen={modalIsOpen}
						onRequestClose={closeForm}
						contentLabel='New Ticket Form'>
						<NewTicketComponent
							project_id={project._id}
							close={closeForm}></NewTicketComponent>
					</Modal>
					<Modal
						overlayClassName='fix-modal-overlay'
						className='fix-modal'
						style={{
							content: {
								WebkitOverflowScrolling: 'touch',
							},
						}}
						isOpen={showDetails}
						onRequestClose={closeDetails}
						contentLabel='Ticket Info'>
						<TicketCard
							ticket={selectedTicket}
							show={showDetails}
							edit={openEditTicket}
							close={closeDetails}></TicketCard>
					</Modal>
					<Modal
						overlayClassName='fix-modal-overlay'
						className='fix-modal'
						style={{
							content: {
								WebkitOverflowScrolling: 'touch',
							},
						}}
						isOpen={editTicket}
						onRequestClose={closeEditTicket}
						contentLabel='Edit Project'>
						<EditTicketComponent
							project={selectedTicket}
							close={closeEditTicket}
							closeParent={closeDetails}></EditTicketComponent>
					</Modal>
				</div>
			</div>
		)
	} else {
		return <common.SpinnerPage closeIt={closeIt}></common.SpinnerPage>
	}
}

export default ProjectDetails
