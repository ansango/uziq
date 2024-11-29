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

/**
 * Defines the methods available for interacting with the Release API.
 */
type ReleaseApiMethods = {
	/**
	 * Retrieves a release based on the provided parameters.
	 *
	 * @param params - The parameters required to get the release.
	 * @returns A promise that resolves to the release response.
	 */
	getRelease: (params: GetReleaseRequest) => Promise<GetReleaseResponse>;

	/**
	 * Retrieves the releases from a specific collection folder.
	 *
	 * @param params - The parameters required to get the collection folder releases.
	 * @param searchParams - Optional search parameters to filter the results.
	 * @returns A promise that resolves to the collection folder releases response.
	 */
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
