import React, { useState,  } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { delete_Prom, put_Prom, post_Prom } from "../../../a_global/Api";
import AttrModalAdd from "./AttrModalAdd";
import AttrModalUpdate from "./AttrModalUpdate";

export default function ProdAttr(props) {
  const [validated, ] = useState();
  const [showAdd, set_showAdd] = useState(false);
  const [Attrs, setAttrs] = useState(props.ProdInfo?.Attrs);
  const [PrevAttrs, setPrevAttrs] = useState(props.ProdInfo?.Attrs);
  const [BtnIndex, setBtnIndex] = useState(-1);
  const [updateIndex, setUpdateIndex] = useState(-1);

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    const result = await delete_Prom("/Attr/" + _id);
    if (result.status === 200) {
      alert("删除成功");
      const array = [...Attrs].filter((attr) => {
        return attr._id !== _id;
      });

      setAttrs(array);
      setPrevAttrs(array);
      props.setNewAttrs(array);
      // props.setNewAttr(result.data?.object);
    } else {
      alert(result.message);
    }
  };

  const handleUpdateName = async (nome, _id) => {
    const obj = {};
    obj.nome = nome;
    const result = await put_Prom("/Attr/" + _id, { general:obj });
    if (result.status === 200) {
      const array = [...Attrs].map((attr) => {
        if (attr._id === _id) {
          attr.nome = nome.toUpperCase();
        }
        return attr;
      });
      alert("修改成功");
      setAttrs(array);
      setPrevAttrs(array);
      props.setNewAttrs(array);
    } else {
      alert(result.message);
    }
  };


  const handleAdd = async (e) => {
    try{
      e.preventDefault();
      const obj={};
      obj.Prod=props._id;
      obj.nome=String(e.target.FormAttrName.value);
      obj.options=String(e.target.FormAttrValue.value);
      const result = await post_Prom('/Attr' , {obj});
      if(result.status===200){
          alert("属性添加成功");
          set_showAdd(false);
          setAttrs(Ats=>[...Ats, result.data.object])
          props.setNewAttrs(Ats=>[...Ats, result.data.object])
      }
      else{
          alert(result.message)
      }
  } catch(error){
  }
};

  return (
    <div className='container pl-0'>
      <div className='d-flex justify-content-between my-4'>
        <h3>商品属性</h3>
        <Button variant='success' onClick={() => set_showAdd(true)}>
          增加属性
        </Button>
        {showAdd === true && (
          <AttrModalAdd
            _id={props._id}
            handleAdd={handleAdd}
            show={showAdd}
            onHide={() => set_showAdd(false)}
          />
        )}
      </div>

      {Attrs?.length > 0 && (
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
              <Form.Row key={index}>
                <Col md={3}>
                  <Form.Group>
                    <Form.Control
                      disabled={BtnIndex !== index}
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
                    {BtnIndex !== index ? (
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
                            setUpdateIndex(index);
                          }}>
                          修改值
                        </Button>
                        <Button
                          variant='danger'
                          onClick={(e) => {
                            handleDelete(e, attr._id);
                          }}>
                          删除
                        </Button>
                      </div>
                    ) : (
                      <div className='d-flex justify-content-center'>
                        <Button
                          variant='success'
                          onClick={() => {
                            setBtnIndex(-1);
                            handleUpdateName(attr.nome, attr._id);
                          }}>
                          完成
                        </Button>
                        <Button
                          variant='danger'
                          onClick={() => {
                            setBtnIndex(-1);
                            // setRefresh((Refresh) => Refresh + 1);
                            setAttrs(PrevAttrs);
                          }}
                          className='ml-4'>
                          取消
                        </Button>
                      </div>
                    )}
                    {updateIndex === index && (
                      <AttrModalUpdate
                        show={updateIndex === index}
                        onHide={() => setUpdateIndex(-1)}
                        attr={attr}

                        _id={attr._id}
                        Attrs={Attrs}
                        setAttrs={setAttrs}
                        PrevAttrs={PrevAttrs}
                        setPrevAttrs={setPrevAttrs}
                        setNewAttr={props.setNewAttr}
                      />
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
