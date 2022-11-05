import React from 'react';
import './spinner.css';

const Spinner = (props) => {
	return (
		<div className='w-full h-full'>
			<div className='lds-roller'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div>
				<div className='pt-6 text-base dots'>
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
		</div>
	);
};

export default Spinner;
