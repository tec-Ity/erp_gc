import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Col,
  FormFile,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchGet_Prom, get_Prom, post_Prom } from "../../a_global/Api";

export default function ModalAddBrand(props) {
  const [validated, set_validated] = useState();
  const [nations, set_nations] = useState();

  useEffect(async () => {
    const result = await get_Prom("/Nations");
    set_nations(result.data.objects);
  }, []);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    const obj = new Object();
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.Nation = String(e.target.formGridNation.value);
    // obj.Brand = String(e.target.formGridBrand.value);
    // obj.price = parseFloat(e.target.formGridPrice.value);
    obj.sort = parseInt(e.target.formGridSort.value);
    // obj.unit = String(e.target.formGridUnit.value);
    // obj.desp = String(e.target.formGridDesp.value);
    const result = await post_Prom("/BrandPost", { obj });
    console.log(result);
    if (result.status === 200) {
      props.onHide();
      const bd = result.data.object;
      props.set_newBrand(bd);
      alert("品牌添加成功！");
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
        <Modal.Title id='contained-modal-title-vcenter'>添加品牌</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAddBrand} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCode'>
                <Form.Label>品牌编号 *</Form.Label>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridName'>
                <Form.Label>品牌名称 *</Form.Label>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridNation'>
                <Form.Label>所属国家</Form.Label>
                <Form.Control as='select' required>
                  <option value=''>请选择国家</option>
                  {nations?.map((nation) => {
                    return (
                      <option value={nation._id} key={nation._id}>
                        {nation.nome}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridSort'>
                <Form.Label>优先级</Form.Label>
                <Form.Control placeholder='1-999,999' type='text' required />
              </Form.Group>
            </Col>
          </Form.Row>

          {/* <Form.Group>
	            <Form.File
	              // className="position-relative"
	              required
	              name="file"
	              label="File"
	              // onChange={handleChange}
	              // isInvalid={!!errors.file}
	              // feedback={errors.file}
	              id="formShopLogo"
	              custom
	            />
	          </Form.Group>*/}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' type='submit' className='mt-4'>
            添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}