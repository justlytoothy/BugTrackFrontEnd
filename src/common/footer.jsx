import React from 'react'
import logo from '../images/exLogo.png'

const Footer = (props) => {
	return (
		<div className='pl-3 flex justify-between h-fit w-full border-t border-slate-gray pt-2'>
			<img
				alt='My Example Logo'
				src={logo}
				width='80px'
				className='block'></img>
			<span className='flex flex-col justify-end mb-2'>
				<a
					className='text-black mr-2'
					href='https://github.com/justlytoothy/BugTrack'>
					https://github.com/justlytoothy/BugTrack
				</a>
			</span>
			<span className='flex flex-col justify-end mb-2'>
				<p className='text-black mr-2'>
					&copy; Copyright 2022, Jakob Schilling
				</p>
			</span>
		</div>
	)
}

export default Footer
