import { LASTFM_API_KEY, LASTFM_AUTH_URL, LASTFM_CALLBACK_URL } from '$env/static/private';

import { redirect } from '@sveltejs/kit';
import {
	DISCOGS_OAUTH_TOKEN,
	DISCOGS_OAUTH_TOKEN_SECRET,
	DISCOGS_USER,
	LASTFM_SESSION,
	LASTFM_USER
} from '$lib/api/middleware';

export const actions = {
	login: async () => {
		redirect(302, `${LASTFM_AUTH_URL}?api_key=${LASTFM_API_KEY}&cb=${LASTFM_CALLBACK_URL}`);
	},
	logout: async ({ cookies }) => {
		cookies.delete(LASTFM_USER, { path: '/' });
		cookies.delete(LASTFM_SESSION, { path: '/' });
		cookies.delete(DISCOGS_OAUTH_TOKEN_SECRET, { path: '/' });
		cookies.delete(DISCOGS_OAUTH_TOKEN, { path: '/' });
		cookies.delete(DISCOGS_USER, { path: '/' });
		redirect(302, '/login');
	}
};
