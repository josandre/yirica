import React, { useState } from 'react'
import { Badge, Input, Row, Col, Card, Empty, Form, InputNumber, message, Select } from 'antd';
import { useGetRoomTypes } from '../../../../../services/admin/RoomService';
import UploadComponent from '../../../../../components/util-components/UploadComponent';

const { Option } = Select;
const badgeStyle = {marginLeft: "8px"}	

const rules = {
	type: [
		{
			required: true,
			message: 'Please select a room type',
		}
	],
	number: [
		{
			required: true,
			message: 'Please add a room number',
		}
	],
	location: [
		{
			required: true,
			message: 'Please add a room location',
		}
	],
	adultPrice: [
		{
			required: true,
			message: 'Please enter room adult price',
		}
	],
	kidsPrice: [
		{
			required: true,
			message: 'Please enter room kid price',
		}
	],
	isBeachFront: [
		{
			required: true,
			message: 'Please select if the room is beach front',
		}
	],
	sqm: [
		{
			required: true,
			message: 'Please enter the room squared meters',
		}
	],
	bathrooms: [
		{
			required: true,
			message: 'Please enter the number of bathrooms',
		}
	],
	beds: [
		{
			required: true,
			message: 'Please enter the number of beds',
		}
	],
	image: [
		{
			required: true,
			message: 'Please add an image for this room'
		}
	]
}

const areKidsAllowed = kidsAllowed => {
	if(kidsAllowed) {
		return <><Badge status="success"/><span style={badgeStyle}>Kids Allowed</span></>
	}

	return <><Badge status="error"/> <span style={badgeStyle}>Kids NOT allowed</span></>
}

const detailDescription = (description) => {
	return 	<div style={{marginTop: "8px"}}>
			<Badge status="success"/>
			<span style={badgeStyle}>{description}</span>
		</div>
}

const GeneralField = props => {
	const [selectedRoomType, setSelectedRoomType] = useState()
	const {data: roomsTypesResponse, error, loading} = useGetRoomTypes()
	
	const roomTypes = roomsTypesResponse?.data ?? []

	const onRoomTypeSelected = (roomTypeId) => {
		const roomType = roomTypes.find(rt => rt.id === roomTypeId)

		props.form.setFieldValue("description", roomType.description);

		if(!roomType.kids_accepted) {
			props.form.setFieldValue("kidsPrice", 0);
		}

		setSelectedRoomType(roomType)
	}
	
	return <Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Info">
				<Form.Item name="type" label="Room type" rules={rules.type}>
						<Select 
							className="w-100" 
							placeholder="Select the room type"
							onChange={onRoomTypeSelected}>

							{
								roomTypes.map(rt => (
									<Option key={rt.id} value={rt.id}>{rt.name}</Option>
								))
							}
						</Select>
				</Form.Item>

				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="number" label="Room number" rules={rules.number}>
							<Input type="number" min={1} placeholder="Room Number" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="location" label="Room location" rules={rules.location}>
							<Input placeholder="Room Location" />
						</Form.Item>
					</Col>
				</Row>


				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="isBeachFront" label="Is Beach Front?" rules={rules.isBeachFront}>
							<Select 
								className="w-100" 
								placeholder="Is beach front?">

									<Option key={"yes"} value={true}>Yes</Option>
									<Option key={"no"} value={false}>No</Option>

							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="sqm" label="Squared Meters" rules={rules.sqm}>
							<Input type='number' min={25} placeholder="Squared Meters" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="bathrooms" label="Number of bathrooms" rules={rules.bathrooms}>
							<Input type='number' min={1} placeholder="Number of bathrooms" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="beds" label="Number of beds" rules={rules.beds}>
							<Input type='number' min={1} placeholder="Number of beds" />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item name="description" label="Description" >
					<Input.TextArea rows={4} disabled />
				</Form.Item>
				
			</Card>
			<Card title="Pricing">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="adultPrice" label="Adult price" rules={rules.adultPrice}>
						<InputNumber
							min={40}
							className="w-100"
							formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
						/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="kidsPrice" label="Kid price" rules={rules.kidsPrice}>
							<InputNumber
								min={30}
								className="w-100"
								value={0}
								disabled={!selectedRoomType?.kids_accepted ?? true}
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			<Card title="Media">
				<Form.Item name="image" rules={rules.image}>
					<UploadComponent form={props.form} />
				</Form.Item>
			</Card>
			<Card title="Details">
					{
						!selectedRoomType
						 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
						 : <>
								{areKidsAllowed(selectedRoomType.kids_accepted)}
								{detailDescription(`Up to ${selectedRoomType.max_people} people`)}
								{detailDescription("Minibar")}
								{detailDescription("Refundable")}
						 </>
												
					}

			</Card>
		</Col>
	</Row>
}

export default GeneralField
