import { buildUrl, fetcher, generateApiSignature, method } from '$lib/utils';
import type { AuthGetSessionRequest, AuthGetSessionResponse } from './auth.types';

export type AuthApiMethods = {
	getSession: (
		params: AuthGetSessionRequest,
		init?: RequestInit
	) => Promise<AuthGetSessionResponse>;
};

export const authApiMethods: AuthApiMethods = {
	getSession: (params, init) =>
		fetcher<AuthGetSessionResponse>(
			buildUrl(method.auth.getSession, {
				...params,
				api_sig: generateApiSignature({ method: method.auth.getSession, ...params })
			}),
			init
		)
};
