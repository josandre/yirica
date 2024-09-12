/* eslint-disable no-unused-vars */
import React, {useEffect, useMemo, useState} from 'react'
import {Button, Dropdown, Card, Table, Select, Input, Menu, Tag, message} from 'antd';
import { DownOutlined, LikeOutlined, DislikeOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from '../../../../components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import utils from '../../../../utils'
import {
	useApproveOrRejectCancelRequest,
	useGetAllReservations,
	useGetReservationStates
} from '../../../../services/admin/ReservationService';
import {useQueryClient} from "react-query";

const { Option } = Select

const getReservationState = state => {
	if(state === 'Cancel requested') {
		return 'blue'
	}

	if(state === 'Active') {
		return 'green'
	}

	
	if(state === 'Canceled') {
		return 'red'
	}

	return ''
}

const ReservationsList = () => {
	const queryClient = useQueryClient();
	const [filteredReservations, setFilteredReservations] = useState([])

	const {data: reservationsResponse, error, loading} = useGetAllReservations()
	const {data: reservationStatesResponse} = useGetReservationStates()

	const cancelRequestRespMutation = useApproveOrRejectCancelRequest()
	const reservationStates = reservationStatesResponse?.data ?? []

	const reservations = useMemo(() => {
		if(!reservationsResponse) {
			return []
		}

		const responseData = reservationsResponse.data

		return responseData.map(rd => {

			var total = 0

			for (const resRoom of rd.reservation_room) {
				const adults = resRoom.adults_amount ?? 0
				const kids = resRoom.kids_amount ?? 0
				const adultsPrice = resRoom.room.adult_price
				const kidsPrice = resRoom.room.kids_price

				const adultsTotal = parseInt(adultsPrice) * adults
				const kidsTotal = parseInt(kidsPrice) * kids

				total += (adultsTotal + kidsTotal)
			}

			return {
				id: rd.id,
				searchCode: rd.search_code,
				checkIn: rd.checking_date,
				checkOut: rd.checkout_date,
				isRefunded: rd.is_refunded,
				rooms: rd.reservation_room,
				stateId: rd.reservation_state.id,
				state: rd.reservation_state.state,
				total: total,
				cancelId: rd.cancel_request?.id,
				cancelReason: rd.cancel_request?.reason
			}
	})
}, [reservationsResponse])

	useEffect(() => {
		if(reservations) {
			setFilteredReservations(reservations)
		}
	}, [reservations])

	const handleCancellationMenuClick = (action, reservationId, cancelRequestId) => {
		cancelRequestRespMutation.mutate({
			reservationId,
			response: action,
			cancelRequestId
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries('reservations');
				message.success(`The cancel request was ${action ? 'approved' : 'rejected'}`);
			}
		})
	};

	const dropdownMenu = row => (
		
		<Menu>
			<Menu.Item onClick={() => handleCancellationMenuClick(true, row.id, row.cancelId)}>
				<Flex alignItems="center">
					<LikeOutlined />
					<span className="ml-2">Approve</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => handleCancellationMenuClick(false, row.id, row.cancelId)}>
				<Flex alignItems="center">
					<DislikeOutlined />
					<span className="ml-2">Reject</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'Search Code',
			dataIndex: 'searchCode'
		},
		{
			title: 'Check In',
			dataIndex: 'checkIn'
		},
		{
			title: 'Check Out',
			dataIndex: 'checkOut'
		},
		{
			title: 'Is Refunded',
			dataIndex: 'isRefunded',
			render: (isRefunded) => (
				isRefunded ? <span>Yes</span> : <span>No</span>
			)
		},
		{
			title: 'Reservation State',
			dataIndex: 'state',
			render: (_, record) => (
				<><Tag color={getReservationState(record.state)}>{record.state}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'state')
		},
		{
			title: 'Total',
			dataIndex: 'total',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(record.total * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
		},
		{
			title: 'Cancellation Actions',
			dataIndex: 'actions',
			render: (_, record) => {
				if(record.state !== 'Cancel requested') {
					return
				}

				return <Dropdown overlay={dropdownMenu(record)} trigger={['click']}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginRight: '8px' }}>{ record.cancelReason }</span>
							<DownOutlined />
					</div>
				</Dropdown>
			}
		}
	];
	
	const filterByState = (value) => {
		if(value !== 'All') {
			const key = 'stateId'
			const filteredData = utils.filterArray(reservations, key, value)

			console.log(value, filteredData)
			setFilteredReservations(filteredData)
		} else {
			setFilteredReservations(reservations)
		}
	}

	const onSearch = e => {
		const value = e.currentTarget.value

		if(!value || value.trim() === "") {
			setFilteredReservations(reservations)
		}

		const filteredData = reservations.filter(r => r.searchCode?.includes(value))
		setFilteredReservations(filteredData)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={filterByState} 
							placeholder="Reeservation State"
						>
							<Option value="All">All</Option>
							{reservationStates.map(rs => <Option key={rs.id} value={rs.id}>{rs.state}</Option>)}
						</Select>
					</div>
				</Flex>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={filteredReservations} 
					rowKey='id' 
				/>
			</div>
		</Card>
	)
}

export default ReservationsList
