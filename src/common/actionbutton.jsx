import React from 'react'
import { FontAwesome } from './commonImports.js'
import './spinner.css'
const ActionButton = (props) => {
	let content = ''
	let text = props.text
	if (props.loading) {
		text = (
			<div>
				<div className='text-base dots'>
					<span>L</span>
					<span>o</span>
					<span>a</span>
					<span>d</span>
					<span>i</span>
					<span>n</span>
					<span>g</span>
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</div>
			</div>
		)
	}
	switch (props.type) {
		case 'submit':
			content = (
				<button
					onClick={props.click}
					// className={
					// 	props.extraClass +
					// 	' bg-color-3 w-fit h-8 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 m-2 whitespace-nowrap'
					// }
					className={
						props.extraClass +
						' whitespace-nowrap bg-color-3 w-fit text-white transition-all border border-solid rounded border-slate-gray font-bold font-sans text-sm sm:text-lg px-5 text-center hover:text-white hover:bg-button-hover disabled:opacity-50 disabled:hover:bg-white m-2'
					}>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-white text-xl sm:hidden py-1'
						icon='fa-solid fa-check'></FontAwesome>
				</button>
			)
			break
		case 'new':
			content = (
				<button
					onClick={props.click}
					// className={
					// 	props.extraClass +
					// 	' bg-color-3 w-fit h-8 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 m-2 whitespace-nowrap'
					// }
					className={
						props.extraClass +
						' whitespace-nowrap bg-color-3 w-fit text-white transition-all border border-solid rounded border-slate-gray font-bold font-sans text-sm sm:text-lg px-5 text-center hover:text-white hover:bg-button-hover disabled:opacity-50 disabled:hover:bg-white m-2'
					}>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-white text-xl sm:hidden py-1'
						icon='fa-solid fa-plus'></FontAwesome>
				</button>
			)
			break
		case 'info':
			content = (
				<button
					onClick={props.click}
					// className={
					// 	props.extraClass +
					// 	' bg-color-3 w-fit h-8 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 m-2 whitespace-nowrap'
					// }
					className={
						props.extraClass +
						' whitespace-nowrap bg-color-3 w-fit text-white transition-all border border-solid rounded border-slate-gray font-bold font-sans text-sm sm:text-lg px-5 text-center hover:text-white hover:bg-button-hover disabled:opacity-50 disabled:hover:bg-white m-2 max-h-8'
					}>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-white text-xl sm:hidden py-1'
						icon='fa-solid fa-circle-info'></FontAwesome>
				</button>
			)
			break
		case 'edit':
			content = (
				<button
					onClick={props.click}
					// className={
					// 	props.extraClass +
					// 	' bg-color-3 w-fit h-8 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 m-2 whitespace-nowrap'
					// }
					className={
						props.extraClass +
						' whitespace-nowrap bg-color-3 w-fit text-white transition-all border border-solid rounded border-slate-gray font-bold font-sans text-sm sm:text-lg px-5 text-center hover:text-white hover:bg-button-hover disabled:opacity-50 disabled:hover:bg-white m-2 max-h-8'
					}>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-white text-xl sm:hidden py-1'
						icon='fa-solid fa-pencil'></FontAwesome>
				</button>
			)
			break
		case 'cancel':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap w-fit text-slate-gray transition-all border border-solid rounded border-slate-gray font-bold font-sans text-sm sm:text-lg px-5 text-center lg:hover:text-white lg:hover:bg-slate-gray disabled:opacity-50 disabled:hover:bg-white m-2 max-h-8'>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-slate-gray text-xl sm:hidden py-1'
						icon='fa-solid fa-close'></FontAwesome>
				</button>
			)
			break
		case 'delete':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap w-fit px-5 transition-all border border-solid rounded border-rich-black bg-delete-red text-white font-bold font-sans text-sm sm:text-lg text-center lg:hover:bg-red-hover disabled:opacity-50 disabled:hover:bg-delete-red m-2 max-h-8'>
					<div className='hidden sm:block'>{text}</div>
					<FontAwesome
						className='text-white text-xl sm:hidden py-1'
						icon='fa-solid fa-trash'></FontAwesome>
				</button>
			)
			break
		default:
			content = (
				<button
					onClick={props.click}
					className='bg-color-3 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 py-1 m-2 whitespace-nowrap truncate max-h-8'>
					{text}
				</button>
			)
			break
	}

	return content
}
export default ActionButton
