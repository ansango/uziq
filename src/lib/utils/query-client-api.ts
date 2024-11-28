import type {
	UserGetInfoResponse,
	UserGetRecentTracksResponse
} from '$lib/lastfm/services/user.types';
import { fetcher } from './fetcher';

// TODO: REFACTOR

export const clientApi = (customFetch = fetch) => ({
	getProfile: {
		queryKey: ['profile'],
		queryFn: () => fetcher<UserGetInfoResponse['user']>(customFetch)('/user/info')
	},
	getRecentTracks: {
		queryKey: ['recent-tracks'],
		queryFn: () =>
			fetcher<UserGetRecentTracksResponse['recenttracks']['track']>(customFetch)(
				'/user/tracks/recent'
			)
	},
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
