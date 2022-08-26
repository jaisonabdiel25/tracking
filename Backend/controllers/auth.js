const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		//Validar Email
		const userDB = await User.findOne({ email });
		if (!userDB) {
			return res.json({
				ok: false,
				msg: 'Usuario o password son incorrectos',
			});
		}
		//validar password
		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				msg: 'Usuario o password son incorrectos',
			});
		}
		//Generar el TOKEN
		const token = await generarToken(userDB.id);

		res.status(200).json({ ok: true, token, userDB });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: true,
			msg: 'hable con el administrador',
		});
	}
};

module.exports = {
	loginUser,
};
