const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	movil: {
		type: String,
		required: true,
		unique: false,
	},
	direction: {
		type: String,
	},
});

ClientSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('Client', ClientSchema);
