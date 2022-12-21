import Page from '../components/Page';

import { useQuery } from 'react-query';
import axios from 'axios';

const CartPage = () => {
	const query = useQuery('cartItems', async () => {
		try {
			return await axios.get('/api/cart');
		} catch (err) {
			console.log(err);
		}
	});

	let cartItems = query.data;
	console.log('[CartPage] : ', cartItems);

	return (
		<>
			<Page title='Cart'>
				<main className='p-4'>
					{cartItems && <CartTable cartItems={cartItems} />}
				</main>
			</Page>
		</>
	);
};

export default CartPage;

function CartTable({ cartItems }) {
	const cart = buildCart(cartItems.data);
	return (
		<table>
			<thead>
				<tr>
					<th className='px-4 py-2'>Product</th>
					<th className='px-4 py-2'>Price</th>
					<th className='px-4 py-2'>Quantity</th>
					<th className='px-4 py-2'>Total</th>
				</tr>
			</thead>
			<tbody>
				{cart.items.map((cartItem) => (
					<tr key={cartItem.id}>
						<td className='px-4 py-2'>{cartItem.product.title}</td>
						<td className='px-4 py-2 text-right'>
							{formatCurrency(cartItem.product.price)}
						</td>
						<td className='px-4 py-2 text-right'>{cartItem.quantity}</td>
						<td className='px-4 py-2 text-right'>
							{formatCurrency(cartItem.total)}
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th className='px-4 py-2 text-left'>Total</th>
					<th></th>
					<th></th>
					<th className='px-4 py-2 text-right'>{formatCurrency(cart.total)}</th>
				</tr>
			</tfoot>
		</table>
	);
}

function formatCurrency(value) {
	return '$' + value.toFixed(2);
}

function buildCart(cartItems) {
	let total = 0.0;
	const items = [];
	for (const cartItem of cartItems) {
		const itemTotal = cartItem.product.price * cartItem.quantity;
		total += itemTotal;
		items.push({ ...cartItem, total: itemTotal });
	}
	return { items, total };
}
