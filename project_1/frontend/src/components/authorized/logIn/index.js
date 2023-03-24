import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import style from "../../../App.module.css";
import axios from "axios";
import validator from 'validator';
import {Context} from "../../../index"
import { useForm } from "react-hook-form"; 


function LogIn() {
	const [userArray, setUserArray] = useState([]);
	const [inputEmail, setInputEmail] = useState('');
  	const [inputPassword, setInputPassword] = useState('');
  	const [err, setErr] = useState('');
  	const {store} = useContext(Context);

  	let {
		register,
		formState: { errors },
		handleSubmit
	} = useForm();
	
	async function loginHandler() {
		const res = await store.logIn(inputEmail, inputPassword);

		if (store.isAuth) {
			window.location.href = 'http://localhost:3000/personalArea'
		} else {
			setErr(res.data.message);
		}
	}

	return(
		<div className={style.authorization} >
			<div className={style.container} >
			<h1>Вход</h1>
			<form onSubmit={handleSubmit(loginHandler)}>
				<label>
					<p>E-mail</p>
					<input 
						{...register("email", {
							required: "Поле обязательно для заполнения"
						})}
						type="text"
						value={inputEmail}
						onChange={(event) => setInputEmail(event.target.value)}
						className={!errors?.email ? style.authInput : style.errorInput}/>
				</label>
				<div> {errors?.email && <p> {errors?.email?.message} </p>} </div>

				<label>
					<p>Пароль</p>
					<input 
						{...register("password", {
							required: "Поле обязательно для заполнения"
						})}
						type="text"
						value={inputPassword}
						onChange={(event) => setInputPassword(event.target.value)}
						className={!errors?.password ? style.authInput : style.errorInput}/>
				</label>
				<div> {errors?.password && <p> {errors?.password?.message} </p>} </div>

				<div className={style.buttonContainer} >
					<button className={style.button} type="submit"  >Принять</button>
				</div>

				<div> {err} </div>
			</form>

				<p><Link to="/passwordRestoration">Забыли пароль?</Link></p>
				<p><Link to="/registration">Зарегистрируйтесь</Link></p>
			</div>
		</div>	
		)
}


export default LogIn;