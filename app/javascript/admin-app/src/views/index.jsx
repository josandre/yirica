import React from 'react';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import Routes from 'routes'
import { resources } from 'lang';
import useBodyClass from 'utils/hooks/useBodyClass';

export const Views = () => {
	const { locale, direction } = useSelector(state => state.theme);
	 const currentAppLocale = resources[locale];
	useBodyClass(`dir-${direction}`);
	return (
		<ConfigProvider direction={direction} locale={currentAppLocale.antd}>
			<Routes />
		</ConfigProvider>
	)
}

export default Views;