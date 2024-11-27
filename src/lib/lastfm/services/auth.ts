import { fetcher, generateSignature } from '$lib/utils';

import { buildUrl, method } from '..';
import type { AuthGetSessionRequest, AuthGetSessionResponse } from './auth.types';
import { config } from '../config';

export type AuthApiMethods = {
	/**
	 * Get the session key for a user. Used for authenticating a user when scrobbling.
	 * @param {AuthGetSessionRequest} params
	 * @param {RequestInit} init
	 * @returns {Promise<AuthGetSessionResponse>}
	 * https://www.last.fm/api/show/auth.getSession
	 * */
	getSession: (
		params: AuthGetSessionRequest,
		init?: RequestInit
	) => Promise<AuthGetSessionResponse>;
};

export const authApiMethods: AuthApiMethods = {
	getSession: async (params, init) =>
		fetcher<AuthGetSessionResponse>()(
			buildUrl(method.auth.getSession, {
				...params,
				api_sig: generateSignature(
					{ method: method.auth.getSession, ...params },
					config.share_secret
				)
			}),
			init
		)
};
