import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '../../../services/AuthService';

export const LoginForm = () => {

	const navigate = useNavigate();
	const signInMutation = useSignIn()


	const onLogin = values => {
		signInMutation.mutate(values, {
			onSuccess: async (response) => {
				const token = response.headers.authorization

				console.log("ASB", response)
				if (token) {
						const jwtToken = token.startsWith('Bearer ')  ? token.split(' ')[1] : token;
						localStorage.setItem('token', jwtToken);

						const body = response.data.status.data
						localStorage.setItem('userName', body.user.name);
						localStorage.setItem('userEmail', body.user.email);

						navigate('/admin-app/users');
						window.location.reload()
					}

			},
			 onError: (err) => {
					message.error('Log in failed')
			 }
	 })
	};

	return (
		<>
			<Form 
				layout="vertical" 
				name="login-form" 
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
						{ 
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<span>Password</span>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	showForgetPassword: false
};


export default LoginForm
