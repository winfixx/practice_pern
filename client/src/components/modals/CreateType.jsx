import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';

function CreateType({ show, onHide }) {
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => setValue(''))
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый тип</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={'Введите название типа'}
                        />
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
                        onClick={addType}
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default CreateType;