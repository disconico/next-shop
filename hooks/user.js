import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

const USER_QUERY_KEY = 'user';

export function useUser() {
	const query = useQuery(
		USER_QUERY_KEY,
		async () => {
			try {
				return await axios.get('/api/user');
			} catch (err) {
				return undefined;
			}
		},
		{
			cacheTime: Infinity,
			staleTime: 60_000, // ms
		},
	);
	return query.data;
}

export function useSignIn() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async ({ email, password }) => {
		return await axios.post('/api/login', { email, password });
	});
	return {
		signIn: async (email, password) => {
			try {
				const user = await mutation.mutateAsync({ email, password });
				queryClient.setQueryData(USER_QUERY_KEY, user);
				return true;
			} catch (err) {
				return false;
			}
		},
	};
}

export function useSignOut() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async () => {
		return await axios.get('/api/logout');
	});
	return {
		signOut: async () => {
			try {
				await mutation.mutateAsync();
				queryClient.setQueryData(USER_QUERY_KEY, undefined);
				return true;
			} catch (err) {
				return false;
			}
		},
		signOutError: mutation.isError,
		signOutLoading: mutation.isLoading,
	};
}
