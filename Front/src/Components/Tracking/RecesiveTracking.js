import { Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { receiveTrackingAction } from '../../Actions/Thunks/Tracking';
import { useForm } from '../../Hooks/useForm';

export const RecesiveTracking = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		token,
		userDB: { uid },
	} = JSON.parse(localStorage.getItem('userStorage'));

	const [formValues, handleInputChange] = useForm({
		tracking: '',
	});
	const { tracking } = formValues;

	const handleTracking = (event) => {
		event.preventDefault();
		const headers = {
			token: token,
		};

		const body = {
			...formValues,
			user: uid,
		};
		console.log(body);
		dispatch(receiveTrackingAction(body, headers, () => navigate('/tracking', { replace: true })));
	};
	return (
		<div>
			<form className='mt-3' onSubmit={handleTracking}>
				<TextField fullWidth label='Recibir Tracking' id='fullWidth' value={tracking} name='tracking' onChange={handleInputChange} />
				<Button type='submit' fullWidth variant='contained' sx={{ mt: 4 }}>
					Recibir
				</Button>
			</form>
		</div>
	);
};
