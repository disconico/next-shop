import Page from '../components/Page';
import Input from '../components/Input';
import Field from '../components/Field';
import Button from '../components/Button';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignIn } from '../hooks/user';

const SignInPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signIn, signInError, signInLoading } = useSignIn();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const valid = await signIn(email, password);
		if (valid) {
			router.push('/');
		}
	};

	return (
		<Page title={'Sign In'}>
			<form onSubmit={handleSubmit}>
				<Field label={'E-mail'}>
					<Input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete='username'
						required
					/>
				</Field>

				<Field label={'Password'}>
					<Input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='current-password'
						required
					/>
				</Field>
				{signInError && <p className='text-red-700'>Invalid credentials</p>}
				{signInLoading ? (
					<p>Loading....</p>
				) : (
					<Button type={'submit'}>Submit</Button>
				)}
			</form>
		</Page>
	);
};

export default SignInPage;
