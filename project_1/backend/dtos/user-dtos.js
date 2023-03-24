module.exports = class UserDtos {
	name;
	surname;
	patronymic;
	email;
	id;
	phone;

	constructor(model) {
		this.name = model.name;
		this.surname = model.surname;
		this.patronymic = model.patronymic;
		this.email = model.email;
		this.id = model._id;
		this.phone = model.phone;

	}
}