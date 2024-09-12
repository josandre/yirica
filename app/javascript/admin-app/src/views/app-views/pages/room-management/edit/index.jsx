import React from 'react'
import RoomForm from '../RoomForm';
import {Navigate, useParams} from 'react-router-dom';

const EditRoom = () => {
	const params = useParams();
	const roomInfo = JSON.parse(localStorage.getItem('adminSelectedRoom'));

	if(roomInfo?.id !== parseInt(params.id, 10)) {
		return <Navigate to={`/admin-app/rooms`} />
	}

	return (
		<RoomForm mode="EDIT" param={roomInfo}/>
	)
}

export default EditRoom
