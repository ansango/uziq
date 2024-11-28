import { fetcher } from './fetcher';

// TODO: REFACTOR

export const clientApi = (customFetch = fetch) => ({
	getReleases: {
		queryKey: ['releases'],
		queryFn: () => fetcher(customFetch)('/release')
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
