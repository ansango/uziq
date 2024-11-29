import { userQueryClient } from '$lib/query-client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getRecentTracks } = userQueryClient(fetch);
	const { queryFn, queryKey } = getRecentTracks;

	await queryClient.prefetchQuery({
		queryKey,
		queryFn
	});
};
