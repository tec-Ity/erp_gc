import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { put_Prom, get_DNS, axios_Prom } from "../../a_global/Api";
import AddImage from "../../a_global/image/AddImage";

export default function ModalUpdateCateg(props) {
  const [validated] = useState();
  const [imageURL, set_imageURL] = useState([
    get_DNS() + props.upCateg?.img_url,
  ]);
  const [imgPath, setImgPath] = useState([]);
  const [showChangeImg, setShowChangeImg] = useState(false);

  const handleImage = (e) => {
    console.log(e.target.files);
    const imgs = e.target.files && e.target.files;
    // console.log(imgs);
    set_imageURL([URL.createObjectURL(imgs[0])]);
    setImgPath([imgs[0]]);
  };

  const handleDelete = async () => {};

  const handleUpdateCateg = async (e) => {
    try {
      e.preventDefault();
      const obj = {};
      obj.code = String(e.target.formGridCode.value);
      console.log(obj.code);
      props.upCateg.level === 2
        ? (obj.Categ_far = String(e.target.formGridFar.value))
        : (obj.Categ_far = null);
      const formData = new FormData();
      if (imgPath.length > 0 && showChangeImg === true) {
        console.log(imgPath[0]);
        formData.append("image", imgPath[0]);
        const categUpdateResult = await axios_Prom(
          "PUT",
          "/CategPut_ImgPost/" + props.upCateg._id,
          formData
        );
        console.log(categUpdateResult);
        if (categUpdateResult.status !== 200) {
          alert(categUpdateResult.message);
        }
      }

      const result = await put_Prom("/CategPut/" + props.upCateg._id, { obj });
      console.log(result);
      if (result.status === 200) {
        props.onHide();
        const bd = result.data?.object;
        props.set_newCateg(bd);
        alert("分类修改成功！");
      } else {
        alert(result.message);
      }
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
        <Modal.Title id='contained-modal-title-vcenter'>修改分类</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdateCateg} noValidate validated={validated}>
        <Modal.Body>
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCode'>
                <Form.Label>分类编号 *</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={props.upCateg.code}
                  onChange={(e) => {
                    props.set_upCateg({
                      ...props.upCateg,
                      code: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>

            {props.upCateg.level === 2 && (
              <Col xs={12} md={6}>
                <Form.Group controlId='formGridFar'>
                  <Form.Label>所属上级分类</Form.Label>
                  <Form.Control as='select' required>
                    <option value={props.upCateg.Categ_far}>
                      {props.categFars?.map((far) => {
                        return far._id === props.upCateg.Categ_far && far.code;
                      })}
                    </option>
                    {props.categFars?.map((far) => {
                      return (
                        far._id !== props.upCateg.Categ_far && (
                          <option value={far._id} key={far._id}>
                            {far.code}
                          </option>
                        )
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
          </Form.Row>
          {showChangeImg === false && (
            <Form.Row>
              <div>
                <span className='m-2'>分类图片</span>
                {imageURL.length > 0 ? (
                  <>
                    <div>
                      <img
                        src={imageURL[0]}
                        alt={props.upCateg.code}
                        width='100px'
                        height='100px'
                        style={{ objectFit: "scale-down" }}
                      />
                    </div>
                    <Button
                      variant='warning'
                      className='m-2'
                      onClick={() => {
                        setShowChangeImg(true);
                      }}>
                      更换图片
                    </Button>
                  </>
                ) : (
                  <div>暂无图片</div>
                )}
              </div>
            </Form.Row>
          )}

          {props.upCateg && showChangeImg && (
            <>
              <AddImage
                handleImage={handleImage}
                image={imageURL}
                sectionName='分类'
              />

              <Button
                variant='danger'
                onClick={() => {
                  setShowChangeImg(false);
                  set_imageURL([get_DNS() + props.upCateg?.img_url]);
                }}>
                取消更改
              </Button>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='success' type='submit' className='mt-4'>
            修改分类
          </Button>
          <Button variant='danger' className='mt-4' onClick={handleDelete}>
            删除分类
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
