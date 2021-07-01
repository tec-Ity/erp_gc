import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { delete_Prom, get_Prom, put_Prom } from "../../../a_global/Api";
import AttrModalAdd from "./AttrModalAdd";
import AttrModalUpdate from "./AttrModalUpdate";

export default function ProdAttr(props) {
  const [validated, set_validated] = useState();
  const [showAdd, set_showAdd] = useState(false);
  const [IsDisabled, setIsDisabled] = useState(true);
  const [Attrs, setAttrs] = useState();
  const [BtnIndex, setBtnIndex] = useState(-1);
  const [Refresh, setRefresh] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  
  useEffect(() => {
    setAttrs(props.ProdInfo?.Attrs);
  }, [props.ProdInfo, Refresh, props.newAttr]);

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    const result = await delete_Prom("/AttrDelete/" + _id);
    if (result.status === 200) {
      alert("删除成功");
      props.setNewAttr(result.data.object);
    } else {
      alert(result.message);
    }
  };

  const handleSubmit = async (nome, _id) => {
    console.log({ nome: nome });
    const obj = {};
    obj.nome = nome;
    const result = await put_Prom("/AttrPut/" + _id, { obj });
    console.log(result);
    if (result.status === 200) {
      alert("修改成功");
      props.setNewAttr(result.data.object);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='container pl-0'>
      <div className='d-flex justify-content-between my-4'>
        <h3>商品属性</h3>
        <Button variant='success' onClick={() => set_showAdd(true)}>
          增加属性
        </Button>
        {showAdd===true&&<AttrModalAdd
          _id={props._id}
          setNewAttr={props.setNewAttr}
          show={showAdd}
          onHide={() => set_showAdd(false)}
        />}
      </div>
      {props.ProdInfo?.Attrs?.length > 0 && (
        <Form noValidate validated={validated}>
          <Form.Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>属性名称</Form.Label>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label>属性值</Form.Label>
              </Form.Group>
            </Col>
            <Col md={3} className='text-center'>
              <Form.Group className=''>
                <Form.Label>&nbsp;</Form.Label>
              </Form.Group>
            </Col>
          </Form.Row>
          {Attrs?.map((attr, index) => {
            return (
              <Form.Row key={attr._id}>
                <Col md={3}>
                  <Form.Group>
                    <Form.Control
                      disabled={IsDisabled && BtnIndex !== index}
                      value={attr.nome}
                      onChange={(e) => {
                        let ats = [...Attrs];
                        let at = {
                          ...attr,
                          nome: e.target.value,
                        };
                        ats[index] = at;
                        setAttrs(ats);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Control disabled value={String(attr.options)} />
                  </Form.Group>
                </Col>
                <Col md={4} className='text-center'>
                  <Form.Group className=''>
                      {IsDisabled && BtnIndex !== index ? (
                        <div className='d-flex justify-content-around'>
                          <Button
                            variant='warning'
                            onClick={() => {
                              setBtnIndex(index);
                            }}>
                            修改名称
                          </Button>
                          <Button
                            // className='ml-2'
                            variant='warning'
                            onClick={() => {
                              setShowUpdate(true);
                            }}>
                            修改值
                          </Button>
                          <Button
                            variant='danger'
                            // className='ml-3'
                            onClick={(e) => {
                              handleDelete(e, attr._id);
                            }}>
                            删除
                          </Button>


                          {showUpdate === true && (
                            <AttrModalUpdate
                              show={showUpdate}
                              onHide={() => setShowUpdate(false)}
                              attr={attr}
                              _id={attr._id}
                              setNewAttr={props.setNewAttr}
                              newAttr={props.newAttr}
                            />
                          )}
                        </div>
                      ) : (
                        <div className='d-flex justify-content-center'>
                          <Button
                            variant='success'
                            onClick={() => {
                              setBtnIndex(-1);
                              handleSubmit(attr.nome, attr._id);
                            }}>
                            完成
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() => {
                              setBtnIndex(-1);
                              setRefresh((Refresh) => Refresh + 1);
                            }}
                            className='ml-4'>
                            取消
                          </Button>
                        </div>
                      )}
                  </Form.Group>
                </Col>
              </Form.Row>
            );
          })}
        </Form>
      )}
    </div>
  );
}
