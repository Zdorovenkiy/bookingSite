import React from "react";
import style from "../../../App.module.css"

function Footer() {
	return(
		<nav className={style.footer} >
			<div className={style.container}>  
				<ul className={style.support} >
					<a href="	"><li>Конфиденциальность</li></a>
					<a href="	"><li>Условия</li></a>
					<a href="	"><li>Служба поддержки</li></a>
					<a href="	"><li>Контакты</li></a>
				</ul>
				<ul className={style.media}  >
					<li><a href=""><img src="./logo/socialMedia1.png" alt=""  /></a></li>
					<li><a href=""><img src="./logo/socialMedia2.png" alt=""  /></a></li>
					<li><a href=""><img src="./logo/socialMedia3.png" alt=""  /></a></li>
					<li><a href=""><img src="./logo/socialMedia4.png" alt=""  /></a></li>
				</ul>
			</div>
			<div className={style.container}>  
				<span className={style.copyright}>Copyright © 2022–2023 CompanyName.com™. Все права защищены.</span>
			</div>
		</nav>

		)
}

export default Footer;