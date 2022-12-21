import axios from 'axios';
const { CMS_URL } = process.env;

function stripCartItem(cartItem) {
	return {
		id: cartItem.id,
		product: {
			id: cartItem.product.id,
			title: cartItem.product.title,
			price: cartItem.product.price,
		},
		quantity: cartItem.quantity,
	};
}

async function handleGetCart(req, res) {
	const { jwt } = req.cookies;
	if (!jwt) {
		res.status(401).end();
		return;
	}
	try {
		const products = await axios.get(`${CMS_URL}/cart-items`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		const cartItems = products.data.map(stripCartItem);
		res.status(200).json(cartItems);
	} catch (err) {
		console.log(err.message);
		res.status(401).end();
	}
}

async function handlePostCart(req, res) {
	const { jwt } = req.cookies;
	if (!jwt) {
		res.status(401).end();
		return;
	}
	const { productId, quantity } = req.body;
	try {
		const response = await axios.post(
			`${CMS_URL}/cart-items`,
			{ product: productId, quantity },
			{
				headers: { Authorization: `Bearer ${jwt}` },
			},
		);
		res.status(200).json({});
	} catch (err) {
		console.log('[Cart API] :', err.message);
		res.status(401).end();
	}
}

async function handleCart(req, res) {
	switch (req.method) {
		case 'GET':
			return handleGetCart(req, res);
		case 'POST':
			return handlePostCart(req, res);
		default:
			res.status(405).end();
	}
}

export default handleCart;
