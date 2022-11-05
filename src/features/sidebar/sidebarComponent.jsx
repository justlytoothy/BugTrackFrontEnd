import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarItems from './sidebarItems';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

const Sidebar = (props, { defaultActive }) => {
	const dispatch = useDispatch();
	const [isBig, setIsBig] = useState(false);
	let width = window.innerWidth;

	let onLoad = 0;
	const nodeRef = React.useRef(null);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 1024) {
				setIsBig(false);
			} else {
				setIsBig(true);
			}
		};
		if (onLoad < 1) {
			handleResize();
			onLoad++;
		}
		window.addEventListener('resize', handleResize);
	});
	let smallScreen = (
		<CSSTransition
			in={props.open}
			timeout={{
				enter: 10,
				exit: 220,
			}}
			classNames={{
				enter: 'scale-x-0',
				enterActive: 'scale-x-100',
				enterDone: 'scale-x-100',
				exit: 'scale-x-0',
				exitActive: 'scale-x-0',
				exitDone: 'scale-x-0',
			}}
			unmountOnExit
			nodeRef={nodeRef}>
			<div
				ref={nodeRef}
				className='bg-sidebar-color w-64 min-h-full flex flex-col z-50 transition-all motion-reduce:transition-none origin-left duration-300'>
				{SidebarItems.map((item, index) => {
					return (
						<NavLink
							to={item.route}
							key={item.name}
							onClick={props.closeIt}
							className={({ isActive }) =>
								isActive
									? 'bg-sidebar-button text-charred-charcoal font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
									: 'hover:bg-sidebar-button text-charred-charcoal font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
							}>
							{item.name}
						</NavLink>
					);
				})}
			</div>
		</CSSTransition>
	);
	let bigScreen = (
		<div
			ref={nodeRef}
			className='bg-sidebar-color w-64 min-h-full flex flex-col z-50 scale-x-100'>
			{SidebarItems.map((item, index) => {
				return (
					<NavLink
						to={item.route}
						key={item.name}
						onClick={props.closeIt}
						className={({ isActive }) =>
							isActive
								? 'bg-sidebar-button text-charred-charcoal font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
								: 'hover:bg-sidebar-button text-charred-charcoal font-bold text-xl py-4 px-4 transition-all duration-100 ease-in-out my-1 rounded cursor-pointer w-full'
						}>
						{item.name}
					</NavLink>
				);
			})}
		</div>
	);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (isBig) {
		return bigScreen;
	} else {
		return smallScreen;
	}
};

export default Sidebar;
