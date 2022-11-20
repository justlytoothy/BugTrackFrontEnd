import React from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../auth/authSlice.js'
import { statusChartData, typeChartData } from './graphData.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useEffect } from 'react'

///////////////////
///////////////////
const EmployeeInfoModal = (props) => {
	const dispatch = useDispatch()

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
	useEffect(() => {
		console.log(props.employee)
	}, [])
	const deleteOne = () => {
		dispatch(deleteUser(props.employee._id))
		setTimeout(() => props.close(), 100)
	}

	const openEmployeePage = () => {
		window.location.href = `/employee/${props.employee._id}`
		props.close()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (props.employee !== null) {
		return (
			<div className='max-h-[90vh] h-fit relative min-w-[25vw] max-w-[85vw] lg:max-w-[60vw] 2xl:max-w-[50vw] grid grid-cols-4'>
				<div className='col-span-4 pb-4 flex justify-between'>
					<h1 className='w-full mt-4 pl-8 text-3xl font-semibold'>
						{props.employee.first_name + ' ' + props.employee.last_name}
						<common.FontAwesomeIcon
							className='cursor-pointer text-edit-pad hover:text-edit-pad-hover pl-4 pb-1 text-2xl'
							icon='fa-solid fa-edit'
							onClick={props.editEmployee}></common.FontAwesomeIcon>
					</h1>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
				</div>
				<div className='col-span-4 grid grid-cols-4 border border-rich-black rounded p-2'>
					<div className='col-span-4 flex flex-col justify-between border border-rich-black p-2'>
						{/**Information about employee */}
						<div className='flex justify-between flex-wrap'>
							<div className='flex flex-col space-y-4 text-left px-4 py-2'>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Preferred Name</h2>
									<p>{props.employee.preferred_full_name}</p>
								</div>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Employee Role</h2>
									<p>{props.employee.role}</p>
								</div>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Date Hired</h2>
									<p>
										{new Date(props.employee.created_at).toLocaleDateString(
											'en-US'
										)}
									</p>
								</div>
							</div>
							<div className='flex flex-col space-y-4 text-left px-4 py-2'>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Assigned Projects</h2>
									<p>{props.employee.assigned_projects.length}</p>
								</div>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Assigned Tickets</h2>
									<p>{props.employee.assigned_tickets.length}</p>
								</div>
								<div className='flex flex-col space-y-2'>
									<h2 className='font-semibold'>Created Tickets</h2>
									<p>{props.employee.created_tickets.length}</p>
								</div>
							</div>
						</div>

						<div></div>
					</div>
					<div className='col-span-4 flex justify-evenly mt-2'>
						<div className='h-36 lg:h-52 flex justify-between w-[47%] p-2 border border-rich-black'>
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
								data={statusChartData(props.employee)}></Doughnut>
						</div>
						<div className='h-36 lg:h-52 flex justify-between w-[47%] p-2 border border-rich-black'>
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
								data={typeChartData(props.employee)}></Doughnut>
						</div>
					</div>
				</div>
				<div className='col-span-3 ml-[-1rem] mt-1'>
					<common.ActionButton
						type='cancel'
						text='Close'
						extraClass=''
						click={props.close}></common.ActionButton>
					<common.ActionButton
						text='Terminate'
						click={deleteOne}
						type='delete'></common.ActionButton>
				</div>
				<div className='col-span-1 flex justify-end mr-[-1rem] mt-1'>
					<common.ActionButton
						type='info'
						text='Edit Employee'
						extraClass=''
						click={props.editEmployee}></common.ActionButton>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default EmployeeInfoModal

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
