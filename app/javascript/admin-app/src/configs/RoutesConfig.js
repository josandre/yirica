import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from './AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('../views/auth-views/authentication/login')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('../views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/users`,
        component: React.lazy(() => import('../views/app-views/pages/users')),
    },
    {
        key: 'comments',
        path: `${APP_PREFIX_PATH}/comments/*`,
        component: React.lazy(() => import('../views/app-views/pages/comments')),
    },
    {
        key: 'rooms.add',
        path: `${APP_PREFIX_PATH}/rooms/add`,
        component: React.lazy(() => import('../views/app-views/pages/room-management/add')),
    },
    {
        key: 'rooms.edit',
        path: `${APP_PREFIX_PATH}/rooms/edit/:id`,
        component: React.lazy(() => import('../views/app-views/pages/room-management/edit')),
    },
    {
        key: 'rooms',
        path: `${APP_PREFIX_PATH}/rooms`,
        component: React.lazy(() => import('../views/app-views/pages/room-management/list')),
    },
    {
        key: 'reservations',
        path: `${APP_PREFIX_PATH}/reservations`,
        component: React.lazy(() => import('../views/app-views/pages/reservations')),
    },
]
