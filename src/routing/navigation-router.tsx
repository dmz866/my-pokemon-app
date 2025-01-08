import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../ui';
import { ProtectedRoute } from './private-route';

export const NavigationRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} >
					<Route index element={<LoginPage />} />
					<Route index element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
