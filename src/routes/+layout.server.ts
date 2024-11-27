import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = cookies.get('user');
	const session = cookies.get('session');

	const oauth_token = cookies.get('oauth_token');
	const oauth_token_secret = cookies.get('oauth_token_secret');

	return { user, session, oauth_token, oauth_token_secret };
};
