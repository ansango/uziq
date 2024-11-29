import { fetcher } from '$lib/utils';
import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';
import type {
	GetCollectionFolderReleasesRequest,
	GetCollectionFolderReleasesResponse,
	GetReleaseRequest,
	GetReleaseResponse,
	SearchParams
} from './release.types';

type ReleaseApiMethods = {
	getRelease: (params: GetReleaseRequest) => Promise<GetReleaseResponse>;
	getCollectionFolderReleases: (
		params: GetCollectionFolderReleasesRequest,
		searchParams?: SearchParams
	) => Promise<GetCollectionFolderReleasesResponse>;
};

export const releaseApiMethods: ReleaseApiMethods = {
	getRelease: async ({ oauth_token, oauth_token_secret, id }: GetReleaseRequest) =>
		fetcher<GetReleaseResponse>()(buildUrl(method.release.getRelease(id)), {
			headers: {
				Authorization: buildAuthHeader({
					signature: `${config.secret_key}&${oauth_token_secret}`,
					extra: { oauth_token }
				})
			}
		}),

	getCollectionFolderReleases: async (
		{ oauth_token, oauth_token_secret, ...params }: GetCollectionFolderReleasesRequest,
		searchParams?: SearchParams
	) =>
		fetcher<GetCollectionFolderReleasesResponse>()(
			buildUrl(method.user.getCollectionFolderReleases(params), searchParams),
			{
				headers: {
					Authorization: buildAuthHeader({
						signature: `${config.secret_key}&${oauth_token_secret}`,
						extra: { oauth_token }
					})
				}
			}
		)
};
