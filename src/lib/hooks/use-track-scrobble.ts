import type { TrackScrobbleRequest } from '$lib/api/lastfm/services';
import { trackQueryClient, userQueryClient } from '$lib/global-query-client';
import { createMutation, QueryClient } from '@tanstack/svelte-query';

type Params = {
	queryClient: QueryClient;
	id: string;
};

const { postTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

export const usePostTrackScrobble = ({ id, queryClient }: Params) =>
	createMutation({
		mutationKey: postTrackScrobble.mutationKey(id),
		mutationFn: (data: Omit<TrackScrobbleRequest, 'sk' | 'timestamp'>) =>
			postTrackScrobble.queryFn(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
		}
	});
