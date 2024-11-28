import { releaseQueryClient } from '$lib/global-query-client/release';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getReleases } = releaseQueryClient(fetch);
	const { queryFn, queryKey } = getReleases;

	await queryClient.prefetchQuery({
		queryKey: queryKey('1'),
		queryFn: () => queryFn('1')
	});
};
