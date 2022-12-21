import Image from 'next/image';
import Page from '../../components/Page';
import AddToCartWidget from '../../components/AddToCartWidget';
import { useUser } from '../../hooks/user';
import { getProduct, getProducts } from '../../lib/products';

export async function getStaticPaths() {
	const products = await getProducts();
	return {
		paths: products.map((product) => ({
			params: { id: product.id.toString() },
		})),
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params: { id } }) {
	try {
		const product = await getProduct(id);
		return {
			props: { product },
			revalidate: 30, // seconds
		};
	} catch (err) {
		return { notFound: true };
	}
}

const ProductPage = ({ product }) => {
	const user = useUser();
	return (
		<>
			<Page title={product.title}>
				<main className='px-6 py-4'>
					<div className='flex flex-col lg:flex-row'>
						<div>
							<Image
								src={product.pictureUrl}
								alt=''
								width={640}
								height={480}
								priority
							/>
						</div>
						<div className='flex-1 lg:ml-4'>
							<p className='text-sm'>{product.description}</p>
							<p className='text-lg font-bold mt-2'>{product.price}</p>
							{user && <AddToCartWidget productId={product.id} />}
						</div>
					</div>
				</main>
			</Page>
		</>
	);
};

export default ProductPage;
