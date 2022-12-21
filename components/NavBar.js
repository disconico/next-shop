import Link from 'next/link';
import { useUser, useSignOut } from '../hooks/user';

function NavBar() {
	const user = useUser();
	const { signOut } = useSignOut();

	let userData;
	if (user !== undefined) {
		userData = user.data;
	}

	const handleSignOut = async () => {
		const valid = await signOut();
		if (valid) {
			console.log('USER SIGNED OUT');
		}
	};
	return (
		<nav className='px-2 py-1 text-sm'>
			<ul className='flex gap-2'>
				<li className='text-lg font-extrabold'>
					<Link href='/'>Next Shop</Link>
				</li>
				<li role='separator' className='flex-1' />
				{user ? (
					<>
						<li>{userData.name}</li>
						<li>
							<Link href='/cart'>Cart</Link>
						</li>
						<li>
							<button onClick={handleSignOut}>Sign Out</button>
						</li>
					</>
				) : (
					<li>
						<Link href='/sign-in'>Sign In</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default NavBar;
