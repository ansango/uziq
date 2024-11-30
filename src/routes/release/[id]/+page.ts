import { fetcher } from '$lib/utils';
import type { MappedRelease } from '../../api/release/[id]/mapper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent, fetch }) => {
	const { queryClient } = await parent();
	const { id } = params;

	await queryClient.prefetchQuery({
		queryKey: ['release', id],
		queryFn: () => fetcher<MappedRelease>(fetch)(`/api/release/${id}`)
	});

	return { id };
};
