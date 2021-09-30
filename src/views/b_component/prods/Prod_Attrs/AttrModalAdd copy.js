import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";

const Attr = (props) => {
  return (
    <Form.Row key={props.index}>
      <Col md={{ span: 5, offset: 4 }}>
        <Form.Group>
          <Form.Control />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className='d-flex justify-content-center'>
          <Button
            variant='danger'
            onClick={() => {
              props.handleDelete(props.index);
            }}>
            删除
          </Button>
        </Form.Group>
      </Col>
    </Form.Row>
  );
};
export default function AttrModalAdd(props) {
  const [validated, setValidated] = useState();
  const [NewAttr, setNewAttr] = useState([]);
  const [AttrIndex, setAttrIndex] = useState(0);
  const handleSubmit = async (e) => {};

  const handleDelete = (index) => {
    // const array = [...NewAttr];
    // array.splice(index, 1);
    // setNewAttr(array);
    // setAttrIndex(index - 1);
  };

  useEffect(()=>{
  },[NewAttr])


  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>添加属性</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Col md={4}>
              <Form.Label>属性名称</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Label>属性</Form.Label>
            </Col>
            <Col md={3} className='text-center'>
              <Form.Label>&nbsp;</Form.Label>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col md={4}>
              <Form.Group>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col md={3} className='text-center'>
              <Form.Group className=''>
                <div className='d-flex justify-content-center'>
                  <Button
                    variant='success'
                    onClick={() => {
                      setNewAttr([
                        ...NewAttr,
                        <Attr index={AttrIndex} handleDelete={handleDelete} />,
                      ]);
                      setAttrIndex(AttrIndex + 1);
                    }}>
                    新增
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Form.Row>

          {NewAttr}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            className='mt-4'
            // onClick={props.onHide}
          >
            完成添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
