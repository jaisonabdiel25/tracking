const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
	tracking: {
		type: String,
		required: true,
	},
	client: {
		type: String,
		required: true,
	},
	ubication: {
		type: Schema.Types.ObjectId,
		ref: 'Ubication',
		default: '62f51ac8a7a2300dc5a11495',
	},
	weight: {
		type: Number,
		default: 0,
	},
	cost: {
		type: Number,
		default: 0,
	},
});

OrderSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('Order', OrderSchema);
