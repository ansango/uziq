import { clientApi } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getTracks } = clientApi(fetch);
	const { queryFn, queryKey } = getTracks;

	await queryClient.prefetchQuery({
		queryKey,
		queryFn
	});
};
