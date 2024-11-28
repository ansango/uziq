import { LASTFM_API_KEY } from '$env/static/private';
import { generateSignature } from '$lib/utils';
import { method } from '..';
import { config } from '../config';
import type { BatchTracksScrobbleRequest, TrackScrobbleRequest } from './track.types';

export const parsePostParamsTrack = ({
	artist,
	sk,
	timestamp,
	track,
	album
}: TrackScrobbleRequest) => {
	const paramsUrl = { artist, track, timestamp, sk } as TrackScrobbleRequest;
	if (album) paramsUrl.album = album;
	const api_sig = generateSignature(
		{
			method: method.track.scrobble,
			api_key: LASTFM_API_KEY,
			...paramsUrl
		},
		config.share_secret
	);
	return { ...paramsUrl, api_sig };
};

export const parsePostParamsBatchTrack = ({ tracks, sk }: BatchTracksScrobbleRequest) => {
	if (tracks.length > 50) {
		throw new Error('Max 50 tracks by request');
	}
	const params = {
		method: method.track.scrobble,
		api_key: LASTFM_API_KEY,
		sk
	} as Record<string, string>;

	tracks.forEach((track, index) => {
		params[`artist[${index}]`] = track.artist;
		params[`track[${index}]`] = track.track;
		params[`timestamp[${index}]`] = track.timestamp;

		if (track.album) {
			params[`album[${index}]`] = track.album;
		}
	});

	const api_sig = generateSignature(params, config.share_secret);
	params.api_sig = api_sig;

	const body = Object.keys(params)
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
		.join('&');

	return body;
};

export const batchFetcher = async ({ body }: { body: string }) => {
	const response = await fetch(config.base_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	if (!response.ok) {
		throw new Error('Error scrobbling tracks');
	}
	return true;
};
