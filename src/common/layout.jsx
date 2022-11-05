import React, { useState } from 'react'
import Sidebar from '../features/sidebar/sidebarComponent'
import NavBar from './navbar'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
const Layout = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const openSidebar = () => {
		setIsOpen(!isOpen)
	}
	const onlyOpen = () => {
		setIsOpen(true)
	}
	const closeSidebar = () => {
		if (isOpen) {
			setIsOpen(false)
		}
		setDropdownIsOpen(!dropdownIsOpen)
	}

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-2'>
				<div className='col-span-2'>
					<NavBar closeDropdown={dropdownIsOpen} openIt={openSidebar} />
				</div>

				<div className='flex flex-row min-h-[98vh] w-full col-span-2'>
					<Sidebar onlyOpen={onlyOpen} open={isOpen} closeIt={closeSidebar} />
					<div className='p-8 w-full min-h-full'>
						<Outlet context={closeSidebar} />
					</div>
				</div>
				<div className='col-span-2'>
					<Footer />
				</div>
				{/* <Footer /> */}
			</div>
		</div>
	)
}

export default Layout
