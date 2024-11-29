import type { GetCollectionFolderReleasesResponse } from '$lib/api/discogs/services';

import { fetcher } from '$lib/utils';
import type { Release } from '../../../routes/api/release/[id]/mapper';

export const releaseQueryClient = (customFetch = fetch) => ({
	getReleases: {
		queryKey: (page: string) => ['release', page],
		queryFn: (page: string, perPage = 10) =>
			fetcher<GetCollectionFolderReleasesResponse>(customFetch)(
				`/api/release?page=${page}&per_page=${perPage}`
			)
	},
	getRelease: {
		queryKey: (id: string) => ['release', id],
		queryFn: (id: string) => fetcher<Release>(customFetch)(`/api/release/${id}`)
	}
});
