import React from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../auth/authSlice.js'
import { statusChartData, typeChartData } from './graphData.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'

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

	const deleteOne = () => {
		dispatch(deleteUser(props.employee._id))
		setTimeout(() => props.close(), 100)
	}

	const employeeGraph = () => {
		return (
			<div className='h-1/2 lg:h-full w-full flex flex-col rounded text-rich-black mx-2'>
				<div className='border-rich-black border rounded overflow-scroll no-scroll-bar min-h-full max-h-full bg-white'>
					<div className='grid grid-cols-4'>
						<span className='col-span-3 py-1 text-center flex flex-col justify-center border-b border-r border-rich-black'>
							<h1 className='truncate'>Employee Name</h1>
						</span>
						<span className='col-span-1 py-1 text-center border-b border-rich-black flex flex-col justify-center'>
							<h1 className='truncate'>Job</h1>
						</span>
					</div>
					{React.Children.toArray(
						props.employee.employees.map((employee) => {
							let iter = props.employee.employees.length - 1
							if (iter !== 0) {
								iter--
								return (
									<div
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
										tabIndex={props.employee.employees.length - iter}>
										<span className='p-2 border-r border-b border-rich-black col-span-3 truncate'>
											{employee.first_name + ' ' + employee.last_name}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1 truncate'>
											{employee.role}
										</span>
									</div>
								)
							} else {
								return (
									<div
										tabIndex={props.employee.employees.length - iter}
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'>
										<span className='p-2 border-r border-b border-rich-black col-span-3 truncate'>
											{employee.first_name + ' ' + employee.last_name}
										</span>
										<span className='p-2 border-b border-rich-black col-span-1 truncate'>
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
			<div className='max-h-fit relative min-w-[25vw] max-w-[85vw] lg:max-w-[60vw] 2xl:max-w-[50vw] grid grid-cols-4'>
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
					<div className='h-80 col-span-4 relative w-full flex justify-between flex-wrap lg:flex-nowrap p-2 space-y-2 lg:space-y-0'>
						{/* Employee Information Section */}
						<div className='h-1/2 lg:h-full border border-rich-black rounded text-rich-black mx-2 w-full overflow-scroll no-scroll-bar p-1'>
							<h3 className='text-base'>
								{/* {props.employee.employee_description} */}
								insert employee info here
							</h3>
						</div>
						{/* Employee Table Section */}
						{/* {employeeGraph()} */}
						table here
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
						text='Delete Employee'
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
