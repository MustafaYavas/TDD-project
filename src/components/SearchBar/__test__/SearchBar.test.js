import { screen, render, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

test('city input should be rendered', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/city/i);
    expect(inputElement).toBeInTheDocument();
})

test('city input should be empty initially', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/city/i);
    expect(inputElement.value).toHaveLength(0);
})

test('city input should change', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/city/i);
    const testValue = 'istanbul'
    fireEvent.change(inputElement, { target: { value: testValue}})

    expect(inputElement.value).not.toHaveLength(0);
})