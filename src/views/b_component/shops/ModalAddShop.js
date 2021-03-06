import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { get_Prom } from "../../a_global/Api";
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
    const imgs = e.target.files && e.target.files;
    set_imageURL([URL.createObjectURL(imgs[0])]);
    setImgPath([imgs[0]]);
  };

  const getNations = async () => {
    const result = await get_Prom("/Nations");
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

    // const shop_result = await axios_Prom("POST", "/Shop", formData);

    // const result = await post_Prom("/Shop", { obj });
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
        <Modal.Title id='contained-modal-title-vcenter'>????????????</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridCode'>
              <Form.Label>????????????</Form.Label>
              <Form.Control
                type='text'
                placeholder='????????????????????????????????????'
                required
              />
              <Form.Control.Feedback>????????????</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>????????????</Form.Label>
              <Form.Control type='text' required />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Col xs={8}>
              <Form.Group controlId='formGridAddress'>
                <Form.Label>????????????</Form.Label>
                <Form.Control placeholder='Viale xxxx' type='text' required />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId='formGridZip'>
                <Form.Label>??????</Form.Label>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridNation'>
              <Form.Label>??????</Form.Label>

              <Form.Control as='select' onChange={handleNation} required>
                <option value=''>???????????????</option>
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
              <Form.Label>??????</Form.Label>
              <Form.Control as='select' onChange={handleArea} required>
                <option value=''>???????????????</option>
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
              <Form.Label>??????</Form.Label>
              <Form.Control as='select' required>
                <option value=''>???????????????</option>
                {cities?.map((city, i) => {
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
            sectionName='??????Logo'
            isSingle
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' type='submit' className='mt-4'>
            ??????
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
