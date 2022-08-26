import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm } from '../../Hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClientAction } from '../../Actions/Thunks/Client';
import { newTrackingAction } from '../../Actions/Thunks/Tracking';

export const NewTracking = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = JSON.parse(localStorage.getItem('userStorage'));

	useEffect(() => {
		dispatch(getClientAction());
	}, []);

	const clients = useSelector((state) => state.Client.clients);
	const listClient = clients.map((client) => client.code);
	listClient.push('');

	const [formValues, handleInputChange] = useForm({
		tracking: '',
		client: '',
		weight: 0,
	});
	const { tracking, client, weight } = formValues;

	const handleTracking = (event) => {
		event.preventDefault();
		const headers = {
			token: token,
		};
		dispatch(newTrackingAction(formValues, () => navigate('/tracking', { replace: true }), headers));
	};

	return (
		<div>
			<form className='mt-3' onSubmit={handleTracking}>
				<TextField fullWidth label='Numero de Tracking' value={tracking} name='tracking' onChange={handleInputChange} />
				{clients ? (
					<div>
						<Autocomplete
							disablePortal
							options={listClient}
							sx={{ mt: 4 }}
							value={client}
							onChange={(e, value) => handleInputChange({ target: { value, name: 'client' } })}
							renderInput={(params) => <TextField {...params} label='Cliente' name='client' />}
						/>
					</div>
				) : (
					''
				)}

				<TextField
					fullWidth
					label='With normal TextField'
					type='number'
					sx={{ mt: 4 }}
					value={weight}
					name='weight'
					onChange={handleInputChange}
					InputProps={{
						startAdornment: <InputAdornment position='start'>kg</InputAdornment>,
					}}
				/>
				<Button type='submit' fullWidth variant='contained' sx={{ mt: 4 }}>
					Crear
				</Button>
			</form>
		</div>
	);
};
