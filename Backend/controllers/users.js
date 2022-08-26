const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const getUsers = async (req, res = response) => {
	const outSet = Number(req.query.ouset) || 0;

	const [users, totalUser] = await Promise.all([User.find().skip(outSet).limit(5), User.count()]);
	res.json({
		ok: true,
		users,
		totalUser,
	});
};

const newUser = async (req, res = response) => {
	const { password, email } = req.body;

	const emailExist = await User.findOne({ email });
	if (emailExist) {
		return res.status(400).json({
			ok: false,
			msg: 'El correo ya existe',
		});
	}

	try {
		const userDB = new User(req.body);

		//encriptar contraseña
		const salt = bcrypt.genSaltSync();
		userDB.password = bcrypt.hashSync(password, salt);

		//Guardar usuario
		await userDB.save();

		const token = await generarToken(userDB.id);
		res.json({ token, userDB });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const updateUser = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const userDB = await User.findById(uid);
		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'El usuario no existe',
			});
		}

		const { password, google, email, ...campos } = req.body;

		if (userDB.password != password) {
			const emailExist = await User.findOne({ email: req.body.email });

			if (emailExist) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un usuario con este Email',
				});
			}
		}

		campos.email = email;
		const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true });

		res.json({
			ok: true,
			userUpdate,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

module.exports = {
	getUsers,
	newUser,
	updateUser,
};
