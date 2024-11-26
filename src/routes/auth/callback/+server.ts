import { LASTFM_API_KEY } from '$env/static/private';
import { authApiMethods } from '$lib/services';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');
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

	/* Return the user to an error page with instructions */
	redirect(303, '/');
};
