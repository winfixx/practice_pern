import React, {useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

function CreateBrand({ show, onHide }) {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => setValue(''))
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
                    <Modal.Title>Добавить новый бренд</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={'Введите название бренда'}
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
                        onClick={addBrand}
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default CreateBrand;