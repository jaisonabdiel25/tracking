import clientAxios from '../../Config/axios';
import { login, LoginReady, LoginError, Logout } from '../Auth';
import swal from 'sweetalert2';

export const startLoginEmailPassword = (body, cb) => {
	return async (dispatch) => {
		dispatch(login());
		try {
			const { data } = await clientAxios.post('/auth/', body);
			dispatch(LoginReady(data));
			localStorage.setItem('userStorage', JSON.stringify(data));
			if (data.ok) {
				cb();
			} else {
				throw new Error('Usuario o contraseña incorrecto!');
			}
		} catch (error) {
			console.log(error.response.data.msg);
			dispatch(LoginError(error.response.data));
			swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: '¡Usuario o contraseña incorrecto!',
			});
		}
	};
};

export const LogoutAction = () => {
	return async (dispatch) => {
		try {
			dispatch(Logout());
			localStorage.setItem('userStorage', '[]');
		} catch (error) {
			dispatch(LoginError(error.response.data));
			swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Usuario o contraseña incorrecto!',
			});
		}
	};
};
