import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { lastfmSession } = await parent();

	if (!lastfmSession) {
		redirect(303, '/login');
	}
};
