import React, { useEffect, useState } from 'react';
import common from './commonImports';
import { useSelector, useDispatch } from 'react-redux';
import { getName, logoutUser } from '../features/auth/authSlice';
import { CSSTransition } from 'react-transition-group';
import logo from '../images/exLogo.png';

const NavBar = (props) => {
	const dispatch = useDispatch();
	const fullName = useSelector(getName);
	const nodeRef = React.useRef(null);
	const [openDropdown, setOpenDropdown] = useState(false);
	const toggleOpenDropdown = () => {
		setOpenDropdown(!openDropdown);
	};
	const getCaretClass = () => {
		if (openDropdown) {
			return '-rotate-180';
		}
		return '';
	};
	useEffect(() => {
		if (openDropdown) {
			toggleOpenDropdown();
		}
	}, [props.closeDropdown]);

	function logout() {
		dispatch(logoutUser());
	}
	return (
		<div className='text-white bg-navbar-color items-center text-lg md:text-xl h-12 flex justify-between px-4 -mr-2'>
			<common.FontAwesomeIcon
				className='text-2xl md:text-3xl cursor-pointer lg:hidden'
				icon='bars'
				onClick={props.openIt}
			/>
			<img
				alt='My Example Logo'
				src={logo}
				width='120px'
				className='hidden lg:block'></img>
			<div>
				<div className='flex justify-end w-fit items-center'>
					<div
						className='flex space-x-3 cursor-pointer'
						onClick={toggleOpenDropdown}>
						<div className='flex flex-col justify-center'>
							<common.FontAwesomeIcon
								className='text-2xl md:text-3xl cursor-pointer hidden sm:block'
								icon='fa-regular fa-circle-user'
								onClick={toggleOpenDropdown}
							/>
						</div>
						<span className='hidden sm:block'>{fullName}</span>
						<span className='sm:hidden'>
							<div className='flex flex-col justify-center'>
								<common.FontAwesomeIcon
									className='text-2xl md:text-3xl cursor-pointer'
									icon='fa-regular fa-circle-user'
									onClick={toggleOpenDropdown}
								/>
							</div>
						</span>
						<div className='flex flex-col justify-center'>
							<common.FontAwesomeIcon
								className={
									'text-xl transition-all ' + getCaretClass()
								}
								icon='caret-down'
							/>
						</div>
					</div>
				</div>
				<CSSTransition
					in={openDropdown}
					timeout={{
						enter: 10,
						exit: 220,
					}}
					classNames={{
						enter: 'scale-y-0',
						enterActive: 'scale-y-100',
						enterDone: 'scale-y-100',
						exit: 'scale-y-0',
						exitActive: 'scale-y-0',
						exitDone: 'scale-y-0',
					}}
					unmountOnExit
					nodeRef={nodeRef}>
					<div
						ref={nodeRef}
						className='bg-sidebar-color border-[0.07rem] border-rich-black md:ml-2 h-fit sm:w-44 absolute top-12 transition-all origin-top rounded-t-none rounded-b-md text-rich-black'>
						<ul className='text-center sm:text-left'>
							<li className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								This option
							</li>
							<li className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								This option
							</li>
							<li
								onClick={logout}
								className='cursor-pointer hover:bg-sidebar-button hover:text-white py-1 px-1'>
								<p className='hidden sm:block'>Log Out</p>
								<common.FontAwesomeIcon
									icon='fa-arrow-right-from-bracket'
									className='cursor-pointer text-2xl md:text-3xl sm:hidden hover:bg-sidebar-button hover:text-white px-1'></common.FontAwesomeIcon>
							</li>
						</ul>
					</div>
				</CSSTransition>
			</div>
		</div>
	);
};

export default NavBar;
