import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { LoginPage } from './login-page';

jest.mock('react-router', () => {
    const originalModule = jest.requireActual('react-router');

    return {
        __esModule: true,
        ...originalModule,
        useParams: jest.fn(),
        useNavigate: jest.fn(),
    };
});

test('renders Login Page', () => {
    render(<LoginPage />);

    const title = screen.getByText('Pokemon App');
    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');

    expect(title).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test('Test Login button is disabled', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login-button');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
});

test('Test Login button is enabled', () => {
    render(<LoginPage />);

    const usernameInput:any = screen.getByTestId('username');
    const passwordInput:any = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'usernameTest' } })
    fireEvent.change(passwordInput, { target: { value: 'passwordTest' } })

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.value).toBe('usernameTest');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.value).toBe('passwordTest');

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).not.toBeDisabled();
});
