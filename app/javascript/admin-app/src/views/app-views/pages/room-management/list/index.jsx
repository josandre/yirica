import React, {useMemo, useState, useEffect} from 'react'
import { Card, Table, Input, Button, Badge, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from '../../../../../components/shared-components/AvatarStatus';
import Flex from '../../../../../components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from '../../../../../utils'
import { useGetAllRooms } from '../../../../../services/admin/RoomService';


const booleanLabel = (flag, positiveText, negativeText) => {
	const badgeStyle = {marginLeft: "8px"}	

	if(flag) {
		return <><Badge status="success"/><span style={badgeStyle}>{positiveText}</span></>
	}

	return <><Badge status="error"/> <span style={badgeStyle}>{negativeText}</span></>
}


const RoomList = () => {
	const navigate = useNavigate();

	const {data: roomsResponse, error, loading} = useGetAllRooms()

	const [filteredRooms, setFilteredRooms] = useState([])

	const rooms  = useMemo(() => {
		if(!roomsResponse) {
			return  []
		}

		return roomsResponse.data.map(room => ({
			id: room.id,
			adultPrice: room.adult_price,
			kidsPrice: room.kids_price,
			image: room.image_rooms
			 ? (room.image_rooms.length === 1 ? room.image_rooms[0].image : room.image_rooms?.find(i => i.is_principal)?.image )
			 : undefined,
			isActive: room.is_active,
			name: `${room.room_type.name} #${room.number}`,
			number: room.number,
			roomType: room.room_type,
			kidsAccepted: room.room_type.kids_accepted
		}))

	}, [roomsResponse])

	useEffect(() => {
		if(rooms) {
			setFilteredRooms(rooms)
		}
	}, [rooms])
	
	
	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{'Deactivate'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addRoom = () => {
		navigate(`/admin-app/rooms/add`)
	}
	
	const viewDetails = row => {
		navigate(`/admin-app/rooms/edit/${row.id}`)
	}
	
	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Room',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.image} name={record.name}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Adult Price',
			dataIndex: 'adultPrice',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Kids Price',
			dataIndex: 'kidsPrice',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		
		{
			title: 'Kids?',
			dataIndex: 'kidsAccepted',
			render: kidsAccepted => (
				<Flex alignItems="center">{booleanLabel(kidsAccepted, "Kids allowed", "Adults only")}</Flex>
			)
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: isActive => (
				<Flex alignItems="center">{booleanLabel(isActive, "Active", "Inactive")}</Flex>
			)
		}
		// {
		// 	title: '',
		// 	dataIndex: 'actions',
		// 	render: (_, elm) => (
		// 		<div className="text-right">
		// 			<EllipsisDropdown menu={dropdownMenu(elm)}/>
		// 		</div>
		// 	)
		// }
	];

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = value ? filteredRooms : rooms
		const data = utils.wildCardSearch(searchArray, value)
		setFilteredRooms(data)
	}


	return (
		<Card>
			<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>

				</Flex>
				<div>
					<Button onClick={addRoom} type="primary" icon={<PlusCircleOutlined />} block>New Room</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={filteredRooms} 
					rowKey='id' 
				/>
			</div>
		</Card>
	)
}

export default RoomList
