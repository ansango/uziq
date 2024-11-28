import { LASTFM_API_KEY, LASTFM_AUTH_URL, LASTFM_CALLBACK_URL } from '$env/static/private';
import { authApiMethods } from '$lib/api/discogs/services';
import { redirect } from '@sveltejs/kit';
import {
	DISCOGS_OAUTH_TOKEN,
	DISCOGS_OAUTH_TOKEN_SECRET,
	DISCOGS_USER,
	LASTFM_SESSION,
	LASTFM_USER
} from '$lib/middleware';

export const actions = {
	'lastfm-login': async () => {
		redirect(302, `${LASTFM_AUTH_URL}?api_key=${LASTFM_API_KEY}&cb=${LASTFM_CALLBACK_URL}`);
	},
	'lastfm-logout': async ({ cookies }) => {
		cookies.delete(LASTFM_USER, { path: '/' });
		cookies.delete(LASTFM_SESSION, { path: '/' });
		redirect(302, '/');
	},
	'discogs-login': async ({ cookies }) => {
		const { oauth_token, oauth_token_secret } = await authApiMethods.getToken();
		cookies.set(DISCOGS_OAUTH_TOKEN_SECRET, oauth_token_secret, { path: '/' });
		cookies.set(DISCOGS_OAUTH_TOKEN, oauth_token, { path: '/' });
		redirect(302, `https://discogs.com/oauth/authorize?oauth_token=${oauth_token}`);
	},
	'discogs-logout': async ({ cookies }) => {
		cookies.delete(DISCOGS_OAUTH_TOKEN_SECRET, { path: '/' });
		cookies.delete(DISCOGS_OAUTH_TOKEN, { path: '/' });
		cookies.delete(DISCOGS_USER, { path: '/' });
		redirect(302, '/');
	}
};
