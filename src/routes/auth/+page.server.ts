import { LASTFM_API_KEY, LASTFM_AUTH_URL, LASTFM_CALLBACK_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const URL = `${LASTFM_AUTH_URL}?api_key=${LASTFM_API_KEY}&cb=${LASTFM_CALLBACK_URL}`;

export const actions = {
	login: async () => {
		redirect(302, URL);
	},
	logout: async ({ cookies }) => {
		cookies.delete('user', { path: '/' });
		cookies.delete('session', { path: '/' });
		redirect(302, '/');
	}
};
