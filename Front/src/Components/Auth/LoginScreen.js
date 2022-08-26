import React from 'react';
import { useForm } from '../../Hooks/useForm';

import { useDispatch } from 'react-redux';
import { startLoginEmailPassword } from '../../Actions/Thunks/Auth';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';

export const LoginScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(formValues, () => navigate('/tracking', { replace: true })));
	};

	return (
		<Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
			<h3 className='my-3 fw-bolder'>TrackingAPP</h3>
			<form onSubmit={handleLogin}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type='email'
							placeholder='correo@google.com'
							fullWidth
							name='email'
							value={email}
							onChange={handleInputChange}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Contraseña'
							type='password'
							placeholder='Contraseña'
							fullWidth
							name='password'
							value={password}
							onChange={handleInputChange}
							required
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button type='submit' variant='contained' fullWidth>
								Login
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Grid>
	);
};
