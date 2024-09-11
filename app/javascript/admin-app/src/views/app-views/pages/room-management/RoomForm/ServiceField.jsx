import React from 'react'
import { Select, Row, Col, Card, Form, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const ServiceField = props => (
	<Card title="Services">
		<p>Add services for this room.</p>
		<Form.List name="services">
			{(fields, { add, remove }) => {
				return (
					<div className="mt-3">
						{fields.map((field, index) => (
							<Row key={field.key} gutter={16}> 
								<Col sm={24} md={17}>
									<Form.Item
										{...field}
										label="Service"
										name={[field.name, 'service']}
										fieldKey={[field.fieldKey, 'service']}
										rules={[{ required: true, message: 'Please select the service' }]}
										className="w-100"
									>
										<Select />
									</Form.Item>
								</Col>

								<Col sm={24} md={2}>
									<MinusCircleOutlined className="mt-md-4 pt-md-3" onClick={() => { remove(field.name)}} />
								</Col>
								<Col span={24}>
									<hr className="mt-2"/>
								</Col>
							</Row>
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => { add()}} className="w-100">
								<PlusOutlined /> Add field
							</Button>
						</Form.Item>
					</div>
				);
			}}
		</Form.List>
	</Card>
)

export default ServiceField
