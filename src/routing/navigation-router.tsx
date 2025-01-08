import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './private-route';
import { LoginPage, MainPage } from '../ui';

export const NavigationRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} >
					<Route index element={<LoginPage />} />
					<Route index element={
						<ProtectedRoute>
							<MainPage />
						</ProtectedRoute>}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
