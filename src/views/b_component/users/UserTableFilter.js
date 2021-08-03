import React from "react";
import { Form, Col } from "react-bootstrap";

export default function UserTableFilter(props) {
  const { urlQuery, handleChangeQuery, searchPlaceHolder } = props;
  return (
    <div className='container'>
      <Form>
        <Form.Row>
          <Col sm={2}>
            <Form.Group controlId='UserFilterInput'>
              <Form.Label>搜索</Form.Label>
              <Form.Control
                className='d-inline'
                placeholder={searchPlaceHolder}
                value={urlQuery?.search}
                onChange={(e) => handleChangeQuery(e, "search")}
              />
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Form.Label>是否可用</Form.Label>
            <Form.Check
              type='switch'
              id='userIsUsableSwitch'
              className='mt-2'
              checked={urlQuery?.is_usable}
              onChange={(e) => handleChangeQuery(e, "is_usable")}
            />
          </Col>
          <Col sm={2}>
            <Form.Label>创建者</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChangeQuery(e, "User_crt");
              }}
              placeholder='创建者ID'
            />
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
