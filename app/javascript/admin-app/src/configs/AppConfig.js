import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from '../constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Yirica Admin';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/admin-app';
export const AUTH_PREFIX_PATH = '/admin-app/auth';
export const REDIRECT_URL_KEY = 'redirect'
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/users`;
export const UNAUTHENTICATED_ENTRY = '/login'

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR,
	blankLayout: false
};
