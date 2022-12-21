import axios from 'axios';

const { CMS_URL } = process.env;

export async function getProduct(id) {
	const product = await axios.get(`${CMS_URL}/products/${id}`);
	return stripProduct(product.data);
}

export async function getProducts() {
	const products = await axios.get(`${CMS_URL}/products`);
	// console.log(products);
	return products.data.map(stripProduct);
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
