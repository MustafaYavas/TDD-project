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
                    sunrise: 1659755469,
                    sunset: 1659805679
                },
                list: [
                    {
                        dt: 1659798000,
                        main: {
                            temp: 26.72,
                            feels_like: 28.61,
                            temp_min: 25.71,
                            temp_max: 26.72,
                            pressure: 1009,
                            sea_level: 1009,
                            grnd_level: 1007,
                            humidity: 73,
                            temp_kf: 1.01
                        },
                        weather: [
                            {
                                id: 803,
                                main: "Clouds",
                                description: "broken clouds",
                                icon: "04d"
                            }
                        ],
                        clouds: {
                            all: 60
                        },
                        wind: {
                            speed: 2.62,
                            deg: 62,
                            gust: 3.18
                        },
                        visibility: 10000,
                        pop: 0.06,
                        sys: {
                            pod: "d"
                        },
                        dt_txt: "2022-08-06 15:00:00"
                    }
                ]
        
            } 
        })
    }
}))

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
    fireEvent.change(inputElement, { target: { value: testValue}})

    expect(inputElement.value).not.toHaveLength(0);
})


// input boşken veya uzunluğu 3'den azken sadece p etiketi gösterilmeli
test('Paragraph should be rendered when input length two or less', () => {
    render(<Weather />);

    const inputElement = screen.getByPlaceholderText(/city/i);
    const paragraphElement = screen.getByTestId(/directive-parag/i);

    const testValue = 'ab';

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(paragraphElement).toBeInTheDocument();
})

// verileri fetch ederken loading spinner gösterilmeli
test('Loading spinner should be rendered while datas are fetching', async() => {
    render(<Weather />);
    const inputElement = screen.getByPlaceholderText(/city/i);

    const testValue = 'denizli';

    fireEvent.change(inputElement, { target: { value: testValue } });

    const loadingElement = await screen.findByTestId(/loading/i);

    expect(loadingElement).toBeInTheDocument();
})

// fetch ettikten sonra hata yoksa hava durumu açıklaması render edilmeli
// test('Weather datas should be rendered after fetching', async() => {
//     render(<Weather />);
//     const inputElement = screen.getByPlaceholderText(/city/i);

//     const testValue = 'denizli';
    
//     fireEvent.change(inputElement, { target: { value: testValue } });

//     const descriptionElement = await screen.findByText(/it's clouds/i);
    
//     expect(descriptionElement).toBeInTheDocument();
// })