import fetchJson from './api';

const { CMS_URL } = process.env;

export async function getProduct(id) {
	const product = await fetchJson(`${CMS_URL}/products/${id}`);
	return stripProduct(product);
}

export async function getProducts() {
	const products = await fetchJson(`${CMS_URL}/products`);
	return products.map(stripProduct);
}

function stripProduct(product) {
	return {
		id: product.id,
		title: product.title,
		price: product.price,
		description: product.description,
		pictureUrl: CMS_URL + product.picture.url,
	};
}
