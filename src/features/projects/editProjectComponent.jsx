import React, { useEffect, useState } from 'react';
import common from '../../common/commonImports.js';
import { useForm } from 'react-hook-form';
import { editProject } from './projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { listAllUsers, getAllUsers } from '../auth/authSlice.js';
import makeAnimated from 'react-select/animated';
import TextareaAutosize from 'react-textarea-autosize';

import Select from 'react-select';

const EditProjectComponent = (props) => {
	const dispatch = useDispatch();
	const user = JSON.parse(sessionStorage.getItem('user'));
	const [employees, setEmployees] = useState(props.project.employees);
	const [isChanged, setIsChanged] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const animatedComponents = makeAnimated();

	const allEmployees = useSelector(getAllUsers);

	useEffect(() => {
		dispatch(listAllUsers());
	}, []);

	const submitMe = (data) => {
		if (
			data.projDesc !== props.project.project_description ||
			data.projName !== props.project.project_name ||
			isChanged
		) {
			data.project_id = props.project._id;
			data.editedBy = user._id;
			let justIds = [];
			employees.forEach((employee) => justIds.push(employee._id));
			data.employees = justIds;
			dispatch(editProject(data));
		}
		props.close();
		props.closeParent();
	};
	const onChange = (newValue, actionMeta) => {
		setIsChanged(true);
		switch (actionMeta.action) {
			case 'clear':
				setEmployees([]);
				break;
			case 'select-option':
				setEmployees([]);
				setEmployees(newValue);
				break;
			case 'remove-value':
				setEmployees([]);
				setEmployees(newValue);
				break;
			default:
				break;
		}
	};

	const onInputChange = (newValue, actionMeta) => {};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* Actual render section */

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className='h-fit w-fit min-w-[25vw]'>
			<form className='text-rich-black h-full w-full grid grid-cols-8 items-center space-y-8'>
				<h1 className='col-span-8 text-3xl text-midnight-blue pt-4 text-center'>
					{`Edit ${props.project.project_name}`}
				</h1>
				<common.FontAwesomeIcon
					className='cursor-pointer text-rich-black text-2xl fixed -top-4 right-4'
					icon='fa-solid fa-xmark'
					onClick={props.close}></common.FontAwesomeIcon>
				<input
					className='h-10 col-span-8 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black'
					type='text'
					placeholder='New Project Name'
					defaultValue={props.project.project_name}
					name='projName'
					{...register('projName')}
				/>
				<TextareaAutosize
					className='h-48 col-span-8 pl-2 m-2 text-lg border-[1px] border-midnight-blue rounded drop-shadow-lg shadow-black resize-none'
					minRows={4}
					maxRows={9}
					defaultValue={props.project.project_description}
					placeholder='Description of project'
					name='projDesc'
					{...register('projDesc')}
				/>
				<span className='col-span-1'></span>
				<div className='col-span-6'>
					{allEmployees.length > 0 ? (
						<Select
							isSearchable
							isClearable
							isMulti
							defaultValue={props.project.employees}
							options={allEmployees}
							getOptionLabel={(option) =>
								`${option.first_name} ${option.last_name}`
							}
							components={animatedComponents}
							name='employee-select'
							onInputChange={onInputChange}
							onChange={onChange}
							getOptionValue={(option) => option._id}
						/>
					) : (
						<div></div>
					)}
				</div>
				<span className='col-span-1'></span>
				<div className='col-span-8 flex justify-between'>
					<common.ActionButton
						type='cancel'
						text='Cancel'
						extraClass=''
						click={props.close}></common.ActionButton>
					<common.ActionButton
						extraClass=''
						text='Save Changes'
						type='submit'
						click={handleSubmit(submitMe)}></common.ActionButton>
				</div>
			</form>
		</div>
	);
};

export default EditProjectComponent;
