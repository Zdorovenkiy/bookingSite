import React, {useState, useEffect} from "react";
import style from "../../../App.module.css";
import {Link} from "react-router-dom";

function HouseCard({data}) {
	return(
			<Link to={`HousePage/${data._id}`} className={style.card}>
				<p className={style.image}>
					<img src={`./rooms/${data.logoImage}`} alt="изображение" />
				</p>				

					<span className={style.title} >
						<h2>{data.name}</h2>
					</span>

					<span className={style.adress} >{data.adress}</span>

					<span className={style.description}>{data.description}</span>

					<span className={style.price}>
						<span>
							<span>{data.price} руб</span> 
						</span>
						<span>{data.area} кв/км</span>
					</span>				
			</Link>
		)
}

export default HouseCard;