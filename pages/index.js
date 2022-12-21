import { getProducts } from '../lib/products';
import ProductCard from '../components/ProductCard';
import Page from '../components/Page';

export const getStaticProps = async () => {
	const products = await getProducts();
	return {
		props: { products },
		revalidate: 30, // seconds
	};
};

const HomePage = ({ products }) => {
	return (
		<>
			<Page title='Indoor Plants'>
				<main className='p-4'>
					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
						{products.map((product, i) => (
							<li key={i}>
								<ProductCard product={product} />
							</li>
						))}
					</ul>
				</main>
			</Page>
		</>
	);
};

export default HomePage;
