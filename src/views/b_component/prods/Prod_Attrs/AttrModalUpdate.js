import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import { put_Prom } from "../../../a_global/Api";

export default function AttrModalUpdate(props) {
  const [validated] = useState();
  const [NewAttrValue, setNewAttrValue] = useState([]);
  const [BtnIndex, setBtnIndex] = useState(-1);
  const [Options, setOptions] = useState();
  const [PrevOptions, setPrevOptions] = useState();

  useEffect(() => {
    async function func() {
      props.attr?.options && setOptions(props.attr?.options);
      props.attr?.options && setPrevOptions(props.attr?.options);
    }
    func();
  }, [props.attr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.option = String(NewAttrValue);
    const result = await put_Prom("/Attr/" + props._id , { optionPost: obj });
    console.log(result);
    if (result.status === 200) {
      alert("添加成功");
      props.setNewAttr(result.data?.object);
    } else {
      alert(result.message);
    }
  };

  const handleUpdate = async (e, index, option) => {
    e.preventDefault();
    const obj = {};
    obj.option = PrevOptions[index];
    obj.optionPut = option;
    const result = await put_Prom("/Attr/" + props._id , { optionPut: obj });
    if (result.status === 200) {
      alert("修改成功");
      const array = [...PrevOptions].map((op) => {
        if (op === PrevOptions[index]) {
          op = option;
        }
        return op;
      });
      setPrevOptions(array);

      const array2 = [...props.Attrs].map((at) => {
        if (at._id === props.attr._id) {
          return { ...props.attr, options: array };
        } else {
          return at;
        }
      });
      props.setAttrs(array2);
      setBtnIndex(-1);
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async (option) => {
    const optionDelete = {};
    optionDelete.options = option;
    const result = await put_Prom("/Attr/" + props._id , {optionDelete });
    console.log(result);
    if (result.status === 200) {
      alert("删除成功");
      const array = [...Options].filter((op) => {
        return op !== option;
      });
      setOptions(array);
      setPrevOptions(array);

      const array2 = [...props.Attrs].map((at) => {
        if (at._id === props.attr._id) {
          return { ...props.attr, options: array };
        } else {
          return at;
        }
      });
      props.setAttrs(array2);

      // props.setNewAttr(result.data?.object);
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
                        disabled={index !== BtnIndex}
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
                      {BtnIndex !== index ? (
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
                              setOptions(PrevOptions);
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
          <Button onClick={props.onHide}>完成添加</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
