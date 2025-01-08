import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH, IS_USER_AUTHTENTICATED } from '../../../constants';
import { setLocalItem } from "../../../utils";

const testUserEmail = process.env?.REACT_APP_TEST_USER_EMAIL;
const testUserPassword = process.env?.REACT_APP_TEST_USER_PASSWORD;

type LoginForm = {
    email?: string;
    password?: string;
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const errorMessage: string = 'Invalid Crendentials';
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState<LoginForm>();
    const handleLogin = () => {
        if (!loginForm?.email || !loginForm?.password) return;

        if (loginForm.email === testUserEmail && loginForm.password === testUserPassword) {
            setLocalItem(IS_USER_AUTHTENTICATED, true);
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
                    <input name='email' type="text" className="text-black mt-1 px-2 py-1 border rounded-lg" onChange={handleInput} />
                </div>
                <div className="p-4 flex-row text-white">
                    <p>Password</p>
                    <input name='password' type="password" className="text-black mt-1 px-2 py-1 border rounded-lg" onChange={handleInput} />
                </div>
                <div className="p-4">
                    <button className="disabled:bg-gray-200 w-full border rounded-lg bg-green-200" onClick={handleLogin}>Login</button>
                </div>
                <div className="p-4">
                    {
                        showErrorMessage &&
                        <p className="text-red-500 bg-white  rounded-lg">{errorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
}