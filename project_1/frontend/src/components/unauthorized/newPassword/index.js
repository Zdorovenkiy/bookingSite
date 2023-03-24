import React, { useState, useContext } from "react";
import style from "../../../App.module.css";
import axios from "axios";
import {Context} from "../../../index";
import AuthService from "../../../services/AuthService";

function NewPassword() {
  	const [inputPasswordOne, setInputPasswordOne] = useState('');
  	const [inputPasswordSecond, setInputPasswordSecond] = useState('');
  	const [error, setError] = useState('');
  	const {store} = useContext(Context);

	async function passwordCheck(){	
		let emailForPass = localStorage.getItem("emailForPass");

		if (inputPasswordOne === inputPasswordSecond && inputPasswordOne !== '') {
			const res = await AuthService.updatePassword(emailForPass, inputPasswordOne);

			if (res.status !== 200) {
				setError(res?.data?.message);
			} else {
				localStorage.removeItem("emailForPass");
				window.location.href = 'http://localhost:3000/newPasswordSuccess';
			}
			
		} else {
			setError("Пароли не совпадают");
		} 
	
	}

	return(
		<div className={style.newPassword} >
			<div className={style.container} >
			<h1>Восстановление пароля</h1>
			<form>
				<label>
					<p>Пароль</p>
					<input 
						type="text"
						value={inputPasswordOne}
						onChange={(event) => setInputPasswordOne(event.target.value)}
						className={style.npInput}/>
				</label>
				<label>
					<p>Повторите пароль</p>
					<input 
						type="text"
						value={inputPasswordSecond}
						onChange={(event) => setInputPasswordSecond(event.target.value)}
						className={style.npInput}/>
				</label>	
				<div> {error} </div>
			</form>
			
				<div className={style.buttonContainer} >
					<button className={style.button} onClick={passwordCheck} >Принять</button>
				</div>
			</div>

		</div>	
		)
}

export default NewPassword;