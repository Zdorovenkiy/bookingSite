import React, { useRef, useState, useEffect, useContext } from "react";
import style from "../../../App.module.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import {Link, useParams} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {Context} from "../../../index";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

function HousePage() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [roomsArray, setRoomsArray] = useState([{images:"none"}]);
	const data = useParams();
	const {store} = useContext(Context);
	
	useEffect(() => {
		getOneRoom(setRoomsArray, data);	
	}, [])

	function messageBtn() {
		if (store.isAuth) {
			return (
				<div className={style.buttonContainer} >

					<button className={style.button} >Написать сообщение арендодателю</button>

				</div>)
		} else {
			return (
				<div className={style.btnContainer} >

				<p>Для того что бы написать сообщения арендодателю авторизуйтесь</p>

				</div>)			
		}
	}

	function getImages() {
		return <p>{roomsArray?.images?.map(image => 
					<SwiperSlide>
						<img src={`../../../rooms/${image}`}/>
					</SwiperSlide>)}</p>	
	}

	return(
		<div>
			<div className={style.housePage} >

				<span className={style.title}>
					<h1>{roomsArray.name}</h1>
				</span>

				<div className={style.imageSlider} >
					<Swiper style={{
					      "--swiper-navigation-color": "#fff",
					      "--swiper-pagination-color": "#fff",
					    }}
					    loop={true}
					    spaceBetween={10}
					    navigation={true}
					    thumbs={{ swiper: thumbsSwiper }}
					    modules={[FreeMode, Navigation, Thumbs]}
					    className="mySwiper2">
						
						{getImages()}

				    </Swiper>
				</div>

				<div className={style.houseContainer} >
					<span className={style.description} >{roomsArray.description} </span>
					<span className={style.dataContainer} >
						<div className={style.data} >

							<div>
								<h2>{roomsArray.price} руб</h2>
								<h3>{roomsArray.area} км/кв</h3>
							</div>

							<p>{roomsArray.adress}</p>

							{messageBtn()}
						</div>
					</span>
				</div>
			</div>
		</div>
		)
}

async function getOneRoom(setRoomsArray, data) {
	try {
		const res = await AuthService.getOneRoom(data.houseId);

		setRoomsArray(res.data);
	} catch (e) {
		console.log(e);
	}
}

export default HousePage;