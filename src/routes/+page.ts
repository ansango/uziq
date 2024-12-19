import { releaseQueryClient } from '$lib/query-client';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, lastfmSession } = await parent();

	if (!lastfmSession) {
		redirect(303, '/login');
	}

	const { getReleases } = releaseQueryClient(fetch);
	const { queryFn, queryKey } = getReleases;

	await queryClient.prefetchQuery({
		queryKey: queryKey('1'),
		queryFn: () => queryFn('1')
	});
};
