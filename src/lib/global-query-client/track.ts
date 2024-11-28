import { fetcher } from '../utils/fetcher';

export const trackQueryClient = (customFetch = fetch) => ({
	postBatchTrackScrobble: {
		// TODO: ADD TYPES (Inlusive Discogs API)
		mutationKey: (id: string) => ['batch-track-scrobble', id],
		queryFn: (id: string, data: any) =>
			fetcher(customFetch)(`/release/${id}`, { method: 'POST', body: JSON.stringify(data) })
	}
});
