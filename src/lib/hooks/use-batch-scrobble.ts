import { trackQueryClient, userQueryClient } from '$lib/global-query-client';
import { createMutation, QueryClient } from '@tanstack/svelte-query';

const { postBatchTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

export const usePostBatchTrack = ({ queryClient, id }: { queryClient: QueryClient; id: string }) =>
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
