import React, { useState,  } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";


export default function AttrModalAdd(props) {
  const [validated, ] = useState();
  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>添加属性</Modal.Title>
      </Modal.Header>
      <Form onSubmit={props.handleAdd} noValidate validated={validated} autoComplete="off">
        <Modal.Body>
          <Form.Row>
            <Col md={4}>
              <Form.Label>属性名称</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Label>属性&nbsp;&nbsp;(属性间用逗号隔开)</Form.Label>
            </Col>
            <Col md={3} className='text-center'>
              <Form.Label>&nbsp;</Form.Label>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col md={4}>
              <Form.Group controlId="FormAttrName">
                <Form.Control />
              </Form.Group>
            </Col>
            <Col md={7}>
              <Form.Group controlId="FormAttrValue">
                <Form.Control />
              </Form.Group>
            </Col>
     </Form.Row>

        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            className='mt-4'
          >
            完成添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
