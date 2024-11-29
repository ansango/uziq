import type { TrackScrobbleRequest, TrackScrobbleResponse } from '$lib/api/lastfm/services';
import { fetcher } from '$lib/utils';

export const trackQueryClient = (customFetch = fetch) => ({
	postBatchTrackScrobble: {
		mutationKey: (id: string) => ['batch-track-scrobble', id],
		queryFn: (
			id: string,
			data: {
				artist: string;
				album: string;
				tracklist: string[];
			}
		) =>
			fetcher<boolean>(customFetch)(`/api/release/${id}`, {
				method: 'POST',
				body: JSON.stringify(data)
			})
	},
	postTrackScrobble: {
		mutationKey: (id: string) => ['track-scrobble', id],
		queryFn: (id: string, data: Omit<TrackScrobbleRequest, 'sk' | 'timestamp'>) =>
			fetcher<TrackScrobbleResponse['scrobbles']['scrobble']>(customFetch)(
				`/api/release/${id}/track`,
				{
					method: 'POST',
					body: JSON.stringify(data)
				}
			)
	}
});
