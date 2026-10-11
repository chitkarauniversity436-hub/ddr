const serverless = require('serverless-http');
const app = require('../server');
const connectDB = require('../config/db');
const handler = serverless(app);

module.exports = async (req, res) => {
	const pathname = new URL(req.url, 'http://localhost').pathname;

	if (req.method === 'GET' && (pathname === '/' || pathname === '/health')) {
		return handler(req, res);
	}

	try {
		await connectDB();
	} catch (error) {
		console.error(`MongoDB connection failed: ${error.message}`);
		res.statusCode = 503;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ message: 'Database unavailable. Check the server database configuration.' }));
		return;
	}

	return handler(req, res);
};
