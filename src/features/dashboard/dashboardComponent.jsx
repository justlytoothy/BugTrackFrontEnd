import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getName, listAllUsers, getUser } from '../auth/authSlice'
import common from '../../common/commonImports.js'
import { Doughnut, Pie } from 'react-chartjs-2'
import { useOutletContext, useNavigate } from 'react-router-dom'
import {
	allStatusChartData,
	allTypeChartData,
	allPriorityChartData,
} from '../projects/graphData'

import {
	getAllProjects,
	allProjects,
	refreshStatus,
	projectStatus,
} from '../projects/projectSlice.js'
import ChartJS, { resizeChecker } from '../../common/chartDefaults'

const DashboardComponent = (props) => {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	/**
	 * Responsively change font size of chart title and legend labels
	 */
	window.addEventListener('resize', resizeChecker)
	/**
	 * End responsive chart sizing
	 */
	const projectArray = useSelector(allProjects)
	const refreshStat = useSelector(refreshStatus)
	const loading = useSelector(projectStatus)
	const currName = useSelector(getName)
	const closeIt = useOutletContext()
	let bruh = useSelector(getUser)
	let pageLoading = false
	useEffect(() => {
		dispatch(getAllProjects())
		pageLoading = true
		setTimeout(() => {
			pageLoading = false
		}, 200)
	}, [refreshStat])

	// const getUser = () => {
	// 	const bruh = dispatch(listAllUsers())
	// }

	const isAssigned = (ticket) => {
		let fin = false
		ticket.assigned_employees.forEach((emp) => {
			if (`${emp.first_name} ${emp.last_name}` == currName) {
				fin = true
			}
		})
		return fin
	}
	const getTickets = () => {
		let myTickets = []
		projectArray.forEach((proj) => {
			proj.tickets.forEach((tick) => {
				if (isAssigned(tick)) {
					myTickets.push(tick)
				}
			})
		})
		return myTickets
	}
	const openProjectPage = (project) => {
		navigate(`/project/${props.project._id}`)

	}

	/**
	 * Takes in the fetched project array and iterates over it to display relevant data in the table
	 * @returns project table
	 */
	const listProjects = () => {
		let filteredArray = projectArray.filter((proj) => proj.tickets.length > 0)
		let iter = filteredArray.length - 1
		return (
			<div className='overflow-scroll no-scroll-bar w-full p-2 h-fit'>
				<h3 className='text-center font-semibold text-xl mb-4'>
					Active Projects
				</h3>
				<div className='grid grid-cols-9 text-rich-black font-semibold text-lg whitespace-nowrap h-fit'>
					<span className='col-span-3 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Project Name
					</span>
					<span className='col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Open Tickets
					</span>
					<span className='col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						On Hold Tickets
					</span>
					<span className='col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Closed Tickets
					</span>
				</div>
				{React.Children.toArray(
					filteredArray.map((project) => {
						if (iter !== 0) {
							iter--
							return (
								<div
									tabIndex={filteredArray.length - 1 - iter}
									onClick={() => openProjectPage(project)}
									className='grid grid-cols-9 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'Open' && isAssigned(tick)
											).length
										}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'On Hold' && isAssigned(tick)
											).length
										}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'Closed' && isAssigned(tick)
											).length
										}
									</span>
								</div>
							)
						} else {
							return (
								<div
									tabIndex={filteredArray.length - 1 - iter}
									onClick={() => openProjectPage(project)}
									className='grid grid-cols-9 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base bg-back-color'>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'Open' && isAssigned(tick)
											).length
										}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'On Hold' && isAssigned(tick)
											).length
										}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{
											project.tickets.filter(
												(tick) =>
													tick.ticket_status == 'Closed' && isAssigned(tick)
											).length
										}
									</span>
								</div>
							)
						}
					})
				)}
			</div>
		)
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (!loading && !pageLoading) {
		return (
			<div
				className='bg-back-color w-full grid grid-cols-2 min-h-full rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='col-span-2 h-full'>
					<div className='w-full flex justify-center content-center text-2xl lg:text-3xl font-semibold col-span-2 py-4'>
						<span className='self-center'>Dashboard</span>
					</div>
					<div className='w-full min-h-full grid grid-cols-8'>
						<div className='col-span-8'>
							<div className='overflow-scroll no-scroll-bar min-h-[30rem] max-h-[40rem] p-2 2xl:min-h-[45rem] 2xl:max-h-fit border-4 border-margencito w-[95%] mx-auto flex flex-col space-y-16'>
								{listProjects()}
								<div className='flex justify-evenly flex-wrap px-4 h-fit mb-4'>
									<div className='h-36 lg:h-52 flex justify-between w-[30%] p-2 border border-rich-black'>
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
											data={allStatusChartData(getTickets())}></Doughnut>
									</div>
									<div className='h-36 lg:h-52 flex justify-between w-[30%] p-2 border border-rich-black'>
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
											data={allPriorityChartData(getTickets())}></Doughnut>
									</div>
									<div className='h-36 lg:h-52 flex justify-between w-[30%] p-2 border border-rich-black'>
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
											data={allTypeChartData(getTickets())}></Doughnut>
									</div>
								</div>
							</div>
							<div className='flex flex-col justify-end pt-2'>
								<span className='ml-6 mr-6 h-fit flex justify-between'></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <common.SpinnerPage closeIt={closeIt}></common.SpinnerPage>
	}
}

export default DashboardComponent
