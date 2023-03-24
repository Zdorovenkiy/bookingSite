import React, {useState, useContext, useEffect, useRef} from "react"
import "./modal.css";
import {Context} from "../../../index";
import AuthService from "../../../services/AuthService";
import { useForm } from "react-hook-form"; 
import validator from 'validator';

function ModalWindow({user, active, setActive}) {
	const {store} = useContext(Context);
	const [inputSurname, setInputSurname] = useState();
	const [inputName, setInputName] = useState();
	const [inputPatronymic, setInputPatronymic] = useState();
	const [inputEmail, setInputEmail] = useState();
	const [inputPhone, setInputPhone] = useState();
	const [error, setError] = useState('');

	const surnameRef = React.createRef();
	const nameRef = React.createRef();
	const patronymicRef = React.createRef();
	const emailRef = React.createRef();
	const phoneRef = React.createRef();


	useEffect(() => {
		surnameRef.current.value = user.surname;
		nameRef.current.value = user.name;
		patronymicRef.current.value = user.patronymic;
		emailRef.current.value = user.email;
		phoneRef.current.value = user.phone;
	}, [user])

	async function updateData() {
		setError("");
		const res = await store.updateInfo(store.user.id, inputSurname || user.surname,
														  inputName || user.name,
														  inputPatronymic || user.patronymic,
														  inputEmail || user.email,
														  inputPhone || user.phone);
		
		if (res.status !== 200) {
			setError(res?.data?.message);
		}
	}

	function exitButton() {
		setError("");
		setActive(false);
	}

	return (
		<div className={active ? "modal active" : "modal"} >
			<div className={"modalContent"}>
			<h1>Изменение данных</h1>
			<form>
				<label>
					<p>Фамилия</p>
					<input 
						type="text"
						ref={surnameRef}
						value={inputSurname}
						onChange={(event) => setInputSurname(event.target.value)}/>
				</label>

				<label>	
					<p>Имя</p>

					<input 
						type="text"
						ref={nameRef}
						value={inputName}
						onChange={(event) => setInputName(event.target.value)} />
				</label>


				<label>	
					<p>Отчество</p>
					<input 
						type="text"
						ref={patronymicRef}
						value={inputPatronymic}
						onChange={(event) => setInputPatronymic(event.target.value)} />
				</label>

				<label>		
					<p>E-mail</p>
					<input 
						type="text"
						ref={emailRef}
						value={inputEmail}
						onChange={(event) => setInputEmail(event.target.value)} />
				</label>


				<label>	
					<p>Телефон</p>
					<input 
						type="text"
						ref={phoneRef}
						value={inputPhone}
						onChange={(event) => setInputPhone(event.target.value)} />
				</label>

				<div> {error} </div>
			 </form>
			
				<div className={"buttonContainer"} >
					<div>
						<button className={"button"} onClick={exitButton} >Закрыть</button>
						<button className={"button"} onClick={updateData} >Принять</button>
					</div>
				</div>

			</div>
		</div>
	);
};

export default ModalWindow;