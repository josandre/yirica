import React, { useRef, useState, useEffect } from 'react'
import { Avatar, Divider, Input, Form, Button, Menu } from 'antd';
import { 
	FileOutlined, 
	SendOutlined, 
	WarningOutlined
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Flex from '../../../../components/shared-components/Flex';
import { useParams } from 'react-router-dom';
import { useSendResponse } from '../../../../services/admin/CommentService';


const Conversation = () => {
	const formRef = useRef();
	const chatBodyRef = useRef();

	const params = useParams();
	const { id } = params

	const [ info, setInfo ] = useState({});
	const [ msgList, setMsgList ] = useState([]);
	const responseMutation = useSendResponse()
	
	const getConversation = currentId => {
		const data = JSON.parse(localStorage.getItem("selectedComment"))

		console.log(data)

		setInfo(data)
		setMsgList(data.msg)
	}

	const getMsgType = obj => {
		switch (obj.msgType) {
			case 'text':
				return <span>{obj.text}</span>
			case 'image':
				return <img src={obj.text} alt={obj.text} />
			case 'file':
				return (
				<Flex alignItems="center" className="msg-file">
					<FileOutlined className="font-size-md"/>
					<span className="ml-2 font-weight-semibold text-link pointer">
						<u>{obj.text}</u>
					</span>
				</Flex>
				)
			default:
				return null;
		}
	}

	const scrollToBottom = () => {
		chatBodyRef.current.scrollToBottom()
	}

	const onSend = values => {
		if (values.newMsg) {
			responseMutation.mutate({
				commentId: id,
				message: values.newMsg
			}, {
				onSuccess: () => {
					const newMsgData = {
						avatar: "",
						from: "me",
						msgType: "text",
						text: values.newMsg,
						time: "",
					};
		
					formRef.current.setFieldsValue({
						newMsg: ''
					});
		
					setMsgList([...msgList, newMsgData]);
					setInfo({...info, hasResponse: true})
				}
			})
		}
	};
	
	useEffect(() => {
		const userId = parseInt(parseInt(id))
		getConversation(userId)
		scrollToBottom()
	}, [id])
	
	const comentContentHeader = title => (
		<div className="chat-content-header">
			<h4 className="mb-0">{title}</h4>
		</div>
	)

	const commentContentBody = (props, id) => (
		<div className="chat-content-body">
			<Scrollbars ref={chatBodyRef} autoHide>
				{
					props.map((elm, i) => (
						<div 
							key={`msg-${id}-${i}`} 
							className={`msg ${elm.msgType === 'warning'? 'datetime' : ''} ${elm.from === 'opposite'? 'msg-recipient' : elm.from === 'me'? 'msg-sent' : ''}`}
						>
							{
								elm.avatar? 
								<div className="mr-2">
									<Avatar src={elm.avatar} />
								</div>
								:
								null
							}
							{
								elm.text?
								<div className={`bubble ${!elm.avatar? 'ml-5' : ''}`}>
									<div className="bubble-wrapper">
										{getMsgType(elm)}
									</div>
								</div>
								:
								null
							}
							{
								elm.msgType === 'warning'?
								<Divider>
									 <span style={{ color: 'red' }}>
										<WarningOutlined style={{ marginRight: 8 }} /> {elm.warning}
									</span>
								</Divider>
								: 
								null
							}
						</div>
					))
				}
			</Scrollbars>
		</div>
	)

	const chatContentFooter = () => (
		<div className="chat-content-footer">
			<Form name="msgInput" ref={formRef} onFinish={onSend} className="w-100">
				<Form.Item name="newMsg" className="mb-0">
					<Input 
						autoComplete="off" 
						placeholder="Type a message..."
						suffix={
							<div className="d-flex align-items-center">
								<Button shape="circle" type="primary" size="small" onClick={onSend} htmlType="submit" disabled={info.hasResponse}>
									<SendOutlined />
								</Button>
							</div>
						}
					/>
				</Form.Item>
			</Form>
		</div>
	)

	return (
		<div className="chat-content">
				{comentContentHeader(info.title)}
				{commentContentBody(msgList, params.id)}
				{chatContentFooter()}
			</div>
	)
}

export default Conversation
