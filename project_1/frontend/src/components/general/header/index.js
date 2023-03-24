import React,{useContext} from "react";
import style from "../../../App.module.css";
import {Link} from "react-router-dom";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

function Header() {
	const {store} = useContext(Context);

	function exitHandler() {
		store.logOut();
	}

	function authButtons(isAuth) {
		if (isAuth) {
			return (
					<ul className={style.auth} >
						
						<Link to="/personalArea"><li>Личный кабинет</li></Link>
											
						<Link to="/" onClick={exitHandler}><li>Выйти</li></Link>
						
					</ul>
			)
		} else {
			return (
					<ul className={style.auth} >
						
						<Link to="/logIn"><li>Авторизация</li></Link>
											
						<Link to="/registration"><li>Регистрация</li></Link>
						
					</ul>
			)			
		}
	}

	return (
		<nav className={style.header} >
			<div className={style.container} >  
				<ul className={style.logo} >

					<Link to="/">
						<li><img src="./logo/logo1.png" alt=""  /></li>
					</Link>
					
					<li  className={style.text}>Сервис по бронированию жилья</li>

				</ul>		
				{authButtons(store.isAuth)}
			</div>
		</nav>

		)
}

export default observer(Header);