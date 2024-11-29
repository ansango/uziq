export type AuthGetTokenResponse = {
	oauth_token: string;
	oauth_token_secret: string;
};

export type AuthPostAccessTokenRequest = {
	oauth_token: string;
	oauth_token_secret: string;
	verifier: string;
};

export type AuthPostAccessTokenResponse = {
	oauth_token: string;
	oauth_token_secret: string;
};

export type AuthGetIdentityRequest = {
	oauth_token: string;
	oauth_token_secret: string;
};

export type AuthGetIdentityResponse = {
	username: string;
	id: number;
	resource_url: string;
	consumer_name: string;
};
