const nodemailer = require('nodemailer');
const { mailConfig } = require('../mail/config');

const sendMail = (req, res) => {
	const transporter = nodemailer.createTransport(mailConfig);

	const mailOption = {
		from: process.env.USER,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.text,
	};

	transporter.sendMail(mailOption, (error, info) => {
		if (error) {
			return res.json({ ok: false, msg: 'No se pudo enviar el mensaje' });
		} else {
			return res.json({ ok: true, msg: 'Mensaje enviado correctamente' });
		}
	});
};

module.exports = {
	sendMail,
};
