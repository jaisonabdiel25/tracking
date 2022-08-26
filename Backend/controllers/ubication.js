const { response } = require('express');
const Ubication = require('../models/ubication');

const getUbications = async (req, res = response) => {
	const outSet = Number(req.query.ouset) || 0;

	const [ubications, totalUbications] = await Promise.all([Ubication.find(), Ubication.count()]);
	res.json({
		ok: true,
		ubications,
		totalUbications,
	});
};

const newUbication = async (req, res = response) => {
	const { name } = req.body;

	const ubicationExist = await Ubication.findOne({ name: name.toLowerCase() });
	if (ubicationExist) {
		return res.status(400).json({
			ok: false,
			msg: 'La ubicación ya existe',
		});
	}

	try {
		const body = {
			...req.body,
			name: req.body.name.toLowerCase(),
		};
		const ubicationDB = new Ubication(body);

		//Guardar ubicacion
		await ubicationDB.save();

		res.json({ ubicationDB });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const updateUbication = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const ubicationDB = await User.findById(uid);
		if (!ubicationDB) {
			return res.status(404).json({
				ok: false,
				msg: 'La ubicación no existe',
			});
		}

		const { name } = req.body;

		const nameExist = await Ubication.findOne({ name: name.toLowerCase() });
		if (nameExist) {
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe una ubicacion con este nombre',
			});
		}

		const body = {
			...req.body,
			name: req.body.name.toLowerCase(),
		};
		const ubicationUpdate = await Ubication.findByIdAndUpdate(uid, body, { new: true });

		res.json({
			ok: true,
			ubicationUpdate,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

module.exports = {
	getUbications,
	newUbication,
	updateUbication,
};
