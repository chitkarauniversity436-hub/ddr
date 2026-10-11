const serverless = require('serverless-http');
const app = require('../server');
const connectDB = require('../config/db');
const handler = serverless(app);

module.exports = async (req, res) => {
	await connectDB();
	return handler(req, res);
};
