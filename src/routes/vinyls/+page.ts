import { clientApi } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getVinyls } = clientApi(fetch);
	const { queryFn, queryKey } = getVinyls;

	await queryClient.prefetchQuery({
		queryKey,
		queryFn
	});
};
