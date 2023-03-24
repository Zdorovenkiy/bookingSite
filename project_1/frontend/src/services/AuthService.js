import api from "../http";

export default class AuthService {

	static async logIn(email, password) {
		return api.post("/logIn", {email, password});
	}

	static async registration(name, surname, patronymic, email, password, phone) {
		const res = api.post("/registration", {name, surname, patronymic, email, password, phone});

		return res;
	}

	static async logOut() {
		return api.post("/logOut");
	}

	static async userCheck(data) {
		//console.log(data);
		return api.get("/userCheck",  { 
			params: {
				email: data,
			}
		});
	}

	static async updateInfo(id, surname, name, patronymic, email, phone) {
		return api.post("/update",  {id, surname, name, patronymic, email, phone});
	}

	static async updatePassword(email, password) {
		const res = api.post("/updatePassword",  {email, password}).catch(e => e.response);
		return res;
	}

	static async sendCode(email, code) {
		return api.post("/activation",{email, code});
	}

	static async getRooms() {
		return api.get("/mainPage");
	}

	static async getOneRoom(data) {
		return api.get("/roomsPage",  { 
			params: {
				id: data,
			}
		});
	}
}