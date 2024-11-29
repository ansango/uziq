import { trackQueryClient, userQueryClient } from '$lib/global-query-client';
import { createMutation, QueryClient } from '@tanstack/svelte-query';

const { postBatchTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

type Params = {
	queryClient: QueryClient;
	id: string;
};

export const usePostTrackBatchScrobble = ({ queryClient, id }: Params) =>
	createMutation({
		mutationKey: postBatchTrackScrobble.mutationKey(id),
		mutationFn: (data: any) =>
			postBatchTrackScrobble.queryFn(data.id, {
				tracklist: data.tracklist.map((track) => track.title),
				artist: data.artist,
				album: data.title
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
		}
	});
