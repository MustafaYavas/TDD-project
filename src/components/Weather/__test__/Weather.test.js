import Weather from '../Weather';

import { screen, render, fireEvent, waitFor } from '@testing-library/react';

// asenkron işlem sonrası dönen değeri simüle ediyoruz
jest.mock('axios', () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: {
                city: {
                    id: 317109,
                    name: "Denizli",
                    coord: {
                        lat: 37.7733,
                        lon: 29.0869
                    },
                    country: "TR",
                    population: 313238,
                    timezone: 10800,
                    sunrise: 1660014826,
                    sunset: 1660064683
                },
                list: [
                    {
                        dt: 1660035600,
                        main: {
                            temp: 28,
                            feels_like: 28.69,
                            temp_min: 28.38,
                            temp_max: 31.62,
                            pressure: 1009,
                            sea_level: 1009,
                            grnd_level: 964,
                            humidity: 48,
                            temp_kf: -3.24
                        },
                        weather: [
                            {
                                id: 801,
                                main: "Clouds",
                                description: "few clouds",
                                icon: "02d"
                            }
                        ],
                        clouds: {
                            all: 19
                        },
                        wind: {
                            speed: 2.17,
                            deg: 352,
                            gust: 1.72
                        },
                        visibility: 10000,
                        pop: 0,
                        sys: {
                            pod: "d"
                        },
                        dt_txt: "2022-08-09 09:00:00"
                    }
                ]
            } 
        })
    }
}))


describe('input', () => {
    test('city input should be rendered', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        expect(inputElement).toBeInTheDocument();
    })
    
    test('city input should be empty initially', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        expect(inputElement.value).toHaveLength(0);
    })
    
    test('city input should change', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const testValue = 'istanbul'
        fireEvent.change(inputElement, { target: { value: testValue}});
        expect(inputElement.value).not.toHaveLength(0);
    })
})

describe('button', () => {
    test('button should not be rendered when input length is 2 or less', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const testValue = 'ab';
        fireEvent.change(inputElement, { target: { value: testValue}});

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    })
})

describe('weather datas', () => {
    // fetch ettikten sonra hata yoksa hava durumu açıklaması render edilmeli
    test('Weather datas should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const descriptionElement = await screen.findByTestId(/weather-desc/i);
        expect(descriptionElement).toBeInTheDocument();
        
    })
})

describe('other components', () => {
    test('Main paragraph should be rendered only input is not empty', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = '';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const paragraphElement = await screen.findByTestId(/main-parag/i);
        expect(paragraphElement).toBeInTheDocument();
    })

    test('Loading spinner should be rendered while fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const loadingElement = await screen.findByTestId(/loading/i);
        expect(loadingElement).toBeInTheDocument();
    })


    test('Loading spinner should NOT be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        await waitFor(async() => {
            const loadingElement = await screen.findByTestId(/loading/i);
            expect(loadingElement.value).toBe(undefined);
        })
    })
})