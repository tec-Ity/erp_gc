import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { get_Prom, axios_Prom } from "../../a_global/Api";
import AddImage from "../../a_global/image/AddImage";

export default function ModalAddCateg(props) {
  const [validated] = useState();
  const [levFar, set_levFar] = useState();
  const [showFar, set_showFar] = useState(false);
  const [imageURL, set_imageURL] = useState([]);
  const [imgPath, setImgPath] = useState([]);

  const handleImage = (e) => {
    console.log(e.target.files)
    const imgs = e.target.files && e.target.files;
    // console.log(imgs);
    set_imageURL([URL.createObjectURL(imgs[0])]);
    setImgPath([imgs[0]]);
  };


  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Categs?&level=1");
      set_levFar(result.data?.objects);
    }
    func();
  }, []);

  const handleAddCateg = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.level = String(e.target.formGridLevel.value);
    console.log(obj.code);
    showFar
      ? (obj.Categ_far = String(e.target.formGridFar.value))
      : (obj.Categ_far = null);
    const formData = new FormData();
    formData.append("image", imgPath[0]);
    formData.append("obj", JSON.stringify(obj));

    try {
      console.log(1);
      const categ_result = await axios_Prom("POST", "/CategPost", formData);
      console.log(2);
      console.log(categ_result);
      if (categ_result.status === 200) {
        props.onHide();
        const cat = categ_result.data.object;
        props.set_newCateg(cat);
        alert("分类添加成功！");
      } else {
        alert(categ_result.message);
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
        <Modal.Title id='contained-modal-title-vcenter'>添加分类</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAddCateg} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCode'>
                <Form.Label>分类编号 *</Form.Label>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridLevel'>
                <Form.Label>分类层级 *</Form.Label>
                <Form.Control
                  as='select'
                  required
                  onChange={(e) => {
                    if (e.target.value === "2") {
                      console.log(e.target.value);
                      set_showFar(true);
                    } else if (e.target.value === "1") {
                      set_showFar(false);
                    }
                  }}>
                  <option value='1'> 一级分类 </option>
                  <option value='2'> 二级分类 </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          {console.log(showFar)}
          {showFar && (
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId='formGridFar'>
                  <Form.Label>所属上级分类</Form.Label>
                  <Form.Control as='select' required>
                    <option value=''>请选择分类</option>
                    {levFar?.map((far) => {
                      console.log(levFar);
                      return (
                        <option value={far._id} key={far._id}>
                          {far.code}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          )}

          <AddImage
            handleImage={handleImage}
            image={imageURL}
            sectionName='分类'
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
