const mailConfig = {
	host: 'smtp.office365.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
};

module.exports = {
	mailConfig,
};
