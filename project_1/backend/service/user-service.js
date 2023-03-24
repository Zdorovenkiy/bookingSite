const userModel = require("../models/user-model");
const roomModel = require("../models/room-model");
const tokenService = require("./token-service");
const userDtos = require('../dtos/user-dtos');
const ObjectId = require("mongodb").ObjectId;
const ApiError = require('../exceptions/index');

class UserService {
	async registration(name, surname, patronymic, email, password, phone) {
		const candidate = await userModel.findOne({email});

		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
		}

		const user = await userModel.create({name, surname, patronymic, email, password, phone})
		const userDto = new userDtos(user);
		const tokens =  tokenService.generateToken({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	}

	async logIn(email, password) {
		const user = await userModel.findOne({email});

		if (!user) {
			 throw ApiError.BadRequest('Пользователь с таким email не найден')
		}

		const isPassword = (user.password === password) ? true : false;

		if (!isPassword ) throw ApiError.BadRequest('Неверный пароль');

		const userDto = new userDtos(user);
		const tokens =  tokenService.generateToken({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	}

	async logOut(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);

		return token;
	}

	async update(id, surname, name, patronymic, email, phone) {
		const candidate = await userModel.updateOne({"_id": ObjectId(id)}, {$set: {"surname": surname,
																				   "name": name,
																				   "patronymic": patronymic,
																				   "email": email,
																				   "phone": phone}});
		const user = await userModel.findOne(ObjectId(id));
		const userDto = new userDtos(user);
		const tokens =  tokenService.generateToken({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async updatePassword(email, password) {
		const candidate = await userModel.updateOne({"email": email}, {$set: {"password": password}});
		const user = await userModel.findOne({email});
		const userDto = new userDtos(user);

		return {user: userDto};
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDatabase = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDatabase) {
			throw ApiError.UnauthorizedError();
		}

		const user = await userModel.findById(userData.id);
		const userDto = new userDtos(user);
		const tokens =  tokenService.generateToken({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	}

	async userCheck(email) {
		const user = await userModel.findOne({email});

		if (!user) {
			return false;
		} else {
		 	return true;
		}

	}

	async getRooms() {
		const rooms = await roomModel.find();

		return rooms;
	}

	async getOneRoom(id) {
		const room = await roomModel.findOne(ObjectId(id));
		
		return room;
	}

}

module.exports = new UserService();