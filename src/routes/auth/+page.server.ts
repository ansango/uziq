import { LASTFM_API_KEY, LASTFM_AUTH_URL, LASTFM_CALLBACK_URL } from '$env/static/private';
import { authApiMethods } from '$lib/discogs';
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
	},
	'login-discogs': async ({ cookies }) => {
		const response = await authApiMethods.getToken();
		const [oauth_token, oauth_token_secret] = response.split('&').map((item) => item.split('=')[1]);
		cookies.set('oauth_token_secret', oauth_token_secret, { path: '/' });
		cookies.set('oauth_token', oauth_token, { path: '/' });

		redirect(302, `https://discogs.com/oauth/authorize?oauth_token=${oauth_token}`);
	},
	'logout-discogs': async ({ cookies }) => {
		cookies.delete('oauth_token_secret', { path: '/' });
		cookies.delete('oauth_token', { path: '/' });
		redirect(302, '/');
	}
};
