import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AUTHENTICATED_ENTRY } from '../configs/AppConfig'
import {userIsLogged} from "../constants/AuthConstant";

const PublicRoute = () => {

	const { token } = userIsLogged()
	return token ? <Navigate to={AUTHENTICATED_ENTRY} /> : <Outlet/>
}

export default PublicRoute