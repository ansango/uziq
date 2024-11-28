import { releaseQueryClient } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();
	const { getRelease } = releaseQueryClient(fetch);
	const { queryFn, queryKey } = getRelease;
	const { id } = params;

	await queryClient.prefetchQuery({
		queryKey: queryKey(id),
		queryFn: () => queryFn(id)
	});

	return { id };
};
