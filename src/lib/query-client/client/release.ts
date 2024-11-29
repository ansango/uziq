import type { GetCollectionFolderReleasesResponse } from '$lib/api/discogs/services';
import type { ResponseReleaseMetadata } from '../../../routes/api/utils/release/metadata/+server';
import { fetcher } from '$lib/utils';

export const releaseQueryClient = (customFetch = fetch) => ({
	getReleases: {
		queryKey: (page: string) => ['release', page],
		queryFn: (page: string, perPage = 10) =>
			fetcher<GetCollectionFolderReleasesResponse>(customFetch)(
				`/release?page=${page}&per_page=${perPage}`
			)
	},
	getRelease: {
		queryKey: (id: string) => ['release', id],
		queryFn: (id: string) => fetcher<ResponseReleaseMetadata>(customFetch)(`/release/${id}`)
	}
});
