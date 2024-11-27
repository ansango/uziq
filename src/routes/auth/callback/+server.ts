import { LASTFM_API_KEY } from '$env/static/private';
import { authApiMethods } from '$lib/lastfm/services';
import { authApiMethods as authApiMethodsDiscogs } from '$lib/discogs';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');
	const prev_oauth_token = cookies.get('oauth_token');
	const prev_oauth_token_secret = cookies.get('oauth_token_secret');
	const verifier = url.searchParams.get('oauth_verifier');
	if (token) {
		const response = await authApiMethods.getSession({
			token,
			api_key: LASTFM_API_KEY
		});
		const { key, name } = response.session;
		cookies.set('user', name, { path: '/' });
		cookies.set('session', key, { path: '/' });
		redirect(302, '/');
	}

	if (prev_oauth_token && prev_oauth_token_secret && verifier) {
		const { oauth_token, oauth_token_secret } = await authApiMethodsDiscogs.postAccessToken({
			oauth_token: prev_oauth_token,
			oauth_token_secret: prev_oauth_token_secret,
			verifier
		});
		cookies.set('oauth_token_secret', oauth_token_secret, { path: '/' });
		cookies.set('oauth_token', oauth_token, { path: '/' });
		redirect(302, '/');
	}

	/* Return the user to an error page with instructions */
	redirect(303, '/');
};
