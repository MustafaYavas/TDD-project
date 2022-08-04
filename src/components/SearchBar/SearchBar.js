import { useEffect, useState } from 'react';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const [width, setWidth] = useState(60);

    const inputChangeHandler = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        if (city.length === 0) setWidth(60);
        else if(city.length <= 5) setWidth(25 + city.length * 11);
        else setWidth(10 + city.length * 12);
    }, [city]);

    return (
        <div className='flex justify-center items-center'>
            <p className='text-xl font-extralight'>Right now in</p>
            <div>
                <input 
                    type='text' 
                    style={{ width }} 
                    autoFocus
                    className='text-xl font-bold mx-2 px-2 border-b outline-0'
                    value={city}
                    onChange={inputChangeHandler}
                    placeholder='City'
                />
            </div>
            <p className='text-xl font-extralight'>, it is clear</p>
        </div>
    )
}

export default SearchBar;