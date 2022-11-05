import React from 'react'
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom'
import DashboardComponent from '../dashboard/dashboardComponent'
import EmployeesComponent from '../employees/employeesComponent'
import common from '../../common/commonImports'
import ProjectsComponent from '../projects/projectsComponent'
import ProjectDetails from '../projects/projectdetails/projectDetailsComponent'
import TicketDetails from '../tickets/ticketDetailsComponent'
import Layout from '../../common/layout'

const MyRoutes = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<DashboardComponent />} />
					<Route path='/projects' element={<ProjectsComponent />} />
					<Route path='/project/:id' element={<ProjectDetails />} />
					<Route path='/ticket/:id' element={<TicketDetails />} />
					<Route path='/employees' element={<EmployeesComponent />} />
					<Route path='*' element={<common.ErrorPageComponent />} />
				</Route>
			</Routes>
		</HashRouter>
	)
}

export default MyRoutes
