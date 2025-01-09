import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH, IS_USER_AUTHTENTICATED } from '../../../constants';
import { getLocalItem, setLocalItem } from "../../../utils";

const testUsername = process.env?.REACT_APP_TEST_USERNAME;
const testUserPassword = process.env?.REACT_APP_TEST_USER_PASSWORD;

export const LoginPage = () => {
    const navigate = useNavigate();
    const isUserAuthenticated = getLocalItem(IS_USER_AUTHTENTICATED);
    const errorMessage: string = 'Invalid Crendentials';
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const handleLogin = () => {
        if (!username || !password) return;

        if (username === testUsername && password === testUserPassword) {
            setLocalItem(IS_USER_AUTHTENTICATED, true);
            navigate(HOME_PATH);
        }
        else {
            setShowErrorMessage(true);
        }
    };

    useEffect(() => {
        if (isUserAuthenticated === 'true') {
            navigate(HOME_PATH);
        }
    }, [navigate, isUserAuthenticated]);

    return (
        <div className="mx-auto justify-center flex mt-10">
            <div className="bg-forest p-28 rounded-3xl">
                <p className='text-3xl font-bold text-white'>Pokemon App</p>
                <div className="p-4 flex-row text-white">
                    <p>Username</p>
                    <input name='username' defaultValue={username} placeholder="Enter your Username" type="text" className="text-black mt-1 px-2 py-1 border rounded-lg" onChange={(e: any) => setUsername(e.target.value)} />
                </div>
                <div className="p-4 flex-row text-white">
                    <p>Password</p>
                    <input name='password' required defaultValue={password}
                        placeholder="Enter your Password" type="password" className="text-black mt-1 px-2 py-1 border rounded-lg" onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div className="p-4">
                    <button disabled={!username || !password} className="disabled:bg-gray-200 w-full border rounded-lg bg-green-200" onClick={handleLogin}>Login</button>
                </div>
                <div className="px-4">
                    {
                        showErrorMessage &&
                        <p className="text-red-500 font-bold rounded-lg">{errorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
}