import React, {useEffect, useState} from 'react'
import PageHeaderAlt from '../../../../../components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from '../../../../../components/shared-components/Flex'
import GeneralField from './GeneralField'
import { useNavigate } from "react-router-dom";
import {useCreateNewRoom, useUpdateRoom} from '../../../../../services/admin/RoomService';
import { useQueryClient } from 'react-query';

const ADD = 'ADD'
const EDIT = 'EDIT'

const RoomForm = props => {

	const { mode = ADD } = props

	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const createOrUpdateRoomMutation =  mode === ADD ? useCreateNewRoom() : useUpdateRoom();

	useEffect(() => {
		if(mode === EDIT) {
			const roomInfo = props.param

			form.setFieldsValue({
				id: roomInfo.id,
				number: roomInfo.number,
				image: roomInfo.image_rooms && roomInfo.image_rooms.length > 0  ? roomInfo.image_rooms[0].image : undefined,
				location: roomInfo.location,
				type: roomInfo.room_type_id,
				isBeachFront: roomInfo.is_beachfront,
				sqm: roomInfo.sqm,
				bathrooms: roomInfo.bathrooms,
				beds: roomInfo.beds,
				description: roomInfo.room_type.description,
				adultPrice: parseInt(roomInfo.adult_price),
				kidsPrice: parseInt(roomInfo.kids_price)
			})

		}
	}, [mode]);

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			if(mode === EDIT) {
				const roomInfo = props.param
				values = { ...values, id: roomInfo.id }
			}

			createOrUpdateRoomMutation.mutate(values, {
				onSuccess: () => {
					queryClient.invalidateQueries('rooms');
					message.success(`The room was ${mode === ADD ? 'created' : 'updated'} successfully`);
					navigate(`/admin-app/rooms`)
				}
			})


		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="space-between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Room' : `Edit Room`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={() => {	navigate(`/admin-app/rooms`) }}>Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs 
						defaultActiveKey="1" 
						style={{marginTop: 30}}
						items={[
							{
								label: 'General',
								key: '1',
								children: <GeneralField
									form={form}
								/>,
							}
						]}
					/>
				</div>
			</Form>
		</>
	)
}

export default RoomForm
