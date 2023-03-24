import React, { useState, useEffect, useContext, useRef} from "react";
import { useForm } from "react-hook-form"; 
import style from "../../../App.module.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {Context} from "../../../index";
import validator from 'validator';

const KEY = "6LdWTAokAAAAAFyfUqHkzGxIP8t7c6dOcTcibRHO";

function Registration() {
	const [inputSurname, setInputSurname] = useState('');
	const [inputName, setInputName] = useState('');
	const [inputPatronymic, setInputPatronymic] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputPhone, setInputPhone] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [inputPasswordSecond, setInputPasswordSecond] = useState('');
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);
	const {store} = useContext(Context);

	let {
		register,
		formState: { errors },
		handleSubmit
	} = useForm();

	async function userSend() {
		const headers = {
	      'Content-Type': 'application/json;charset=UTF-8',
	      "Access-Control-Allow-Origin": "*"
		}

		let user = {
			"name": inputName,
			"surname": inputSurname,
			"email": inputEmail,
			"phone": inputPhone,
			"password": inputPassword
		};

		if (inputPassword === inputPasswordSecond && isCaptchaSuccessful) {
			user.patronymic = inputPatronymic;

			const res = await store.registration(user.name, user.surname, user.patronymic, user.email, user.password, user.phone);

			if (res.status === 200) {
				window.location.href = 'http://localhost:3000/registrationSuccess';
			}
		}
	}

	function onChange(value) {
	  setIsCaptchaSuccess(true);
	}

	return(
		<div className={style.registration} >
			<div className={style.container} >
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(userSend)}>
				<label>		
					<p>Фамилия</p>
					<input 
						{...register("lastName", {
							required: "Поле обязательно для заполнения"
						})}
						type="text"
						value={inputSurname}
						onChange={(event) => setInputSurname(event.target.value)}
						className={!errors?.lastName ? style.registrationInput : style.errorInput}/>
				</label>

				<div> {errors?.lastName && <p> {errors?.lastName?.message} </p>  } </div>

				<label>	
					<p>Имя</p>

					<input 
						{...register("firstName", {
							required: "Поле обязательно для заполнения"
						})}
						type="text"
						value={inputName}
						onChange={(event) => setInputName(event.target.value)}
						className={!errors?.firstName ? style.registrationInput : style.errorInput}/>	
				</label>

				<div> {errors?.firstName && <p> {errors?.firstName?.message} </p>} </div>

				<label>	
					<p>Отчество</p>
					<input 
						{...register("patronymic", {
							required: "Поле обязательно для заполнения"
						})}
						type="text"
						value={inputPatronymic}
						onChange={(event) => setInputPatronymic(event.target.value)}
						className={!errors?.patronymic ? style.registrationInput : style.errorInput}/>	
				</label>

				<div> {errors?.patronymic && <p> {errors?.patronymic?.message} </p>} </div>

				<label>		
					<p>E-mail</p>
					<input 
						{...register("email", {
							required: "Поле обязательно для заполнения",
							validate: email => validator.isEmail(email) || "Неккоректный формат"

						})}
						type="text"
						value={inputEmail}
						onChange={(event) => setInputEmail(event.target.value)}
						className={!errors?.email ? style.registrationInput : style.errorInput}/>
				</label>

				<div> {errors?.email && <p> {errors?.email?.message} </p>} </div>

				<label>	
					<p>Телефон</p>
					<input 
						{...register("phone", {
							required: "Поле обязательно для заполнения",
							pattern: {
								value: /\+7[0-9]{10}$/,
								message: "Неккоректный формат"
							}
						})}
						type="text"
						value={inputPhone}
						onChange={(event) => setInputPhone(event.target.value)}
						className={!errors?.phone ? style.registrationInput : style.errorInput}/>	
				</label>

				<div> {errors?.phone && <p> {errors?.phone?.message} </p>} </div>

				<label>	
					<p>Пароль</p>
					<input 
						{...register("password", {
							required: "Поле обязательно для заполнения",
							minLength: {
								value: 8,
								message: "Пароль должен быть не менее 8 символов"
							},
						})}					
						type="text"
						value={inputPassword}
						onChange={(event) => setInputPassword(event.target.value)}
						className={!errors?.password ? style.registrationInput : style.errorInput}/>
						
				</label>

				<div> 
					{errors?.password && errors.password.type === "validate" && <p> f </p>}
					{errors?.password && <p> {errors?.password?.message} </p>}

				 </div>

				<label>	
					<p>Повторите пароль</p>
					<input 
						{...register("passwordSecond", {
							required: "Поле обязательно для заполнения"
						})}					
						type="text"
						value={inputPasswordSecond}
						onChange={(event) => setInputPasswordSecond(event.target.value)}
						className={!errors?.passwordSecond ? style.registrationInput : style.errorInput}/>
				</label>

				<div> {errors?.passwordSecond && <p> {errors?.passwordSecond?.message} </p>} </div>


				<ReCAPTCHA 
					className={style.captcha}
					sitekey={KEY}
					onChange={onChange}
					 />

				<div className={style.buttonContainer} >
					<button className={style.button} type="submit" >Зарегистрироваться</button>
				</div>

			</form>
			</div>
		</div>	
		)
}


export default Registration;