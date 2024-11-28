import type { GetCollectionFolderReleasesResponse } from '$lib/discogs/services';
import { fetcher } from './fetcher';

// TODO: REFACTOR

export const clientApi = (customFetch = fetch) => ({
	getReleases: {
		queryKey: (page: string) => ['release', page],
		queryFn: (page: string) =>
			fetcher<GetCollectionFolderReleasesResponse>(customFetch)(`/release?page=${page}`)
	},
	getRelease: {
		queryKey: (id: string) => ['release', id],
		queryFn: (id: string) => fetcher(customFetch)(`/release/${id}`)
	},
	postBatchTrackScrobble: {
		// TODO: ADD TYPES (Inlusive Discogs API)
		mutationKey: (id: string) => ['batch-track-scrobble', id],
		queryFn: (id: string, data: any) =>
			fetcher(customFetch)(`/release/${id}`, { method: 'POST', body: JSON.stringify(data) })
	}
});
