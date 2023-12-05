import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = number => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).finally(() => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый девайс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown>
                            <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='mt-2'>
                            <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='mt-2'
                            placeholder='Введите название устройства'
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className='mt-2'
                            placeholder='Введите стоимость устройства'
                            type='number'
                        />
                        <Form.Control
                            onChange={selectFile}
                            className='mt-2'
                            placeholder='Вставьте картинку'
                            type='file'
                        />
                        <br />
                        <Button
                            variant='outline-dark'
                            onClick={addInfo}
                        >
                            Добавить новое свойство
                        </Button>
                        {info.map(i =>
                            <Row className='mt-2' key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={e => changeInfo('title', e.target.value, i.number)}
                                        placeholder='Введите название свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={e => changeInfo('description', e.target.value, i.number)}
                                        placeholder='Введите описание свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button onClick={() => removeInfo(i.number)} variant='outline-danger'>Удалить</Button>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='outline-danger'
                        onClick={onHide}
                    >
                        Закрыть
                    </Button>
                    <Button
                        variant='outline-success'
                        onClick={addDevice}
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
})

export default CreateDevice;