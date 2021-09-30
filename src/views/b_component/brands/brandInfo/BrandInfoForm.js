import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { get_Prom, put_Prom } from "../../../a_global/Api";

export default function BrandInfoForm(props) {
  const [validated] = useState(false);

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.sort = String(e.target.formGridSort.value);
    obj.Nation = String(e.target.formGridNation.value);
    const result = await put_Prom("/Brand" + props._id, { obj });
    if (result.status === 200) {
      props.setIsDisabled(true);
      alert("修改成功");
    } else {
      alert(result.message);
    }
  };

  const [Nations, set_Nations] = useState(null);

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Nations");
      const nations = result.data?.objects;
      set_Nations(nations);
    }
    func();
  }, [props.isDisabled]);

  return (
    <div className='container'>
      <Form onSubmit={handleUpdateBrand} noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId='formGridCode'>
            <Form.Label>品牌编号</Form.Label>
            <Form.Control
              value={props.brandInfo && props.brandInfo.code}
              type='text'
              required
              disabled={props.isDisabled}
              onChange={(e) => {
                props.set_brandInfo({
                  ...props.brandInfo,
                  code: e.target.value,
                });
              }}
            />

            <Form.Control.Feedback>输入正确</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridName'>
            <Form.Label>品牌名称</Form.Label>
            <Form.Control
              value={props.brandInfo && props.brandInfo.nome}
              type='text'
              required
              disabled={props.isDisabled}
              onChange={(e) => {
                props.set_brandInfo({
                  ...props.brandInfo,
                  nome: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        {props.brandInfo && (
          <Form.Row>
            <Form.Group as={Col} controlId='formGridNation'>
              <Form.Label>所属国家</Form.Label>
              <Form.Control as='select' required disabled={props.isDisabled}>
                <option value={props.brandInfo.Nation._id}>
                  {props.brandInfo.Nation.nome}
                </option>
                {!props.isDisabled &&
                  Nations?.map((nation) => {
                    return (
                      props.brandInfo.Nation._id !== nation._id && (
                        <option value={nation._id} key={nation._id}>
                          {nation.nome}
                        </option>
                      )
                    );
                  })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSort'>
              <Form.Label>优先级</Form.Label>
              <Form.Control
                value={props.brandInfo && props.brandInfo.sort}
                type='text'
                required
                disabled={props.isDisabled}
                onChange={(e) => {
                  props.set_brandInfo({
                    ...props.brandInfo,
                    sort: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form.Row>
        )}

        {props.isDisabled === false && (
          <div>
            <Button
              variant='danger'
              className='mt-4'
              onClick={async () => {
                props.setIsDisabled(true);
                const result = await get_Prom("/Brand/" + props._id);
                props.set_brandInfo(result.data?.object);
              }}>
              取消更改
            </Button>
            <Button variant='primary' type='submit' className='mt-4 ml-3'>
              更改信息
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
