import styles from './Weather.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

import { FiWind } from 'react-icons/fi';
import { BsUmbrella } from 'react-icons/bs';
import { WiRaindrop } from 'react-icons/wi';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [width, setWidth] = useState(60);
    const [weather, setWeather] = useState(null);
    const [icon, setIcon] = useState('01d');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const inputChangeHandler = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        if (city.length === 0) setWidth(60);
        else if(city.length <= 5) setWidth(25 + city.length * 11);
        else setWidth(10 + city.length * 12);

        setIsLoading(true);
        const fetchCoords = async () => {
            let coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=b0da88335433103e03d54f032a8ed031`);
            
            if(coords.data.length > 0) {
                setWeather(null);
                setError(false)
                let lat = coords.data[0].lat;
                let lon = coords.data[0].lon;
                let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b0da88335433103e03d54f032a8ed031&units=metric`);

                console.log(data);
                setWeather(data)
            } else {
                setWeather(null)
                setError(true);
            }

            // console.log(Date.parse('2022-08-06 12:00:00') / 1000);
            setIsLoading(false);
        }
        
        if(city.length > 2) {
            const timer = setTimeout(() => {
                fetchCoords()
            }, 1000)

            return () => {
                clearTimeout(timer)
            }
        }

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
                <p data-testid='weather-desc' className='text-xl font-extralight'>
                    {weather ? `it's ${weather.list[0].weather[0].main.toLowerCase()}`: ''}
                </p>
            </div>

            <div className={`flex flex-col justify-center items-center mt-10 pb-10 border-b-2 ${styles.container}`}>
                {city.length <= 2 && <p data-testid='directive-parag'>Write a city you want</p>}
                {
                    (city.length > 2 && isLoading && !error) && 
                    <div data-testid='loading'><LoadingSpinner /></div>
                }
                {
                    (city.length > 2 && !isLoading && error) && 
                    <p data-testid='error'>The city you were looking for was not found</p>
                }
                {
                    (city.length > 2 && weather && !isLoading && !error) && 
                    <>
                        <div className={`flex justify-evenly items-center ${styles['container-items']}`}>
                            <img className={styles['img-today']} src={`${process.env.PUBLIC_URL}/assets/${weather.list[0].weather[0].icon}.svg`} alt='weather-today'/>
                            <p className='text-7xl font-thin'>{Math.floor(weather.list[0].main.temp)}</p>
                            <div className='text-slate-400 text-2xl'>
                                <div className='flex justify-between items-center'>
                                    <FiWind />
                                    <p className='ml-5 '>{weather.list[0].wind.speed} <span className='text-xs'>kmh</span></p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <BsUmbrella />
                                    <p className='ml-5'>{weather.list[0].rain ? weather.list[0].rain['3h']*100 : 0} <span className='text-xs'>%</span></p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <WiRaindrop />
                                    <p className='ml-5'>{weather.list[0].main.humidity} <span className='text-xs'>%</span></p>
                                </div>
                            </div>
                        </div>

                        <div className={`flex justify-evenly items-center ${styles['container-items']} mt-10`}>
                            <div className='flex flex-col justify-center items-center'>
                                <img 
                                    className={styles['img-future']} 
                                    src={`${process.env.PUBLIC_URL}/assets/${icon}.svg`} 
                                    alt='weather-future'
                                />
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl font-thin'>35&#xb0;/</p>
                                    <p className='text-2xl font-thin'>35&#xb0;</p>
                                </div>
                                <p className='text-lg font-thin'>TOM</p>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <img 
                                    className={styles['img-future']} 
                                    src={`${process.env.PUBLIC_URL}/assets/${icon}.svg`} 
                                    alt='weather-future'
                                />
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl font-thin'>35&#xb0;/</p>
                                    <p className='text-2xl font-thin'>35&#xb0;</p>
                                </div>
                                <p className='text-lg font-thin'>TOM</p>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <img 
                                    className={styles['img-future']} 
                                    src={`${process.env.PUBLIC_URL}/assets/${icon}.svg`} 
                                    alt='weather-future'
                                />
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl font-thin'>35&#xb0;/</p>
                                    <p className='text-2xl font-thin'>35&#xb0;</p>
                                </div>
                                <p className='text-lg font-thin'>TOM</p>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <img 
                                    className={styles['img-future']} 
                                    src={`${process.env.PUBLIC_URL}/assets/${icon}.svg`} 
                                    alt='weather-future'
                                />
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl font-thin'>35&#xb0;/</p>
                                    <p className='text-2xl font-thin'>35&#xb0;</p>
                                </div>
                                <p className='text-lg font-thin'>TOM</p>
                            </div>
                        </div>
                    </>
                }  
            </div>
        </>

    )
}

export default Weather;