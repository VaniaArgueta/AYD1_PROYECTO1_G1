import React, { useRef } from 'react';

import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';

export const Navbar = () => {
	const spanUser = useRef();

	const { state } = useLocation();
	const navigate = useNavigate();

	console.log(state);

	const onLogout = () => {
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<>
			<header style={{ height: '60px' }}>
				<div className='banner'>
                    
					<h1 className='titulo'>AlChilazo</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                    </svg>
				</div>

				{state?.logged ? (
					<div className='user'>
						<span ref={spanUser} id="spanUsuario" className='username'>{state?.usuario}</span>
						<button className='btn-logout' onClick={onLogout}>
							Cerrar sesión
						</button>
					</div>
				) : (
					<nav>
						<Link to='/login'>Iniciar sesión</Link>
						<Link to='/register'>Registrarse</Link>
						<Link to='/registerEmpresa'>Registrar Empresa</Link>
						<Link to='/prueba'>Prueba Carga PDF</Link>
					</nav>
				)}
			</header>

			<Outlet />
		</>
	);
};