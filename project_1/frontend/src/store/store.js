import AuthService from "../services/AuthService";
import axios from 'axios';
import {makeAutoObservable} from "mobx";
import {API_URL} from "../http";

export default class Store {
	user = {};
	isAuth = false;
	emailForPass = '';

	constructor() {
		makeAutoObservable(this);
	}

	async logIn(email, password) {
		try {
			const res = await AuthService.logIn(email, password);

			localStorage.setItem("token", res.data.accesToken);
			
			this.setAuth(true);
			this.setUser(res.data.user);
			this.setEmailForPass("");
		} catch (e) {
			 return e.response;
		}
	}

	async registration(name, surname, patronymic, email, password, phone) {
		try {
			const res = await AuthService.registration(name, surname, patronymic, email, password, phone);

			localStorage.setItem("token", res.data.accesToken);

			this.setAuth(true);
			this.setUser(res.data.user);
			this.setEmailForPass("");

			return res;
		} catch (e) {

			 return e.response;
		}
	}

	async logOut() {
		try {
			const res = await AuthService.logOut();

			localStorage.removeItem("token");

			this.setAuth(false);
			this.setUser({});
			this.setEmailForPass("");
		} catch (e) {
			 console.log(e.response?.data?.message);
		}
	}

	async updateInfo(id, surname, name, patronymic, email, phone) {
		try {
			const res = await AuthService.updateInfo(id, surname, name, patronymic, email, phone);

			localStorage.setItem("token", res.data.accesToken);

			this.setUser(res.data.user);
			this.setEmailForPass("");

			return res;
		} catch (e) {
			return e.response;
		}
	}

	async checkAuth() {
		try {
			const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
			
			localStorage.setItem("token", res.data.accesToken);

			this.setAuth(true);
			this.setUser(res.data.user);
		} catch (e) {
			
		}
	}

	setAuth(bool) {
		this.isAuth = bool;
	}

	setUser(user) {
		this.user = user;
	}

	setEmailForPass(email) {
		this.emailForPass = email;
	}
}