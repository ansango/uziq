import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	const { discogsToken, discogsTokenSecret, discogsUser, lastfmSession, lastfmUser } = data;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	queryClient.setQueryData(['lastfm'], {
		lastfmSession,
		lastfmUser
	});

	queryClient.setQueryData(['discogs'], {
		discogsToken,
		discogsTokenSecret,
		discogsUser
	});

	return { queryClient, ...data };
};
