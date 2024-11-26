import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = cookies.get('user');
	const session = cookies.get('session');
	return { user, session };
};
