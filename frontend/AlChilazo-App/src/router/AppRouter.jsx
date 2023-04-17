import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import {
	HomePage,
	DashboardPage,
	LoginPage,
	RegisterPage,
	PruebaPage,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { RegistroEmpresa } from '../pages/RegistroEmpresa';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='registerEmpresa' element={<RegistroEmpresa />} />
					<Route path='prueba' element={<PruebaPage />} />
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