import React from 'react';
import { Dropdown, Avatar } from 'antd';
import { 
	LogoutOutlined 
} from '@ant-design/icons';
import NavItem from './NavItem';
import Flex from '../shared-components/Flex';
import styled from '@emotion/styled';
import { FONT_WEIGHT, MEDIA_QUERIES, SPACER, FONT_SIZES } from '../../constants/ThemeConstant'
import { useNavigate } from 'react-router-dom';

const Icon = styled.div(() => ({
	fontSize: FONT_SIZES.LG
}))

const Profile = styled.div(() => ({
	display: 'flex',
	alignItems: 'center'
}))

const UserInfo = styled('div')`
	padding-left: ${SPACER[2]};

	@media ${MEDIA_QUERIES.MOBILE} {
		display: none
	}
`

const Name = styled.div(() => ({
	fontWeight: FONT_WEIGHT.SEMIBOLD
}))

const Title = styled.span(() => ({
	opacity: 0.8
}))


const MenuItemSignOut = (props) => {
	const navigate = useNavigate()

	const handleSignOut = () => {
		localStorage.clear()
		navigate("/admin-app/auth/login")
		window.location.reload() 
	}

	return (
		<div onClick={handleSignOut}>
			<Flex alignItems="center" gap={SPACER[2]} >
				<Icon>
					<LogoutOutlined />
				</Icon>
				<span>{props.label}</span>
			</Flex>
		</div>
	)
}

const items = [
	{
		key: 'Sign Out',
		label: <MenuItemSignOut label="Sign Out" />,
	}
]

export const NavProfile = ({mode}) => {
	const name = localStorage.getItem("userName")

	return (
		<Dropdown placement="bottomRight" menu={{items}} trigger={["click"]}>
			<NavItem mode={mode}>
				<Profile>
					<Avatar src={`https://ui-avatars.com/api/?name=${name}&background=random`} />
					<UserInfo className="profile-text">
						<Name>{name}</Name>
						<Title>Administrator</Title>
					</UserInfo>
				</Profile>
			</NavItem>
		</Dropdown>
	);
}

export default NavProfile
