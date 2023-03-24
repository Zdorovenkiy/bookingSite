import React from "react";
import style from "../../../App.module.css"
import {Link} from "react-router-dom";

function NewPasswordSuccess() {
	return(
		<div className={style.authorization} >
			<div className={style.container} >
				<p>«Пароль восстановлен успешно! Для того чтобы разместить объявление <Link to="/logIn">авторизуйтесь</Link>»</p>
			</div>
	
		</div>	
		)
}

export default NewPasswordSuccess;