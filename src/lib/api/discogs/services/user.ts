import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';

type SearchParams = {
	[key: string]: string | number;
};

type GetCollectionFolderReleasesRequest = {
	username: string;
	oauth_token: string;
	oauth_token_secret: string;
	folderId: string;
};

export interface BasicInformation {
	id: number;
	master_id: number;
	master_url: string;
	resource_url: string;
	thumb: string;
	cover_image: string;
	title: string;
	year: number;
	formats: Format[];
	artists: Artist[];
	labels: Label[];
	genres: string[];
	styles: string[];
}

export interface Format {
	name: string;
	qty: string;
	text: string;
	descriptions: string[];
}

export interface Artist {
	name: string;
	anv: string;
	join: string;
	role: string;
	tracks: string;
	id: number;
	resource_url: string;
}

export interface Label {
	name: string;
	catno: string;
	entity_type: string;
	entity_type_name: string;
	id: number;
	resource_url: string;
}

type Release = {
	id: number;
	instance_id: number;
	date_added: string;
	rating: number;
	basic_information: BasicInformation;
	folder_id: number;
};
type Pagination = {
	page: number;
	pages: number;
	per_page: number;
	items: number;
	urls: {
		last: string;
		next: string;
	};
};

export type GetCollectionFolderReleasesResponse = {
	releases: Release[];
	pagination: Pagination;
};

type UserApiMethods = {
	getCollectionFolderReleases: (
		params: GetCollectionFolderReleasesRequest,
		searchParams?: SearchParams
	) => Promise<GetCollectionFolderReleasesResponse>;
};

export const userApiMethods: UserApiMethods = {
	getCollectionFolderReleases: async (
		{ oauth_token, oauth_token_secret, ...params }: GetCollectionFolderReleasesRequest,
		searchParams?: SearchParams
	) => {
		const response = await fetch(
			buildUrl(method.user.getCollectionFolderReleases(params), searchParams),
			{
				headers: {
					Authorization: buildAuthHeader({
						signature: `${config.secret_key}&${oauth_token_secret}`,
						extra: { oauth_token }
					})
				}
			}
		);

		return response.json();
	}
};
