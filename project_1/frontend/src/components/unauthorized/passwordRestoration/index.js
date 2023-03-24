import React, { useState, useEffect, useContext} from "react";
import style from "../../../App.module.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {Context} from "../../../index";
import AuthService from "../../../services/AuthService";

const KEY = "6LdWTAokAAAAAFyfUqHkzGxIP8t7c6dOcTcibRHO";

function PasswordRestoration() {
	const [userArray, setUserArray] = useState([]);
	const [inputEmail, setInputEmail] = useState('');
	const [inputCode, setInputCode] = useState('');
	const [code, setCode] = useState('');
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);
	const {store} = useContext(Context);
	
	useEffect(() => {
		AuthService.sendCode(inputEmail, code);	
	}, [code])

	async function getPassword(setCode){
		let check = await getUser(inputEmail);

		localStorage.setItem("emailForPass", inputEmail);

		if (check && isCaptchaSuccessful) {
			setCode(Math.round(Math.random() * (999999 - 100000) + 100000));
		}
	}

	async function codeCheck(){
		if (inputCode == code && !!code) {
			window.location.href = 'http://localhost:3000/newPassword';
		} 
	}

	function onChange(value) {
	  	setIsCaptchaSuccess(true);
	}

	return(
		<div className={style.forgetPassword} >
			<div className={style.container} >
			<h1>Восстановление пароля</h1>
				<div>
					<span>Введите свою почту:</span>
					<input 
						type="text"
						value={inputEmail}
						onChange={(event) => setInputEmail(event.target.value)}
						className={style.fpInput}/>
				</div>
				<div>
					<ReCAPTCHA 					
						className={style.captcha}
						sitekey={KEY}
						onChange={onChange}/>
				</div>

				<div className={style.buttonContainer} >
					<button className={style.button} onClick={() => getPassword(setCode)} >Отправить</button>
				</div>
			
				<div>
				<span>Введите полученый код:</span>
					<input 
						type="text"
						value={inputCode}
						onChange={(event) => setInputCode(event.target.value)}
						className={style.fpInput}/>
				</div>
				
				<div className={style.buttonContainer} >
					<button className={style.button} onClick={codeCheck} >Принять</button>
				</div>
			</div>
	
		</div>	
		)
}

async function getUser(email) {
	try {
		const res = await AuthService.userCheck(email);

		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export default PasswordRestoration;