export default async function handleRevalidate(req, res) {
	// console.log('/api/revalidate received :', req.body);
	const event = req.body;
	if (event.model === 'product') {
		const id = event.entry.id;
		await Promise.all([res.revalidate('/'), res.revalidate(`/products/${id}`)]);
		console.log(`revalidated product ${id}`);
	}
	res.status(204).end();
}

// ON DEMAND REVALIDATION -> OPTION A ACTIVER DANS STRAPI
