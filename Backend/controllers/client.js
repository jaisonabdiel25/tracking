const { response } = require('express');
const Client = require('../models/client');

const getClient = async (req, res = response) => {
	const outSet = Number(req.query.ouset) || 0;

	const [clients, totalClient] = await Promise.all([Client.find().skip(outSet).limit(10), Client.count()]);
	res.json({
		ok: true,
		clients,
		totalClient,
	});
};

const newClient = async (req, res = response) => {
	const { code, email } = req.body;

	const emailExist = await Client.findOne({ email });

	if (emailExist) {
		return res.status(400).json({
			ok: false,
			msg: 'Ya existe otro cliente asociado a este correo',
		});
	}

	const codeExist = await Client.findOne({ code });
	if (codeExist) {
		return res.status(400).json({
			ok: false,
			msg: 'Ya existe otro cliente asociado a este codigo',
		});
	}

	try {
		const clientDB = new Client(req.body);

		//Guardar cliente
		await clientDB.save();

		res.json({ clientDB });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const updateClient = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const clientDB = await Client.findById(uid);
		if (!clientDB) {
			return res.status(404).json({
				ok: false,
				msg: 'El Cliente no existe',
			});
		}

		const body = {
			...req.body,
			name: req.body.name.toLowerCase(),
		};
		const clientUpdate = await Client.findByIdAndUpdate(uid, body, { new: true });

		res.json({
			ok: true,
			clientUpdate,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

module.exports = {
	getClient,
	newClient,
	updateClient,
};
