const { Schema, model } = require('mongoose');

const UbicationSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
	},
});

UbicationSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('Ubication', UbicationSchema);
