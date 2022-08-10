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
                    },
                    {
                        dt: 1660132800,
                        main: {
                            temp: 30,
                            feels_like: 30.23,
                            temp_min: 30.14,
                            temp_max: 32.17,
                            pressure: 1007,
                            sea_level: 1007,
                            grnd_level: 962,
                            humidity: 43,
                            temp_kf: -2.03
                        },
                        weather: [
                            {
                                id: 500,
                                main: "Rain",
                                description: "light rain",
                                icon: "10d"
                            }
                        ],
                        clouds: {
                            all: 15
                        },
                        wind: {
                            speed: 0.68,
                            deg: 278,
                            gust: 2.36
                        },
                        visibility: 10000,
                        pop: 0.21,
                        rain: {
                            "3h": 0.45
                        },
                        sys: {
                            pod: "d"
                        },
                        dt_txt: "2022-08-10 12:00:00"
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
        const testValue = 'denizli'
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

    test('City and country name should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const cityElement = await screen.findByText('Denizli / TR');
        expect(cityElement).toBeInTheDocument();
    })

    test('Current weather image should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const imageElement = await screen.findByAltText(/weather-today/i);
        expect(imageElement).toHaveAttribute('src', '/assets/02d.svg')
    })

    test('Current weather should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const degreeElement = await screen.findByText(/28°/i);
        expect(degreeElement).toBeInTheDocument();
    })

    test('Should be 0 when there is no chance of rain', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const rainElement = await screen.findByTestId(/rain/i);
        expect(rainElement).toHaveTextContent('0 %');
    })


    test('Future weather image should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const imageElement = await screen.findByAltText(/weather-future/i);
        expect(imageElement).toHaveAttribute('src', '/assets/10d.svg')
    })

    test('Future weather should be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const degreeElement = await screen.findByText(/30°/i);
        expect(degreeElement).toBeInTheDocument();
    })
})

describe('other components', () => {
    test('Main paragraph should be rendered only input is empty', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = '';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const paragraphElement = screen.getByTestId(/main-parag/i);
        expect(paragraphElement).toHaveTextContent(/Write a city you want/i);
    })

    test('Loading spinner should be rendered while fetching', () => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        const loadingElement = screen.getByTestId(/loading/i);
        expect(loadingElement).toBeInTheDocument();
    })


    test('Loading spinner should NOT be rendered after fetching', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'denizli';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const loadingElement = screen.getByTestId(/loading/i);
            expect(loadingElement.value).toBe(undefined);
        })
    })

    test('Error text should be rendered when data is not fetched', async() => {
        render(<Weather />);
        const inputElement = screen.getByPlaceholderText(/city/i);
        const buttonElement = screen.getByRole('button');

        const testValue = 'xxxxxxxxx';
        fireEvent.change(inputElement, { target: { value: testValue } });
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const errorElement = screen.getByTestId(/error/i);
            expect(errorElement).toHaveTextContent(/The city you were looking for was not found!/i);
        })
    })
})