import { types } from '../types/types';

const initialstate = {
	userDB: [],
	msgError: null,
	loading: false,
	token: null,
};

export const AuthReducer = (state = initialstate, action) => {
	switch (action.type) {
		case types.login:
			return {
				...state,
				loading: action.payload,
			};

		case types.loginReady:
			return {
				...state,
				loading: false,
				token: action.payload.token,
				userDB: action.payload.userDB,
				msgError: null,
			};

		case types.loginError:
			return {
				...state,
				loading: false,
				msgError: action.payload.msg,
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
