export type AuthGetSessionRequest = {
	token: string;
	api_key: string;
};

export type Session = {
	name: string;
	key: string;
	subscriber: number;
};
export type AuthGetSessionResponse = {
	session: Session;
};
