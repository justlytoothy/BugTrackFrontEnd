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
	projectStatus,
} from './projectSlice.js'

const ProjectsComponent = (props) => {
	const closeIt = useOutletContext()
	const projectArray = useSelector(allProjects)
	const refreshStat = useSelector(refreshStatus)
	const loading = useSelector(projectStatus)
	const [selectedProject, setSelectedProject] = useState()
	const [showDetails, setShowDetails] = useState(false)
	const dispatch = useDispatch()
	const [modalIsOpen, setIsOpen] = useState(false)
	const [editIsOpen, setEditIsOpen] = useState(false)
	const nodeRef = React.useRef(null)
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

	const deleteOne = () => {
		dispatch(deleteProject(selectedProject._id))
	}
	const showProject = (project) => {
		setSelectedProject(project)
		openDetails()
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
			<div className='overflow-scroll no-scroll-bar min-h-[35rem] max-h-[35rem] 2xl:min-h-[50rem] 2xl:max-h-[50rem] border-4 border-margencito w-[95%] mx-auto'>
				<div className='grid grid-cols-7 text-rich-black font-semibold text-lg border-gray-border whitespace-nowrap'>
					<span className='col-span-7 sm:col-span-2 text-center sm:text-left px-5 py-2 border-r border-b border-l border-t border-gray-border truncate'>
						Project Name
					</span>
					<span className='hidden sm:block sm:col-span-3 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
						Assigned Employees
					</span>
					<span className='hidden sm:block sm:col-span-2 px-5 py-2 border-t border-b border-r border-gray-border truncate'>
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
									className='grid grid-cols-7 hover:bg-white-filled cursor-pointer active:bg-rich-black active:text-white focus:bg-rich-black focus:text-white h-full w-full text-base'>
									<span className='col-span-7 sm:col-span-2 text-center sm:text-left justify-left px-5 py-2 border-r border-t border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='hidden sm:block sm:col-span-3 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
										{listEmployees(project.employees)}
									</span>
									<span className='hidden sm:block sm:col-span-2 justify-left px-5 py-2 border-r border-t border-gray-border truncate'>
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
									<span className='col-span-7 text-center sm:text-left sm:col-span-2 justify-left px-5 py-2 border-r border-t border-b border-l border-gray-border truncate'>
										{project.project_name}
									</span>
									<span className='hidden sm:block sm:col-span-3 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
										{listEmployees(project.employees)}
									</span>
									<span className='hidden sm:block sm:col-span-2 justify-left px-5 py-2 border-r border-t border-b border-gray-border truncate'>
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
	if (!loading) {
		return (
			<div
				className='bg-back-color w-full grid grid-cols-2 min-h-full rounded border-2 border-rich-black'
				onClick={closeIt}>
				<div className='col-span-2 h-full'>
					<div className='w-full flex justify-center content-center text-2xl lg:text-3xl font-semibold col-span-2 py-4'>
						<span className='self-center'>Projects</span>
					</div>
					<div className='w-full min-h-full grid grid-cols-8'>
						<div className='col-span-8'>
							{listProjects()}
							<div className='flex flex-col justify-end pt-2'>
								<span className='ml-6 mr-6 h-fit flex justify-between'>
									<common.ActionButton
										text={<div>New Project</div>}
										type='new'
										click={openForm}
										extraClass=''></common.ActionButton>
									<common.ActionButton
										text='Delete Project'
										click={deleteOne}
										type='delete'></common.ActionButton>
								</span>
							</div>
						</div>
					</div>
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
					isOpen={showDetails}
					onRequestClose={closeDetails}
					contentLabel='View Project'>
					<ProjectCard
						project={selectedProject}
						editProject={openEditForm}
						show={showDetails}
						close={closeDetails}></ProjectCard>
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
						close={closeEditForm}
						closeParent={closeDetails}></EditProjectComponent>
				</Modal>
			</div>
		)
	} else {
		return <common.SpinnerPage closeIt={closeIt}></common.SpinnerPage>
	}
}

export default ProjectsComponent
