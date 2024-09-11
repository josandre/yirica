import React, { useState } from 'react';
import { Card, Table, Tooltip, message, Button, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import UserView from './UserView';
import AvatarStatus from '../../../../components/shared-components/AvatarStatus';
import { useGetAllUsers } from '../../../../services/admin/UserService';

const UserList = () => {
	const [userProfileVisible, setUserProfileVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const {data: usersResponse, error, loading} = useGetAllUsers()

	const users = usersResponse?.data ?? []

	const deactivateUser = (userId) => {
		// TODO: Deactivate user

		message.success({ content: `User ${userId} deactivated`, duration: 2 });
	};

	const showUserProfile = (userInfo) => {
		setUserProfileVisible(true);
		setSelectedUser(userInfo);
	};

	const closeUserProfile = () => {
		setUserProfileVisible(false);
		setSelectedUser(null);
	};

	const tableColumns = [
		{
			title: 'User',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={`https://ui-avatars.com/api/?name=${record.name}+${record.last_name}&background=random`} name={`${record.name} ${record.last_name}`} subTitle={record.email} />
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
					b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Role',
			dataIndex: 'role_id',
			render: (role) => (
				<span>Customer</span>
			)
		},
		{
			title: 'Member since',
			dataIndex: 'created_at',
			render: (date) => (
				<span>{dayjs(date).format("MM/DD/YYYY")}</span>
			),
			sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => showUserProfile(elm)} size="small" />
					</Tooltip>
				</div>
			),
		},
	];

	if (loading) {
		return <Spin tip="Loading..."></Spin>
	}

	return (
		<Card bodyStyle={{ padding: '0px' }}>
			<div className="table-responsive">
				<Table columns={tableColumns} dataSource={users} rowKey='id' />
			</div>
			<UserView data={selectedUser} visible={userProfileVisible} close={closeUserProfile} />
		</Card>
	);
};

export default UserList;
