import { fetcher } from '$lib/utils';
import { buildUrl, method, generateApiSignature } from '..';
import type { AuthGetSessionRequest, AuthGetSessionResponse } from './auth.types';

export type AuthApiMethods = {
	getSession: (
		params: AuthGetSessionRequest,
		init?: RequestInit
	) => Promise<AuthGetSessionResponse>;
};

export const authApiMethods: AuthApiMethods = {
	getSession: (params, init) =>
		fetcher<AuthGetSessionResponse>()(
			buildUrl(method.auth.getSession, {
				...params,
				api_sig: generateApiSignature({ method: method.auth.getSession, ...params })
			}),
			init
		)
};
