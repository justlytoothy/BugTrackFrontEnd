import React from 'react'
import common from '../../common/commonImports'
import { Doughnut } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { deleteProject } from './projectSlice'
import ChartJS, { resizeChecker } from '../../common/chartDefaults.js'
import { statusChartData, typeChartData } from './graphData.js'
import { useNavigate } from 'react-router-dom'

///////////////////
///////////////////
const ProjectCard = (props) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	/**
	 * Responsively change font size of chart title and legend labels
	 */
	window.addEventListener('resize', resizeChecker)

	const deleteOne = () => {
		dispatch(deleteProject(props.project._id))
		setTimeout(() => props.close(), 100)
	}

	const employeeGraph = () => {
		return (
			<div className='h-1/2 lg:h-full w-full flex flex-col text-rich-black mx-2'>
				<div className='border-rich-black border overflow-scroll no-scroll-bar min-h-full max-h-full bg-white'>
					<div className='grid grid-cols-4'>
						<span className='col-span-3 py-1 text-center flex flex-col justify-center border-b border-r border-rich-black'>
							<h1 className='truncate'>Employee Name</h1>
						</span>
						<span className='col-span-1 py-1 text-center border-b border-rich-black flex flex-col justify-center'>
							<h1 className='truncate'>Job</h1>
						</span>
					</div>
					{React.Children.toArray(
						props.project.employees.map((employee) => {
							let iter = props.project.employees.length - 1
							if (iter !== 0) {
								iter--
								return (
									<div
										className='grid grid-cols-4 hover:bg-white-filled focus:bg-white-filled cursor-pointer'
										tabIndex={props.project.employees.length - iter}>
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
										tabIndex={props.project.employees.length - iter}
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

	const openProjectPage = () => {
		navigate(`/project/${props.project._id}`)
		props.close()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//lg:max-h-[80vh] relative w-[95vw] h-[95vh] lg:min-w-[30vw] lg:max-w-[60vw] 2xl:max-w-[50vw]
	if (props.project !== null) {
		return (
			<div className='grid grid-cols-4 h-fit w-fit lg:max-h-[80vh] relative sm:min-w-[50vw] lg:max-w-[60vw] 2xl:max-w-[50vw]'>
				<div className='col-span-4 flex justify-between pb-4'>
					<h1 className='w-full text-3xl font-semibold'>
						{props.project.project_name}
						<common.FontAwesomeIcon
							className='cursor-pointer text-edit-pad hover:text-edit-pad-hover pl-4 pb-1 text-2xl'
							icon='fa-solid fa-edit'
							onClick={props.editProject}></common.FontAwesomeIcon>
					</h1>
					<common.FontAwesomeIcon
						className='cursor-pointer text-rich-black text-2xl'
						icon='fa-solid fa-xmark'
						onClick={props.close}></common.FontAwesomeIcon>
				</div>
				<div className='col-span-4 grid grid-cols-4 border border-rich-black p-2'>
					<div className='h-72 col-span-4 relative w-full flex justify-between flex-wrap lg:flex-nowrap p-2 space-y-2 lg:space-y-0'>
						{/* Project Information Section */}
						<div className='h-1/2 lg:h-full border border-rich-black text-rich-black mx-2 w-full overflow-scroll no-scroll-bar p-1'>
							<h3 className='text-base'>{props.project.project_description}</h3>
						</div>
						{/* Employee Table Section */}
						{employeeGraph()}
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
								data={statusChartData(props.project)}></Doughnut>
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
								data={typeChartData(props.project)}></Doughnut>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 col-span-4'>
					<div className='col-span-2 flex justify-start ml-[-1rem] mt-1'>
						<common.ActionButton
							type='cancel'
							text='Close'
							extraClass=''
							click={props.close}></common.ActionButton>
						<common.ActionButton
							text='Delete Project'
							click={deleteOne}
							type='delete'></common.ActionButton>
					</div>
					<div className='col-span-2 flex justify-end mr-[-1rem] mt-1'>
						<common.ActionButton
							type='edit'
							text='Edit Project'
							extraClass=''
							click={props.editProject}></common.ActionButton>
						<common.ActionButton
							type='info'
							text='More Info'
							extraClass=''
							click={openProjectPage}></common.ActionButton>
					</div>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default ProjectCard

// transition-all motion-reduce:transition-none transform origin-center duration-700 ' + cardClass()
