import { clientApi } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();
	const { getProfile } = clientApi(fetch);
	const { queryFn, queryKey } = getProfile;

	await queryClient.prefetchQuery({
		queryKey,
		queryFn
	});
};
