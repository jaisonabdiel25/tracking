const { response } = require('express');
const Order = require('../models/order');
const User = require('../models/users');
const Client = require('../models/client');
const nodemailer = require('nodemailer');
const { mailConfig } = require('../mail/config');

const getOrders = async (req, res = response) => {
	const outSet = Number(req.query.ouset) || 0;

	//Limites de tracking
	//const [orders, totalOrders] = await Promise.all([Order.find().skip(outSet).limit(5).populate('ubication', 'name'), Order.count()]);

	const [orders, totalOrders] = await Promise.all([Order.find().populate('ubication', 'name'), Order.count()]);
	res.json({
		ok: true,
		orders,
		totalOrders,
	});
};

const newOrder = async (req, res = response) => {
	const { tracking, weight } = req.body;

	const trackingExist = await Order.findOne({ tracking });
	if (trackingExist) {
		return res.status(400).json({
			ok: false,
			msg: 'Este trackng ya existe',
		});
	}
	try {
		const body = {
			...req.body,
			tracking: req.body.tracking.toLowerCase(),
		};
		const orderDB = new Order(body);

		orderDB.cost = weight * 2.4;

		//Guardar Tracking en bodega
		await orderDB.save();

		return res.status(200).json({ orderDB });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado',
		});
	}
};

const receiveOrderPlace = async (req, res) => {
	const transporter = nodemailer.createTransport(mailConfig);
	const { tracking, user } = req.body;

	try {
		const [order, userRecesive] = await Promise.all([
			Order.findOne({ tracking: tracking.toString() }),
			User.findById(user).populate('ubication', 'name'),
		]);

		const { email } = await Client.findOne({ code: order.client });

		if (!order) {
			return res.json({ ok: false, msg: 'El tracking no existe' });
		}

		const {
			ubication: { name, _id },
		} = userRecesive;

		await Order.findOneAndUpdate({ tracking }, { ubication: _id.toString() });

		const mailOption = {
			from: process.env.USER,
			to: email,
			subject: `Pedido ${tracking} ya se encuentra en nustras manos`,
			text: `Buenas tardes, queremos informale que su pedido se encuentra en la sucursal de ${name}`,
		};

		//Envio de correo a cliente indicando que su pedido ya esta en la sucursal
		// transporter.sendMail(mailOption, (error, info) => {
		// 	if (error) {
		// 		return res.json({ ok: false, msg: 'No se pudo enviar el mensaje' });
		// 	} else {
		// 		return res.json({ ok: true, msg: 'Mensaje enviado correctamente', order });
		// 	}
		// });

		return res.json({ ok: true, mailOption });
	} catch (error) {
		console.log(error);
		return res.json({ ok: false, msg: 'Ocurrio un error' });
	}
};

const updateOrder = async (req, res = response) => {
	const uid = req.params.id;

	// try {
	// 	const userDB = await User.findById(uid);
	// 	if (!userDB) {
	// 		return res.status(404).json({
	// 			ok: false,
	// 			msg: 'El usuario no existe',
	// 		});
	// 	}

	// 	const { password, google, email, ...campos } = req.body;

	// 	if (userDB.password != password) {
	// 		const emailExist = await User.findOne({ email: req.body.email });

	// 		if (emailExist) {
	// 			return res.status(400).json({
	// 				ok: false,
	// 				msg: 'Ya existe un usuario con este Email',
	// 			});
	// 		}
	// 	}

	// 	campos.email = email;
	// 	const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true });

	// 	res.json({
	// 		ok: true,
	// 		userUpdate,
	// 	});
	// } catch (error) {
	// 	res.status(500).json({
	// 		ok: false,
	// 		msg: 'Error inesperado',
	// 	});
	// }

	return res.status(200).json({ uid });
};

module.exports = {
	getOrders,
	newOrder,
	updateOrder,
	receiveOrderPlace,
};
