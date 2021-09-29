import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { get_Prom, axios_Prom } from "../../a_global/Api";
import AddImage from "../../a_global/image/AddImage";

export default function ModalAddShop(props) {
  const [nations, setNations] = useState();
  // const [nationList, setNationList] = useState();
  const [areas, setAreas] = useState();
  const [cities, setCities] = useState();
  const [validated] = useState(false);
  const [imageURL, set_imageURL] = useState([]);
  const [imgPath, setImgPath] = useState([]);

  const handleImage = (e) => {
    console.log(e.target.files);
    const imgs = e.target.files && e.target.files;
    // console.log(imgs);
    set_imageURL([URL.createObjectURL(imgs[0])]);
    setImgPath([imgs[0]]);
  };

  const getNations = async () => {
    const result = await get_Prom("/Nations");
    // console.log(result)
    setNations(result.data?.objects);
  };

  useEffect(() => {
    getNations();
  }, []);

  const handleNation = async (e) => {
    const NationId = e.target.value;
    const result = await get_Prom("/Areas?Nation=" + NationId);
    setAreas(result.data?.objects);
  };

  const handleArea = async (e) => {
    const AreaId = e.target.value;
    const result = await get_Prom("/Citas?Area=" + AreaId);
    setCities(result.data?.objects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.addr = String(e.target.formGridAddress.value);
    obj.Cita = String(e.target.formGridCity.value);

    const formData = new FormData();
    formData.append("image", imgPath[0]);
    formData.append("obj", JSON.stringify(obj));

    const shop_result = await axios_Prom("POST", "/Shop", formData);
    console.log(shop_result);

    // const result = await post_Prom("/Shop", { obj });
    // console.log(result);
    // if (result.status === 200) {
    //   props.onHide();
    //   const shop = result.data?.object;
    //   props.set_newShop(shop);
    // } else {
    //   alert(result.message);
    // }
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>添加门店</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridCode'>
              <Form.Label>门店编号</Form.Label>
              <Form.Control
                type='text'
                placeholder='请输入四位字母和数字组合'
                required
              />
              <Form.Control.Feedback>输入正确</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>门店名称</Form.Label>
              <Form.Control type='text' required />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Col xs={8}>
              <Form.Group controlId='formGridAddress'>
                <Form.Label>门店地址</Form.Label>
                <Form.Control placeholder='Viale xxxx' type='text' required />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId='formGridZip'>
                <Form.Label>邮编</Form.Label>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridNation'>
              <Form.Label>国家</Form.Label>

              <Form.Control as='select' onChange={handleNation} required>
                <option value=''>请选择国家</option>
                {nations?.map((nation, i) => {
                  return (
                    <option value={nation._id} key={i}>
                      {nation.nome} ({nation.code})
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId='formGridArea'>
              <Form.Label>区域</Form.Label>
              <Form.Control as='select' onChange={handleArea} required>
                <option value=''>请选择区域</option>
                {areas?.map((area, i) => {
                  return (
                    <option value={area._id} key={i}>
                      {area.nome} ({area.code})
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>城市</Form.Label>
              <Form.Control as='select' required>
                <option value=''>请选择城市</option>
                {cities?.map((city, i) => {
                  console.log(city);
                  return (
                    <option value={city._id} key={i}>
                      {city.nome} ({city.code})
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <AddImage
            handleImage={handleImage}
            image={imageURL}
            sectionName='门店Logo'
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
