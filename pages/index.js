import Head from 'next/head';
import Title from '../components/Title';
import Link from 'next/link';
import { getProducts } from '../lib/products';
import ProductCard from '../components/ProductCard';

export const getStaticProps = async () => {
	console.log('[HomePage] getStaticProps()');
	const products = await getProducts();
	return {
		props: { products },
		revalidate: 30, // seconds
	};
};

const HomePage = ({ products }) => {
	return (
		<>
			<Head>
				<title>Next Shop</title>
			</Head>
			<main className='p-4'>
				<Title>Next Shop</Title>
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{products.map((product, i) => (
						<li key={i}>
							<ProductCard product={product} />
						</li>
					))}
				</ul>
			</main>
		</>
	);
};

export default HomePage;
