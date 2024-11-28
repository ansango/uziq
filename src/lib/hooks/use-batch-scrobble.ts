import { clientApi, useGlobalQueryClient } from '$lib/utils';
import { createMutation, QueryClient } from '@tanstack/svelte-query';

const { postBatchTrackScrobble } = clientApi();
const { user } = useGlobalQueryClient();
const { getRecentTracks } = user();

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
