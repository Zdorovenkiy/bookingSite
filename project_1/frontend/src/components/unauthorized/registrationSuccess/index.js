import React from "react";
import style from "../../../App.module.css"
import {Link} from "react-router-dom";

function RegistrationSuccess() {
	return(
		<div className={style.registration} >
			<div className={style.container} >
				<p>«Регистрация пройдена успешно! Для полноценного использования сайта <Link to="/logIn">авторизуйтесь</Link>»</p>
			</div>
		</div>	
		)
}

export default RegistrationSuccess;