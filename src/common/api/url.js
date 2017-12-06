import { baseApi } from '../../config/env';

const base = baseApi();

export const api = {
	users : {
		root : base+'/users',
		auth : base+'/users/auth',
		logout : base+'/users/logout'
	}
}


