import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, ListGroup } from "react-bootstrap";

import { get_Prom, axios_Prom } from "../../a_global/Api";
import AddImage from "../../a_global/image/AddImage";

export default function ModalAddPd(props) {
  const [validated] = useState();
  const [nations, set_nations] = useState();
  const [categs, set_categs] = useState();
  const [imageURL, set_imageURL] = useState([]);
  const [imgPath, setImgPath] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandFilter, setBrandFilter] = useState();
  const [brandId, setBrandId] = useState();
  const [showBrand, setShowBrand] = useState(false);
  const [brandValue, setBrandValue] = useState();
  const [SecondLevelCategs, setSecondLevelCategs] = useState();
  const [disableAddButton, setDisableAddButton] = useState(false);

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Nations");
      set_nations(result.data?.objects);
      const result2 = await get_Prom("/Categs");
      set_categs(result2.data.objects);
    }
    func();
  }, []);

  useEffect(() => {
    setBrandId(null);
    async function func() {
      if (brandFilter) {
        // console.log("filter", brandFilter);
        const result3 = await get_Prom("/Brands?&search=" + brandFilter);
        // console.log("good", result3);
        if (result3.status === 200 && result3.data.objects.length > 0) {
          if (result3.data.object !== null) {
            setBrandId(result3.data.object._id);
          }
          // console.log("list", result3.data.objects);
          setBrands(result3.data.objects);
        } else {
          setBrands([{ _id: null, code: "无品牌" }]);
          // console.log("无品牌");
        }
      }
    }
    func();
  }, [brandFilter]);

  const handleCategs = async (e) => {
    const id = e.target.value;
    const categ_result = await get_Prom("/Categ/" + id);
    // console.log(categ_result)
    if (categ_result.status === 200) {
      const childrenCategs = categ_result.data?.object.Categ_sons;
      // console.log(childrenCategs)
      setSecondLevelCategs(childrenCategs);
    }
  };

  const handleImage = (e) => {
    const imgs = e.target.files && e.target.files;
    // console.log(imgs);

    if (imgs.length > 0) {
      setImgPath([]);
      set_imageURL([]);
    }

    for (let i = 0; i < imgs.length; i++) {
      console.log(imgs[i]);
      set_imageURL((image) => [...image, URL.createObjectURL(imgs[i])]);
      setImgPath((imgPath) => [...imgPath, imgs[i]]);
    }
  };

  const handleAddPd = async (e) => {
    console.log("c");
    e.preventDefault();
    const obj = {};
    obj.code = String(e.target.formGridCode.value);
    obj.nome = String(e.target.formGridName.value);
    obj.Nation = String(e.target.formGridNation.value);
    obj.Brand = String(brandId);
    obj.price_regular = parseFloat(e.target.formGridPrice.value);
    obj.sort = parseInt(e.target.formGridSort.value);
    obj.unit = String(e.target.formGridUnit.value);
    obj.desp = String(e.target.formGridDesp.value);
    obj.Categs = [e.target.formGridCateg.value];
    // console.log(obj);
    console.log(imgPath);
    const formData = new FormData();
    // console.log(imgPath);
    for (let i = 0; i < imgPath.length; i++) {
      formData.append("image_" + i, imgPath[i]);
      // console.log(i);
      // console.log(formData.get("image_" + i));
    }
    formData.append("obj", JSON.stringify(obj));

    // console.log(formData.get("obj"));

    try {
      console.log(1);
      const pd_result = await axios_Prom("POST", "/PdPost", formData);
      console.log(2);
      console.log(pd_result);
      if (pd_result.status === 200) {
        props.onHide();
        const pd = pd_result.data.object;
        alert("商品添加成功！");
        props.set_newPd(pd);
        console.log(pd);
      } else {
        alert(pd_result.message);
      }
      setDisableAddButton(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowBrand = (e) => {
    if (e.target.value.length > 2) {
      // console.log(e.target.value);
      setBrandFilter(e.target.value);
      setShowBrand(true);
    } else {
      setShowBrand(false);
      setBrandFilter(null);
    }
  };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>添加产品</Modal.Title>
      </Modal.Header>
      <Form
        autoComplete='off'
        onSubmit={handleAddPd}
        noValidate
        validated={validated}>
        <Modal.Body>
          {/* //////////////////////////////////// */}
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCode'>
                <Form.Label>商品条码</Form.Label>
                <Form.Control type='text' required readOnly />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridName'>
                <Form.Label>产品名称 *</Form.Label>
                <Form.Control type='text' required />
                <Form.Control.Feedback>输入正确</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          {/* //////////////////////////////////// */}
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridBrand'>
                <Form.Label>产品品牌</Form.Label>
                <Form.Control
                  type='input'
                  required
                  list='brandList'
                  value={brandValue}
                  onClick={(e) => {
                    handleShowBrand(e);
                  }}
                  onChange={(e) => {
                    setBrandValue(e.target.value);
                    handleShowBrand(e);
                  }}
                />
                {showBrand && (
                  <div
                    onMouseLeave={() => setShowBrand(false)}
                    style={{ zIndex: "1", position: "absolute", width: "97%" }}>
                    <ListGroup>
                      {brands?.length > 0 &&
                        brands?.map((brand) => {
                          // console.log("brand", brand);
                          return (
                            <ListGroup.Item
                              action
                              variant='primary'
                              value={brand._id}
                              onClick={(e) => {
                                e.preventDefault();
                                setBrandId(brand._id);
                                setShowBrand(false);
                                setBrandValue(brand.code);
                              }}>
                              {brand.code}
                            </ListGroup.Item>
                          );
                        })}
                    </ListGroup>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridNation'>
                <Form.Label>所属国家 *</Form.Label>
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
          </Form.Row>
          {/* //////////////////////////////////// */}
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCategFar'>
                <Form.Label>一级分类 *</Form.Label>
                <Form.Control as='select' required onChange={handleCategs}>
                  <option value=''>请选择分类</option>
                  {categs?.map((categ) => {
                    return (
                      <option value={categ._id} key={categ._id}>
                        {categ.code}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridCateg'>
                <Form.Label>二级分类 *</Form.Label>
                <Form.Control as='select' required>
                  <option value=''>请选择分类</option>
                  {SecondLevelCategs?.map((categ) => {
                    return (
                      <option value={categ._id} key={categ._id}>
                        {categ.code}
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
          {/* //////////////////////////////////// */}
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridPrice'>
                <Form.Label>默认价格</Form.Label>
                <Form.Control placeholder='00.00' type='text' required />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='formGridUnit'>
                <Form.Label>产品单位</Form.Label>
                <Form.Control placeholder='Pz/瓶/箱/个' type='text' required />
              </Form.Group>
            </Col>
          </Form.Row>
          {/* //////////////////////////////////// */}
          <Form.Row>
            <Col>
              <Form.Group controlId='formGridDesp'>
                <Form.Label>产品描述</Form.Label>
                <Form.Control as='textarea' type='string' size='lg' required />
              </Form.Group>
            </Col>
          </Form.Row>
          {/* //////////////////////////////////// */}

          <AddImage
            handleImage={handleImage}
            image={imageURL}
            sectionName='产品'
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={setDisableAddButton}
            variant='primary'
            type='submit'
            className='mt-4'
            onClick={(e) => {
              setDisableAddButton(true);
            }}>
            添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
