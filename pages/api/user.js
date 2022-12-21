import axios from 'axios';
const { CMS_URL } = process.env;

async function handleUser(req, res) {
	const { jwt } = req.cookies;
	if (!jwt) {
		res.status(401).end();
		return;
	}
	try {
		const user = await axios.get(`${CMS_URL}/users/me`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		res.status(200).json({
			id: user.data.id,
			name: user.data.username,
		});
	} catch (err) {
		console.log(err.message);
		res.status(401).end();
	}
}

export default handleUser;
