import api from "../http";

export default class RoomsService {
	static fetchRooms() {
		return api.get("/rooms");
	}
}