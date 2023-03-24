const userService = require("../service/user-service");
const mailService = require("../service/mail-service");
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/index');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				 return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const {name, surname, patronymic, email, password, phone} = req.body;
			const userData = await userService.registration(name, surname, patronymic, email, password, phone);

			res.cookie("refreshToken", userData.refreshToken, {httpOnly: true})

			return res.json(userData);

		} catch (e) {
			next(e);
		}
	}

	async logIn(req, res, next) {
		try {
			const {email, password} = req.body;
			const userData = await userService.logIn(email, password);
			
			res.cookie("refreshToken", userData.refreshToken, {httpOnly: true})

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logOut(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const token = await userService.logOut(refreshToken);

			res.clearCookie("refreshToken");

			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async update(req, res, next) {
		try {
			const errorsRes = validationResult(req);
			const {id, surname, name, patronymic, email, phone} = req.body;
			let emailErr = false;
			let phoneErr = false;
			let emptyErr

			if (!!!surname && !!!name && !!!patronymic && !!!email && !!!phone) {
				return next(ApiError.BadRequest('Введите новые данные', errorsRes.array()));
			}

			errorsRes.errors.forEach((item, i) => {
				if (item.param === "email") {
					emailErr = true;
				} else if (item.param === "phone") {
					phoneErr = true;
				} else if (item.param === "name" || item.param === "surname") {
					emptyErr = true;
				}
			})	

			if (emailErr) {
				return next(ApiError.BadRequest('Неверный формат E-mail', errorsRes.array()));
			}
			if (phoneErr) {
				return next(ApiError.BadRequest('Введите номер в формате +7xxxxxxxxxx', errorsRes.array()));
			}
			if (emptyErr) {
				return next(ApiError.BadRequest('Данные не должны быть пустыми', errorsRes.array()));
			}

			const userData = await userService.update(id, surname, name, patronymic, email, phone);

			res.cookie("refreshToken", userData.refreshToken, {httpOnly: true})
			
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async updatePassword(req, res, next) {
		try {
			const errorsRes = validationResult(req);
			const {email, password} = req.body;

			if (!errorsRes.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errorsRes.array()));
			} 

			const userData = await userService.updatePassword(email, password);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const userData = await userService.refresh(refreshToken);
			
			res.cookie("refreshToken", userData.refreshToken, {httpOnly: true})

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async activation(req, res, next) {
		try {
			const {email, code} = req.body;

			await mailService.sendPasswordReset(email, code);
		} catch (e) {
			next(e);
		}
	}

	async userCheck(req, res, next) {
		try {
			const {email} = req.query;
			const bool = await userService.userCheck(email);

			return res.json(bool);
		} catch (e) {
			next(e);
		}
	}

	async getRooms(req, res, next) {
		try {
			const rooms = await userService.getRooms();

			return res.json(rooms);
		} catch (e) {
			next(e);
		}
	}

	async getOneRoom(req, res, next) {
		try {
			const {id} = req.query;
			const room = await userService.getOneRoom(id);
			
			return res.json(room);
		} catch (e) {
			next(e);
		}
	}
	
}

module.exports = new UserController();