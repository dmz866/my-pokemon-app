import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from '../../../constants';

const testUserEmail = process.env?.TEST_USER_EMAIL;
const testUserPassword = process.env?.TEST_USER_TEST_USER_PASSWORD;

type LoginForm = {
    email?: string;
    password?: string;
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const errorMessage: string = 'Invalid Crendentials';
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState<LoginForm>({ email: undefined, password: undefined });
    const handleLogin = () => {
        if (!loginForm.email || !loginForm.password) return;

        if (loginForm.email === testUserEmail && loginForm.password === testUserPassword) {
            navigate(HOME_PATH);
        }
        else {
            setShowErrorMessage(true);
        }
    };
    const handleInput = (e: any) => {
        const fieldName = e.nativeEvent.target.name;
        const fieldValue = e.nativeEvent.target.value;
        setLoginForm((prev) => ({ [fieldName]: fieldValue, ...prev, } as LoginForm));
    }

    return (
        <div className="mx-auto justify-center flex mt-10">
            <div className="bg-forest p-28 rounded-3xl">
                <p className='text-3xl font-bold text-white'>Pokemon App</p>
                <div className="p-4 flex-row text-white">
                    <p>Email</p>
                    <input name='email' value={loginForm.email} type="text" className="mt-1 px-2 py-1 border rounded-lg" onChange={handleInput} />
                </div>
                <div className="p-4 flex-row text-white">
                    <p>Password</p>
                    <input name='password' value={loginForm.password} type="password" className="mt-1 px-2 py-1 border rounded-lg" onChange={handleInput} />
                </div>
                <div className="p-4">
                    <button disabled={!loginForm.password || !loginForm.email} className="w-full border rounded-lg bg-green-200" onClick={handleLogin}>Login</button>
                </div>
                <div className="p-4">
                    {
                        showErrorMessage &&
                        <p className="text-red-500">{errorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
}