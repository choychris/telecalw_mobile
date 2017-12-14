import { baseApi , gizwitsUrl } from '../../config/env';

const apiBase = baseApi();
const gizwitsBase = gizwitsUrl();

export const api = {
	users : {
		root : apiBase+'/users',
		auth : apiBase+'/users/auth',
		logout : apiBase+'/users/logout'
	},
	tags : {
		root : apiBase+'/tags'
	},
	products : {
		root : apiBase+'/products'
	},
	gizwits : {
		control : gizwitsBase+'/control'	
	}
}

