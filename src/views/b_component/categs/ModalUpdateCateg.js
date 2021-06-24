import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Col,
  FormFile,
  InputGroup,
} from "react-bootstrap";
import { put_Prom } from "../../a_global/Api";

export default function ModalUpdateCateg(props) {
  const [validated, set_validated] = useState();
  const handleDelete = () => {};

  const handleUpdateCateg = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    console.log(obj.code);
    props.upCateg.level === 2
      ? (obj.Categ_far = String(e.target.formGridFar.value))
      : (obj.Categ_far = null);

    console.log(obj.categFars);
    // obj.img_url = String(e.target.formGridNation.value);
    const result = await put_Prom("/CategPut/" + props.upCateg._id, { obj });
    console.log(result);
    if (result.status === 200) {
      props.onHide();
      const bd = result.data.object;
      props.set_newCateg(bd);
      alert("分类修改成功！");
    } else {
      alert(result.message);
    }
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>修改分类</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdateCateg} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCode'>
                <Form.Label>分类编号 *</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={props.upCateg.code}
                  onChange={(e) => {
                    props.set_upCateg({
                      ...props.upCateg,
                      code: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>

            {props.upCateg.level === 2 && (
              <Col xs={12} md={6}>
                <Form.Group controlId='formGridFar'>
                  <Form.Label>所属上级分类</Form.Label>
                  <Form.Control as='select' required>
                    <option value={props.upCateg.Categ_far}>
                      {props.categFars?.map((far) => {
                        return far._id === props.upCateg.Categ_far && far.code;
                      })}
                    </option>
                    {props.categFars?.map((far) => {
                      return (
                        far._id !== props.upCateg.Categ_far && (
                          <option value={far._id} key={far._id}>
                            {far.code}
                          </option>
                        )
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
          </Form.Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='success' type='submit' className='mt-4'>
            修改分类
          </Button>
          <Button variant='danger' className='mt-4' onClick={handleDelete}>
            删除分类
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
