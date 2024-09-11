import React from 'react'
import RoomForm from '../RoomForm';
import { useParams } from 'react-router-dom';

const EditRoom = () => {
	const params = useParams();

	return (
		<RoomForm mode="EDIT" param={params}/>
	)
}

export default EditRoom
