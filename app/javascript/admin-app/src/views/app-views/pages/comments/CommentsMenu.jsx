import React, { useEffect, useMemo, useState } from 'react'
import {  Input } from 'antd';
import AvatarStatus from '../../../../components/shared-components/AvatarStatus';
import { StarFilled, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useGetAllComments } from '../../../../services/admin/CommentService';
import dayjs from 'dayjs';

const CommentsMenu = () => {

	const [filteredComments, setFilteredComments] = useState([]);
	const location = useLocation()
	let navigate = useNavigate();

	const {data: commentsResponse, error, loading} = useGetAllComments()
	
	const comments = useMemo(() => {
		if(!commentsResponse) {
			return []
		}

		return commentsResponse.data.map(c => {
			const avatar = `https://ui-avatars.com/api/?name=${c.user.name}+${c.user.last_name}&background=random`
			const hasResponse =  c.response && c.response.length > 0
			const response = hasResponse ? c.response[0].response : undefined

			const messages = [
				{
					avatar,
					text: c.comment,
					from: "opposite",
					msgType: "text"
				}
			]

			if(!c.is_legal) {
				messages.unshift({
					avatar: "",
					text: "",
					from: "",
					warning: "This message has a negative sentiment, be careful.",
					msgType: "warning"
				}); 
			}

			if(response) {
				messages.push({
					avatar,
					text: response,
					from: "me",
					msgType: "text"
				})
			}

			return {
				id: c.id,
				avatar,
				name: `${c.user.name} ${c.user.last_name}`,
				room: `${c.room.room_type.name} #${c.room.number}`,
				comment: c.comment,
				title: `Comment on room ${c.room.room_type.name} #${c.room.number}`,
				time: dayjs(c.created_at).format("MM/DD/YYYY"),
				punctuation: c.punctuation,
				isLegal: c.is_legal,
				msg: messages,
				hasResponse
			}
		})
	}, [commentsResponse])

	useEffect(() => {
		setFilteredComments(comments)
	}, [comments])

	const openChat = id => {
		const data = filteredComments.find(c => c.id === id)
		localStorage.setItem("selectedComment", JSON.stringify(data))
		
		navigate(`${id}`)
	}

	const searchOnChange = e => {
		const query = e.target.value;

		const data = comments.filter(item => {
			return query === ''? item : item.name.toLowerCase().includes(query)
		})

		setFilteredComments(data)
	}

	const id = parseInt(location.pathname.match(/\/([^/]+)\/?$/)[1])

	return (
		<div className="chat-menu">
			<div className="chat-menu-toolbar">
				<Input 
					placeholder="Search" 
					onChange={searchOnChange}
					prefix={
						<SearchOutlined className="font-size-lg mr-2"/>
					}
				/>
			</div>
			<div className="chat-menu-list">
				{
					filteredComments.map( (item, i) => (
						<div 
							key={`chat-item-${item.id}`} 
							onClick={() => openChat(item.id)} 
							className={`chat-menu-list-item ${i === (filteredComments.length - 1)? 'last' : ''} ${item.id === id? 'selected' : ''}`}
						>
							<AvatarStatus src={item.avatar} name={item.name} subTitle={item.comment}/>
							<div className="text-right">
								<div className="chat-menu-list-item-time">{item.time}</div>
								{item.punctuation === 0 ? <span></span> : <div>
								{[...Array(item.punctuation)].map((_, index) => (
									<StarFilled
										key={index}
										style={{
											color: "gold",
											fontSize: "12px", 
										}}
									/>
								))}
							</div>}
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default CommentsMenu
