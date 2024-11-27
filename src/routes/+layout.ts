import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	queryClient.setQueryData(['session'], {
		session: data.session,
		user: data.user
	});

	queryClient.setQueryData(['discogs'], {
		oauth_token: data.oauth_token,
		oauth_token_secret: data.oauth_token_secret
	});

	return { queryClient, ...data };
};
