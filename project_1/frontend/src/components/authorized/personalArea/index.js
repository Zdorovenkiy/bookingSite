import React, { useState } from "react";
import style from "../../../App.module.css"
import ModalWindow from "../modalWindow/index.js";

function PersonalArea({user}) {
	const [modalActive, setModalActive] = useState(false);

	return(
		<div className={style.personal} >
			<div className={style.container}>
			<h1>Личный кабинет</h1>
				<div  >
					<h2>{user.surname} {user.name} {user.patronymic}</h2>

					<div>
						<span>E-mail</span>
						<span>{user.email}</span>
					</div>

					<div>
						<span>Телефон</span>
						<span>{user.phone}</span>
					</div>

				</div>
				<div className={style.buttonContainer} >
					<button className={style.button} onClick={() => {
						setModalActive(true);
					}} >Изменить данные</button>
				</div>

			</div>
			<ModalWindow user={user} active={modalActive} setActive={setModalActive} />
		</div>
		)
}



export default PersonalArea;