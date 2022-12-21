import axios from 'axios';
import cookie from 'cookie';

const { CMS_URL } = process.env;

export default async function handleLogin(req, res) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}
	console.log('API request :', req.body);
	const { email, password } = req.body;
	try {
		const response = await axios.post(`${CMS_URL}/auth/local`, {
			identifier: email,
			password,
		});
		const { jwt, user } = response.data;
		res
			.status(200)
			.setHeader(
				'Set-Cookie',
				cookie.serialize('jwt', jwt, {
					path: '/api',
					httpOnly: true,
				}),
			)
			.json({
				id: user.id,
				name: user.username,
			})
			.then(console.log(user));
	} catch (err) {
		res.status(401).end();
	}
}
