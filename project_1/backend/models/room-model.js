const {Schema, model} = require("mongoose");

const RoomSchema = new Schema({
	name: {type: String, required: true},
	price: {type: Number, required: true},
	area: {type: Number, required: true},
	description: {type: String, required: true},
	logoImage: {type: String, required: true},
	images: {type: Array, required: true},
	type: {type: String, required: true},
	adress: {type: String, required: true}
})

module.exports = model("Room", RoomSchema);