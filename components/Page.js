import Title from './Title';
import Head from 'next/head';
import NavBar from './NavBar';

const Page = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<header>
				<NavBar />
			</header>
			<main className='p-4'>
				<Title>{title}</Title>
				{children}
			</main>
		</>
	);
};

export default Page;
