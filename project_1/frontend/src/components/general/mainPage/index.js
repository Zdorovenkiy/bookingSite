import React, {useState, useEffect, state, useContext } from "react";
import axios from "axios";
import HouseCard from "../houseCard/index.js";
import Filter from "../filter/index.js";
import style from "../../../App.module.css";
import {Context} from "../../../index";
import AuthService from "../../../services/AuthService";

function MainPage() {
	const [roomsArray, setRoomsArray] = useState([{image:"none"}]);
	const [filters, setFilters] = useState({});
	const {store} = useContext(Context);
	let cardArray = [];

	houseCardManager(roomsArray, cardArray, filters);

	useEffect(() => {
		getRooms(setRoomsArray);
	}, [])

	async function test() {
		await axios.get("/activation");
	} 

	function handlerFilter(filter) {
		setFilters(filter);
	}

	async function getRooms(setRoomsArray) {
		try {
			const res = await AuthService.getRooms();

			setRoomsArray(res.data);
		} catch (e) {
			console.log(e);
		}
	}
	
	function getMaxPrice() {
	  	let max = roomsArray.reduce((prev, cur) => (prev.price > cur.price) ? prev : cur);

		return max.price;
	}

	function getMaxArea() {
	  	let max = roomsArray.reduce((prev, cur) => (prev.area > cur.area) ? prev : cur);

		return max.area;
	}

	function houseCardManager(roomsArray, cardArray, filters) {
		let filteredArray = roomsArray.filter((item) => 
				(filters.priceStart <= item.price && filters.priceEnd >= item.price)
				&& (filters.areaStart <= item.area && filters.areaEnd >= item.area)
				&& (filters.type.length === 0 || filters.type.includes(item.type))
			);

		if (!Object.keys(filters).length) {
			for (let i = 0; i < roomsArray.length; i++) {
				cardArray[i] = <HouseCard key={i} data={roomsArray[i]} />;
			}		
		} else {
			for (let i = 0; i < filteredArray.length; i++) {
				cardArray[i] = <HouseCard key={i} data={filteredArray[i]} />;
			}
		}

	}

	return (
		<div className={style.content} >
			<div className={style.mainPage} >
				<Filter maxPrice={getMaxPrice()} maxArea={getMaxArea()} onChange={handlerFilter}  />

				<div className={style.container} >
					{cardArray}
				</div>

			</div>
		</div>
		)
}

export default MainPage;