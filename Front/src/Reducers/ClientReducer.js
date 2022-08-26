import { types } from '../types/types';

const initialstate = {
	clients: [],
	msgError: null,
	loading: false,
};

export const ClientReducer = (state = initialstate, action) => {
	switch (action.type) {
		case types.getClient:
			return {
				...state,
				loading: action.payload,
			};

		case types.getClientReady:
			return {
				...state,
				loading: false,
				clients: action.payload,
				msgError: null,
			};

		case types.getClientError:
			return {
				...state,
				loading: false,
				msgError: action.payload.msg,
			};

		default:
			return state;
	}
};
