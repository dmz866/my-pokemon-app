import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../ui';
import { ProtectedRoute } from './private-route';
import { HOME_PATH, LOGIN_PATH } from '../constants';

export const NavigationRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path={LOGIN_PATH} element={<LoginPage />} />
				<Route path={HOME_PATH} element={
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>}
				/>
			</Routes>
		</BrowserRouter>
	);
}
