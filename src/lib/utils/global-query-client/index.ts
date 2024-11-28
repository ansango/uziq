import { userQueryClient } from './user';

export const useGlobalQueryClient = () => ({
	user: userQueryClient
});
