import React, { useState, useEffect } from 'react'
import common from '../../common/commonImports.js'
import NewProjectComponent from './newProjectComponent.jsx'
import Modal from 'react-modal'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCard from './projectCardComponent.jsx'
import { CSSTransition } from 'react-transition-group'
import EditProjectComponent from './editProjectComponent.jsx'
import {
	deleteProject,
	getAllProjects,
	allProjects,
	refreshStatus,
} from './projectSlice.js'

const ProjectsComponent = (props) => {
	const closeIt = useOutletContext()
	const projectArray = useSelector(allProjects)
	const refreshStat = useSelector(refreshStatus)
	const [selectedProject, setSelectedProject] = useState()
	const [showDetails, setShowDetails] = useState(false)
	const dispatch = useDispatch()
	const [modalIsOpen, setIsOpen] = useState(false)
	const [editIsOpen, setEditIsOpen] = useState(false)
	const nodeRef = React.useRef(null)

	const scrollMe = () => {
		if (!nodeRef) return
		// Get node coords from Ref
		const node = nodeRef.current.getBoundingClientRect().top + window.scrollY

		window.scroll({
			top: node,
			behavior: 'smooth',
		})
	}
	const scrollMeFirst = () => {
		nodeRef.current.scrollIntoView(true)
	}
	const toTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}
	Modal.setAppElement('#root')
	useEffect(() => {
		dispatch(getAllProjects())
	}, [refreshStat])

	const openForm = () => {
		setIsOpen(true)
	}
	const closeForm = () => {
		setIsOpen(false)
	}
	const openEditForm = () => {
		setEditIsOpen(true)
	}
	const closeEditForm = () => {
		setEditIsOpen(false)
	}
	const openDetails = () => {
		setShowDetails(true)
	}
	const closeDetails = () => {
		setShowDetails(false)
	}
	const closeDetailsScroll = () => {
		setShowDetails(false)
		setTimeout(() => toTop(), 100)
	}
	const deleteOne = () => {
		// console.log(sessionStorage.getItem('user'));
		dispatch(deleteProject(selectedProject._id))
		closeDetailsScroll()
	}
	const showProject = (project) => {
		if (project !== selectedProject && showDetails === true) {
			scrollMe()
			setTimeout(() => {
				closeDetails()
				setTimeout(() => {
					setSelectedProject(project)
					openDetails()
				}, 500)
			}, 250)
		} else {
			setSelectedProject(project)
			if (showDetails === true) {
				closeDetails()
			} else {
				setTimeout(() => scrollMeFirst(), 1)
				openDetails()
			}
		}
	}
	/**
	 * Takes an array of employee names and returns them put together as one string
	 * @param {*} empArray the array of employee names assigned to the specific project
	 * @returns
	 */
	const listEmployees = (empArray) => {
		let nameList = ''
		let first = true
		empArray.forEach((employee) => {
			if (first === true) {
				let name = `${employee.first_name} ${employee.last_name}`
				nameList = name
				first = false
			} else {
				let name = `${employee.first_name} ${employee.last_name}`
				nameList = nameList + ', ' + name
			}
		})
		return nameList
	}
	/**
	 * Takes in the fetched project array and iterates over it to display relevant data in the table
	 * @returns project table
	 */
	const listProjects = () => {
		let iter = projectArray.length - 1
		return (
			<div className='overflow-scroll no-scroll-bar max-h-[700px] min-h-[700px] border-4 border-margencito w-[95%] mx-auto'>
				<div className='grid grid-cols-7 text-rich-black font-bold border-gray-border whitespace-nowrap'>
					<span className='items-center flex justify-between col-span-2 px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Project Name
					</span>
					<span className='items-center flex justify-between col-span-3 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
						Assigned Employees
					</span>
					<span className='items-center flex justify-between col-span-2 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
						Project Description
					</span>
				</div>
				{React.Children.toArray(
					projectArray.map((project) => {
						if (iter !== 0) {
							iter--
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
										{listEmployees(project.employees)}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
										{project.project_description}
									</span>
								</div>
							)
						} else {
							return (
								<div
									tabIndex={projectArray.length - 1 - iter}
									onClick={() => showProject(project)}
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='col-span-3 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
										{listEmployees(project.employees)}
									</span>
									<span className='col-span-2 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
										{project.project_description}
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

	return (
		<div
			className='bg-back-color w-full flex flex-col min-h-[100vh] rounded border-2 border-rich-black'
			onClick={closeIt}>
			<div className='w-full min-h-[7%] py-4 flex justify-center content-center text-lg lg:text-3xl font-semibold'>
				<span className='self-center'>Projects</span>
			</div>
			<div className='w-full min-h-[93%] grid grid-cols-8 pb-4'>
				<div className='col-span-8 text-xl'>{listProjects()}</div>
				<div className='col-span-8 items-center text-xl'>
					<span className='items-center py-2 ml-6 mr-6 h-fit flex justify-between'>
						<common.ActionButton
							text={
								<div>
									New Project &nbsp;
									<common.FontAwesomeIcon
										className='text-midnight-blue text-xl'
										icon='fa-solid fa-square-plus'
									/>
								</div>
							}
							type='submit'
							click={openForm}
							extraClass=''></common.ActionButton>
						<common.ActionButton
							text='Delete Project'
							click={deleteOne}
							type='delete'></common.ActionButton>
					</span>
				</div>

				<CSSTransition
					in={showDetails}
					timeout={{
						enter: 0,
						exit: 500,
					}}
					unmountOnExit
					classNames={{
						enter:
							'scale-y-0 duration-300 transition-all motion-reduce:transition-none transform origin-center',
						enterActive:
							'scale-y-100 duration-300 transition-all motion-reduce:transition-none transform origin-center',
						enterDone:
							'scale-y-100 duration-300 transition-all motion-reduce:transition-none transform origin-center',
						exit: 'scale-y-0 duration-500 transition-all motion-reduce:transition-none transform origin-center',
						exitActive:
							'scale-y-0 duration-400 transition-all motion-reduce:transition-none transform origin-center',
						exitDone:
							'scale-y-0 duration-400 transition-all motion-reduce:transition-none transform origin-center',
					}}
					nodeRef={nodeRef}>
					<div
						ref={nodeRef}
						className='col-span-8 m-2 p-2 flex justify-center border-2 rounded h-fit border-rich-black text-xs sm:text-base lg:text-xl'>
						<ProjectCard
							project={selectedProject}
							editProject={openEditForm}
							show={showDetails}
							close={closeDetailsScroll}></ProjectCard>
					</div>
				</CSSTransition>
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
				contentLabel='New Project Form'>
				<NewProjectComponent close={closeForm}></NewProjectComponent>
			</Modal>
			<Modal
				overlayClassName='fix-modal-overlay'
				className='fix-modal'
				style={{
					content: {
						WebkitOverflowScrolling: 'touch',
					},
				}}
				isOpen={editIsOpen}
				onRequestClose={closeEditForm}
				contentLabel='Edit Project'>
				<EditProjectComponent
					project={selectedProject}
					close={closeEditForm}></EditProjectComponent>
			</Modal>
		</div>
	)
}

export default ProjectsComponent
