import React, {useState, useEffect, useContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import style from "./App.module.css";

import './App.module.css';
import Header from "./components/general/header/index.js";
import Footer from "./components/general/footer/index.js";
import HouseCard from "./components/general/houseCard/index.js";
import Filter from "./components/general/filter/index.js";
import HousePage from "./components/general/housePage/index.js";
import MainPage from "./components/general/mainPage/index.js";

import Registration from "./components/unauthorized/registration/index.js";
import RegistrationSuccess from "./components/unauthorized/registrationSuccess/index.js";
import PasswordRestoration from "./components/unauthorized/passwordRestoration/index.js";
import NewPassword from "./components/unauthorized/newPassword/index.js";
import NewPasswordSuccess from "./components/unauthorized/newPasswordSuccess/index.js";

import LogIn from "./components/authorized/logIn/index.js";
import PersonalArea from "./components/authorized/personalArea/index.js";




function App() {
	const {store} = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("token")) store.checkAuth();
	}, [])

  return (
  	<BrowserRouter>
  		<div className={style.main} >
		    <Header />
			  	<Routes>
			  		<Route path="/" element={<MainPage />} />
			  		<Route path="/housePage/:houseId" element={<HousePage />} />
			  		<Route path="/registration" element={<Registration />} />
			  		<Route path="/registrationSuccess" element={<RegistrationSuccess />} />	
			  		<Route path="/logIn" element={<LogIn />} />
			  		<Route path="/passwordRestoration" element={<PasswordRestoration />} />
			  		<Route path="/personalArea" element={<PersonalArea user={store.user} />} />
			  		<Route path="/newPassword" element={<NewPassword />} />
			  		<Route path="/newPasswordSuccess" element={<NewPasswordSuccess />} />
			  		
			  	</Routes>
		    <Footer />
		</div> 
  	</BrowserRouter> 
    );
}
export default observer(App);
