import styles from './Weather.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

import { FiWind } from 'react-icons/fi';
import { BsUmbrella, BsSearch } from 'react-icons/bs';
import { WiRaindrop } from 'react-icons/wi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Weather = () => {
    const [city, setCity] = useState('');
    const [width, setWidth] = useState(60);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const inputChangeHandler = (e) => {
        setCity(e.target.value);
        setWeather(null);
    }

    const searchHandler = async() => {
        setIsLoading(true);
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`);
        if(!response.ok) 
            throw new Error('fetching employee data failed!');
    
        const coords = await response.json();
        
        if(coords.length === 0) {
            setIsLoading(false);
            setWeather(null)
            setError(true);
            return;
        }
        const lat = coords[0].lat;
        const lon = coords[0].lon;
        try {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            setWeather(data);
        } catch (error) {
            setWeather(null)
            setError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (city.length === 0) setWidth(60);
        else if(city.length <= 5) setWidth(25 + city.length * 11);
        else setWidth(10 + city.length * 12);
    }, [city]);


    return (
        <>
            <div className='flex justify-center items-center pt-10 border-t-2'>
                <p className='text-xl font-extralight'>Right now in</p>
                <div>
                    <input 
                        type='text' 
                        style={{ width }} 
                        autoFocus
                        className='text-xl font-bold mx-2 px-2 border-b outline-0 bg-transparent'
                        value={city}
                        onChange={inputChangeHandler}
                        placeholder='City'
                        maxLength='25'
                    />
                </div>
                {
                    weather && 
                    <p data-testid='weather-desc' className='text-xl font-extralight mr-2'>
                        {`it's ${weather.list[0].weather[0].main.toLowerCase()}`}
                    </p>
                }
                
                <button 
                    data-testid='search-button' 
                    onClick={searchHandler} 
                    className={`${styles.button}`}
                    disabled={city.length <= 2}
                >
                    <span><BsSearch/></span>
                </button>
                
            </div>

            <div className={`flex flex-col justify-center items-center mt-10 pb-10 border-b-2 ${styles.container}`}>
                         
                <p className='font-medium text-xl mr-4' data-testid='main-parag'>
                    {city.length === 0 &&  'Write a city you want'}
                </p>
                
                
                <div data-testid='loading'>
                    {
                        (city.length > 2 && isLoading && !error) && 
                        <LoadingSpinner />
                    }
                </div>
                
                <p 
                    className='font-medium text-xl' 
                    data-testid='error'
                >
                    {(city.length > 2 && error) && 'The city you were looking for was not found!'}
                </p>
                {
                    (city.length > 2 && weather && !isLoading && !error) && 
                    <>
                        <p className='font-medium text-xl'>
                            {weather.city.name} / {weather.city.country}
                        </p>

                        <div className={`flex justify-evenly items-center ${styles['container-items']}`}>
                            <img 
                                className={styles['img-today']} 
                                src={`${process.env.PUBLIC_URL}/assets/${weather.list[0].weather[0].icon}.svg`} alt='weather-today'
                            />

                            <p className='text-7xl font-thin'>
                                {Math.floor(weather.list[0].main.temp)}&#xb0;
                            </p>

                            <div className='text-slate-400 text-2xl'>
                                <div className='flex justify-between items-center'>
                                    <FiWind />
                                    <p className='ml-5 '>
                                        {weather.list[0].wind.speed}
                                        <span className='text-xs'> kmh</span>
                                    </p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <BsUmbrella />
                                    <p data-testid='rain' className='ml-5'>
                                        {weather.list[0].rain ? weather.list[0].rain['3h']*100 : 0} 
                                        <span className='text-xs'> %</span>
                                    </p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <WiRaindrop />
                                    <p className='ml-5'>
                                        {weather.list[0].main.humidity}
                                        <span className='text-xs'>%</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`flex justify-evenly items-center ${styles['container-items']} mt-10`}>
                            {
                                weather.list.slice(1,weather.length).map(day => (
                                    day.dt_txt.includes('12:00:00') && 
                                    <div key={day.dt} className='flex flex-col justify-center items-center'>
                                        <img 
                                            className={styles['img-future']} 
                                            src={`${process.env.PUBLIC_URL}/assets/${day.weather[0].icon}.svg`} 
                                            alt='weather-future'
                                        />
                                        <div className='flex justify-center items-center'>
                                            <p className='text-2xl font-thin'>
                                                {Math.floor(day.main.temp)}&#xb0;
                                            </p>
                                        </div> 

                                        <p className='text-lg font-thin text-slate-300'>
                                            {moment(day.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('dddd').substring(0,3)}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }  
            </div>
        </>

    )
}

export default Weather;