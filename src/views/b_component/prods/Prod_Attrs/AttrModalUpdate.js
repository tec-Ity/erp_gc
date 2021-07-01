import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import { put_Prom } from "../../../a_global/Api";

export default function AttrModalUpdate(props) {
  const [validated, setValidated] = useState();
  const [NewAttrValue, setNewAttrValue] = useState([]);
  const [IsDisabled, setIsDisabled] = useState(true);
  const [BtnIndex, setBtnIndex] = useState(-1);
  const [Options, setOptions] = useState();

  useEffect(() => {
    async function func() {
      props.attr?.options && setOptions(props.attr.options);
    }
    func();
  }, [props.attr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.options = String(NewAttrValue);
    const result = await put_Prom("/AttrPut/" + props._id + "/optionPost", {
      obj,
    });
    console.log(result);
    if (result.status === 200) {
      alert("添加成功");
      props.setNewAttr(result.data.object);
    } else {
      alert(result.message);
    }
  };

  const handleUpdate = async (e, index, option) => {
    e.preventDefault();
    const putObj = {};
    putObj.option = props.attr?.options[index];
    putObj.optionPut = option;
    console.log(putObj);
    console.log(props._id);
    const result = await put_Prom("/AttrPut/" + props._id + "/optionPut", {
      putObj,
    });
    if (result.status === 200) {
      alert("修改成功");
      setBtnIndex(-1);
    } else {
      alert(result.message);
    }
  };
  
  const handleDelete = async (option) => {
    const delObj = {};
    delObj.options = option;
    const result = await put_Prom("/AttrPut/" + props._id + "/optionDelete", {
      delObj,
    });
    console.log(result);
    if (result.status === 200) {
      alert("删除成功");
      props.setNewAttr(result.data.object);
    } else {
      alert(result.message);
    }
  };

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>修改属性值</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
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
              <Form.Group>
                <Form.Control value={props.attr?.nome} disabled />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Control
                  placeholder='请输入新增属性值'
                  onChange={(e) => setNewAttrValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className='text-center'>
              <Form.Group className=''>
                <div className='d-flex justify-content-center'>
                  <Button variant='success' onClick={handleSubmit}>
                    新增属性值
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Form.Row>
          {Options?.length > 0 &&
            Options?.map((option, index) => {
              return (
                <Form.Row key={index}>
                  <Col md={{ span: 5, offset: 4 }}>
                    <Form.Group>
                      <Form.Control
                        value={option}
                        disabled={IsDisabled && index !== BtnIndex}
                        onChange={(e) => {
                          let ops = [...Options];
                          ops[index] = e.target.value;
                          setOptions(ops);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {IsDisabled && BtnIndex !== index ? (
                        <div className='d-flex justify-content-center'>
                          <Button
                            variant='warning'
                            onClick={() => setBtnIndex(index)}>
                            修改
                          </Button>
                          <Button
                            variant='danger'
                            className='ml-2'
                            onClick={() => {
                              handleDelete(option);
                            }}>
                            删除
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex justify-content-center'>
                          <Button
                            variant='success'
                            onClick={(e) => handleUpdate(e, index, option)}>
                            完成
                          </Button>
                          <Button
                            variant='danger'
                            className='ml-2'
                            onClick={() => {
                              setBtnIndex(-1);
                            }}>
                            取消
                          </Button>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Form.Row>
              );
            })}
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={props.onHide}
          >
            完成添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
