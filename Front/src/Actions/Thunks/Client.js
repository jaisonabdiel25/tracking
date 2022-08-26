import clientAxios from '../../Config/axios';
import { getClient, getClientReady, getClientError } from '../Client';

export const getClientAction = () => {
	return async (dispatch) => {
		dispatch(getClient());
		try {
			const {
				data: { clients },
			} = await clientAxios.get('/clients/');

			dispatch(getClientReady(clients));
		} catch (error) {
			console.log(error);
			dispatch(getClientError(error));
		}
	};
};
