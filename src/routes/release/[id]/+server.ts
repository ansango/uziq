import { LASTFM_SESSION } from '$lib';
import { releaseApiMethods } from '$lib/discogs/services/release';
import { trackApiMethods, type BatchTracksScrobbleRequest } from '$lib/lastfm/services';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const release = await releaseApiMethods.getRelease(String(id));
	return json(release, { status: 200 });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const sk = cookies.get(LASTFM_SESSION);

	if (!sk) {
		return json({ error: 'Session not found' }, { status: 404 });
	}

	const data = await request.json();

	const tracks: BatchTracksScrobbleRequest['tracks'] = data.tracklist.map((track: any) => ({
		artist: data.artist,
		track,
		timestamp: Math.floor(Date.now() / 1000),
		album: data.album
	}));

	const result = await trackApiMethods.postBatchTrackScrobble({
		sk,
		tracks
	});

	return json(result, { status: result ? 200 : 500 });
};
