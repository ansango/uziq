import { clientApi } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getReleases } = clientApi(fetch);
	const { queryFn, queryKey } = getReleases;

	await queryClient.prefetchQuery({
		queryKey,
		queryFn
	});
};
