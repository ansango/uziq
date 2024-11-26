import type { UserGetInfoResponse } from '$lib/lastfm/services/user.types';
import { fetcher } from './fetcher';

export const clientApi = (customFetch = fetch) => ({
	getProfile: {
		queryKey: ['profile'],
		queryFn: () => fetcher<UserGetInfoResponse>(customFetch)('/profile')
	}
});
