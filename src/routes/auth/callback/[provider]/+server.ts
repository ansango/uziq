import { LASTFM_API_KEY } from '$env/static/private';
import { authApiMethods } from '$lib/lastfm/services';
import { authApiMethods as authApiMethodsDiscogs } from '$lib/discogs/services';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import {
	DISCOGS_OAUTH_TOKEN,
	DISCOGS_OAUTH_TOKEN_SECRET,
	DISCOGS_USER,
	LASTFM_SESSION,
	LASTFM_USER,
	COOKIE_OPTIONS
} from '$lib';

export const GET: RequestHandler = async ({ url, cookies, params }) => {
	const { provider } = params;

	if (provider === 'lastfm') {
		const token = url.searchParams.get('token');
		if (token) {
			const response = await authApiMethods.getSession({
				token,
				api_key: LASTFM_API_KEY
			});
			const { key, name } = response.session;
			cookies.set(LASTFM_USER, name, COOKIE_OPTIONS);
			cookies.set(LASTFM_SESSION, key, COOKIE_OPTIONS);
			redirect(302, '/');
		}
	}

	if (provider === 'discogs') {
		const prev_oauth_token = cookies.get(DISCOGS_OAUTH_TOKEN);
		const prev_oauth_token_secret = cookies.get(DISCOGS_OAUTH_TOKEN_SECRET);
		const verifier = url.searchParams.get('oauth_verifier');
		if (prev_oauth_token && prev_oauth_token_secret && verifier) {
			const { oauth_token, oauth_token_secret } = await authApiMethodsDiscogs.postAccessToken({
				oauth_token: prev_oauth_token,
				oauth_token_secret: prev_oauth_token_secret,
				verifier
			});
			cookies.set(DISCOGS_OAUTH_TOKEN_SECRET, oauth_token_secret, COOKIE_OPTIONS);
			cookies.set(DISCOGS_OAUTH_TOKEN, oauth_token, COOKIE_OPTIONS);

			const response = await authApiMethodsDiscogs.getIdentity({
				oauth_token,
				oauth_token_secret
			});

			cookies.set(DISCOGS_USER, response.username, COOKIE_OPTIONS);

			redirect(302, '/');
		}
	}
	redirect(303, '/');
};
