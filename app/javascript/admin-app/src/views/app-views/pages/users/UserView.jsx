import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import dayjs from 'dayjs';
import { 
	MobileOutlined, 
	MailOutlined, 
	UserOutlined, 
	CalendarOutlined,
} from '@ant-design/icons';

export class UserView extends Component {
	render() {
		const { data, visible, close} = this.props;
		return (
			<Drawer
				width={350}
				placement="right"
				onClose={close}
				closable={false}
				open={visible}
			>
				<div className="text-center mt-3">
					<Avatar size={80} src={`https://ui-avatars.com/api/?name=${data?.name}+${data?.last_name}&background=random`} />
					<h3 className="mt-2 mb-0">{data?.name} {data?.last_name}</h3>
					<span className="text-muted">Customer</span>
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Account details</h6>
					<p>
						<UserOutlined />
						<span className="ml-3 text-dark">id: {data?.id}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Member Since {dayjs(data?.created_at).format("MM/DD/YYYY")}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.phone}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email? data?.email: '-'}</span>
					</p>
				</div>
			</Drawer>
		)
	}
}

export default UserView
