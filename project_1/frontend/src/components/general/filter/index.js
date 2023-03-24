import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import style from "../../../App.module.css"
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

function Filter(props) {
	let priceMin = 0;
	let priceMax = props.maxPrice;
	let areaMin = 0;
	let areaMax = props.maxArea;
	const priceRef = React.createRef();
	const areaRef = React.createRef();

	const [priceRange, setPriceRange] = useState({priceMin, priceMax});
	const [areaRange, setAreaRange] = useState({areaMin, areaMax});	
	const [isRoom, setIsRoom] = useState(false);
	const [isHotel, setIsHotel] = useState(false);
	const [isHouse, setIsHouse] = useState(false);

	useEffect(() => {
		priceRef.current.value = priceMax;
		areaRef.current.value = areaMax;
	}, [priceMax]);

	function priceChange({target: {name, value}}) {
	    setPriceRange({
	      ...priceRange,
	      [name]: Math.min(priceMax, Math.max(priceMin, value))
	    });
	}

	function areaChange({target: {name, value}}){
	    setAreaRange({
	      ...areaRange,
	      [name]: Math.min(areaMax, Math.max(areaMin, value))
	    });
	}	


	function handlerFilter(event) {
		let filter = {
			priceStart: priceRange.priceMin,
			priceEnd: priceRef.current.value,
			areaStart: areaRange.areaMin,
			areaEnd: areaRef.current.value,
			type: []
		}

		if (isRoom) filter.type.push("Room");
		if (isHouse) filter.type.push("house");	
		if (isHotel) filter.type.push("hotel");

		props.onChange(filter);
	}

	function changeValue(event) {
		if (event.target.attributes[1].textContent === "Room") setIsRoom(!isRoom);
		else if (event.target.attributes[1].textContent === "hotel") setIsHotel(!isHotel);
		else setIsHouse(!isHouse);
	}

	return (
			<div className={style.filter} >
				<div className={style.slider} >
					<p>Цена</p>
					<input type="number" name="priceMin" value={priceRange.priceMin} onChange={priceChange} />
					<input type="number" ref={priceRef} name="priceMax" value={priceRange.priceMax} onChange={priceChange} />
					<div className={style.sliderContainer} >
					      <Slider
					      	range
					        className="rc-slider-price"
					        step={1}
					        min={priceMin}
					        max={priceMax}
					        tipProps={{
					          placement: "top",
					          visible: true
					        }}
					        value={[priceRange.priceMin, priceRange.priceMax]}
					        onChange={(e) => setPriceRange({ priceMin: e[0], priceMax: e[1] })}
					   		railStyle={{ height: 7 }}
					      	trackStyle={{ backgroundColor: '#706999', height: 7 }}
					      	handleStyle={{
							          height: 17,
							          width: 17,
							          marginTop: -5,
							        }}/>
					</div>
				</div>
				<div className={style.slider} >
					<p>Площадь</p>
					<input type="number" name="areaMin" value={areaRange.areaMin} onChange={areaChange} />
					<input type="number" ref={areaRef} name="areaMax" value={areaRange.areaMax} onChange={areaChange} />
					<div className={style.sliderContainer}>
					      <Slider
					      	range
					        className="rc-slider-area"
					        step={1}
					        min={areaMin}
					        max={areaMax}
					        tipProps={{
					          placement: "top",
					          visible: true
					        }}
					        value={[areaRange.areaMin, areaRange.areaMax]}
					        onChange={(e) => setAreaRange({ areaMin: e[0],areaMax: e[1] })}
					      	railStyle={{ height: 7 }}
					      	trackStyle={{ backgroundColor: '#706999', height: 7 }}
					      	handleStyle={{
							          height: 17,
							          width: 17,
							          marginTop: -5,
							        }}/>
					</div>
				</div>
				<div className={style.checkbox} >
					<p>Тип жилья</p>
					<div>
						<input 
							type="checkbox"
							name="house"
							checked={isHouse}
							onChange={changeValue}/>
						<span>Дом</span>
					</div>
					<div>
						<input 
							type="checkbox"
							name="Room"
							checked={isRoom}
							onChange={changeValue}/>
						<span>Комната</span>
					</div>
					<div>
						<input 
							type="checkbox"
							name="hotel"
							checked={isHotel}
							onChange={changeValue}/>
						<span>Отель</span>
					</div>
					
				</div>
				<div className={style.buttonContainer}>	
					<button className={style.button} onClick={handlerFilter}>Принять</button>
				</div>	
			</div>
		)
}

export default Filter;