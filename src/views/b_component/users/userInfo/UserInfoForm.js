import React, { useState, useEffect } from "react";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { get_Prom, put_Prom } from "../../../a_global/Api";

export default function UserInfoForm(props) {
  const [validated] = useState(false);
  const [userRole] = useState({
    1: "拥有者",
    3: "管理者",
    5: "超级员工",
  });

  const [Shops, set_Shops] = useState(null);

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Shops");
      console.log(result);
      const shops = result.data?.objects;
      set_Shops(shops);
    }
    func();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.phonePre = "0039";
    obj.phone = String(e.target.formGridPhone.value);
    obj.role = String(e.target.formGridRole.value);
    const result = await put_Prom("/User/" + props._id, { obj });
    console.log(result);
    if (result.status === 200) {
      await props.setIsDisabled(true);
      alert("修改成功");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='container'>
      <Form onSubmit={handleUpdateUser} noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId='formGridCode'>
            <Form.Label>员工编号</Form.Label>
            <Form.Control
              value={props.userInfo?.code||''}
              type='text'
              required
              disabled={props.isDisabled}
              onChange={(e) => {
                props.set_userInfo({
                  ...props.userInfo,
                  code: e.target.value,
                });
              }}
            />

            <Form.Control.Feedback>输入正确</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridName'>
            <Form.Label>员工姓名</Form.Label>
            <Form.Control
              value={ props.userInfo?.nome||''}
              type='text'
              required
              disabled={props.isDisabled}
              onChange={(e) => {
                props.set_userInfo({
                  ...props.userInfo,
                  nome: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridPhone'>
            <Form.Label>手机号</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id='inputGroupPrepend'>+39</InputGroup.Text>
              <Form.Control
                value={ props.userInfo?.phone || ''}
                placeholder='输入10位手机号'
                type='text'
                required
                disabled={props.isDisabled}
                onChange={(e) => {
                  props.set_userInfo({
                    ...props.userInfo,
                    phone: e.target.value,
                  });
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridRole'>
            <Form.Label>职位</Form.Label>
            <Form.Control as='select' required disabled={props.isDisabled}>
              <option value={props.userInfo?.role||''}>
                {props.userInfo && userRole[props.userInfo.role]}
              </option>
              {props.userInfo &&
                Object.keys(userRole).map(
                  (key, index) =>
                    key !== props.userInfo.role && (
                      <option value={key||''} key={index}>
                        {userRole[key]}
                      </option>
                    )
                )}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        {props.userInfo && props.userInfo.Shop && (
          <Form.Row>
            <Form.Group as={Col} controlId='formGridShop'>
              <Form.Label>所属分店</Form.Label>
              <Form.Control as='select' required>
                <option value={props.userInfo?.Shop._id||''}>
                  {props.userInfo.Shop.code}
                </option>
                {Shops?.map((shop) => {
                  return (
                    props.userInfo.Shop._id !== shop._id && (
                      <option value={shop._id||''} key={shop._id}>
                        {shop.nome}
                      </option>
                    )
                  );
                })}
              </Form.Control>
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
                const result = await get_Prom("/User/" + props._id);
                console.log(result);
                props.set_userInfo(result.data?.object);
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
