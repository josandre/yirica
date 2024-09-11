import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { 
	AUTH_PREFIX_PATH, 
	UNAUTHENTICATED_ENTRY, 
	REDIRECT_URL_KEY 
} from '../configs/AppConfig'
import { userIsLogged } from '../constants/AuthConstant';

const ProtectedRoute = () => {
	
	const { token } = userIsLogged()
	const location = useLocation()

	if (!token) {
		window.location.reload() 
		return <Navigate to={`${AUTH_PREFIX_PATH}${UNAUTHENTICATED_ENTRY}?${REDIRECT_URL_KEY}=${location.pathname}`} replace />;
	}

	return <Outlet />
}

export default ProtectedRoute