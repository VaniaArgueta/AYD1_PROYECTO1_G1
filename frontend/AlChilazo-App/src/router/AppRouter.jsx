import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import {
	HomePage,
	DashboardPage,
	LoginPage,
	RegisterPage,
	PruebaPage,
	RegistroRepartidor,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='prueba' element={<PruebaPage />} />
					<Route path='regrepartidor' element={<RegistroRepartidor />} />
					<Route
						path='dashboard/:user'
						element={
							<DashboardPage />
						}
					/>
				</Route>
			</Routes>
		</>
	);
};