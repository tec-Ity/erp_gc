import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { axios_Prom, get_Prom } from "../../a_global/Api";
import AddImage from "../../a_global/image/AddImage";

export default function ModalAddBrand(props) {
  const [validated] = useState();
  const [nations, set_nations] = useState();
  const [imageURL, set_imageURL] = useState([]);
  const [imgPath, setImgPath] = useState([]);

  const handleImage = (e) => {
    const imgs = e.target.files && e.target.files;
    set_imageURL([URL.createObjectURL(imgs[0])]);
    setImgPath([imgs[0]]);
  };

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Nations");
      set_nations(result.data?.objects);
    }
    func();
  }, []);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.Nation = String(e.target.formGridNation.value);
    obj.sort = parseInt(e.target.formGridSort.value);

    const formData = new FormData();
    formData.append("image" , imgPath[0]);
    formData.append("obj", JSON.stringify(obj));

    try {
      const brand_result = await axios_Prom("POST", "/Brand", formData);
      if (brand_result.status === 200) {
        props.onHide();
        const bd = brand_result.data.object;
        props.set_newBrand(bd);
        alert("品牌添加成功！");
      } else {
        alert(brand_result.message);
      }
      // setDisableAddButton(false);
    } catch (e) {
      console.log(e);
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

          <AddImage
            handleImage={handleImage}
            image={imageURL}
            sectionName='品牌'
            isSingle
          />
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
