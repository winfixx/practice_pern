import React from 'react'
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { DEVICE_ROUTE } from '../utils/consts';
import star from '../img/star.png'

const DeviceItem = observer(({ unit: device }) => {
    const navigate = useNavigate()

    return (
        <Col
            md={3}
            className='mt-3'
            onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card
                style={{ width: 150, cursor: 'pointer' }}
                border={'light'}
            >
                <Image
                    width={150}
                    height={150}
                    src={process.env.REACT_APP_API_URL + device.img}
                />
                <div className='d-flex justify-content-between mt-1'>
                    <div><strong>{device.name}</strong></div>
                    <div className='text-black-55 d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                            <div>{device.rating}</div>
                            <Image width={15} src={star} />
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    );
})

export default DeviceItem;