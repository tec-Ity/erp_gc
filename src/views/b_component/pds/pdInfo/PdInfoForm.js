import React, { useState, useEffect } from "react";
import { Button, Form, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get_Prom, put_Prom } from "../../../a_global/Api";

export default function PdInfoForm(props) {
  const [validated] = useState();
  const [PdInfo, setPdInfo] = useState();
  const [nations, set_nations] = useState();
  const [categs, set_categs] = useState();
  const [categChild, setCategChild] = useState();
  const [categFar, setCategFar] = useState();
  const [brands, setBrands] = useState([]);
  const [brandFilter, setBrandFilter] = useState();
  const [brandId, setBrandId] = useState();
  const [showBrand, setShowBrand] = useState(false);
  const [brandValue, setBrandValue] = useState();
  const [SecondLevelCategs, setSecondLevelCategs] = useState();

  const { setLoadingModalShow } = props;

  useEffect(() => {
    if (PdInfo !== null) {
      setLoadingModalShow(false);
    } else {
      setLoadingModalShow(true);
    }
  }, [PdInfo, setLoadingModalShow]);





  useEffect(() => {
    async function func() {
      setPdInfo(props.productInfo);
      setBrandValue(props.productInfo?.Brand?.code);
      setCategChild(props.productInfo?.Categs && props.productInfo?.Categs[0]);
      setBrandId(props.productInfo?.Brand?._id);
      console.log("call Nations");
      const result = await get_Prom("/Nations");
      set_nations(result.data?.objects);

      const result2 = await get_Prom("/Categs");
      set_categs(result2.data.objects);

      if (props.productInfo?.Categs) {
        const result3 = await get_Prom(
          "/Categ/" + props.productInfo?.Categs[0]?._id
        );
        
        if (result3.status === 200) {
          setCategFar(result3.data?.object?.Categ_far);

          const result4 = await get_Prom(
            "/Categ/" + result3.data?.object?.Categ_far?._id
          );

          if (result4?.status === 200) {
            const childrenCategs = result4?.data?.object?.Categ_sons;
            setSecondLevelCategs(childrenCategs);
          }
        }
        
      }
    }
    func();
  }, [props.productInfo]);

  useEffect(() => {
    setBrandId(null);
    async function func() {
      if (brandFilter) {
        console.log("filter", brandFilter);
        const result3 = await get_Prom("/Brands?&search=" + brandFilter);
        console.log("good", result3);
        if (result3.status === 200 && result3.data.objects.length > 0) {
          if (result3.data.object !== null) {
            setBrandId(result3.data.object._id);
          }
          console.log("list", result3.data.objects);
          setBrands(result3.data.objects);
        } else {
          setBrands([{ _id: null, code: "无品牌" }]);
          console.log("无品牌");
        }
      }
    }
    func();
  }, [brandFilter]);

  const handleUpdatePdInfo = async (e) => {
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
    console.log(obj);
    console.log(111111);
    const result = await put_Prom("/PdPut/" + props._id, { obj });

    console.log(result);
    if (result.status === 200) {
      const pd = result.data?.object;
      props.set_newPd(pd);
      alert("商品信息修改成功！");
      props.setIsDisabled(true);
    } else {
      alert(result.message);
    }
  };

  const handleShowBrand = (e) => {
    if (e.target.value.length > 2) {
      console.log(e.target.value);
      setBrandFilter(e.target.value);
      setShowBrand(true);
    } else {
      setShowBrand(false);
      setBrandFilter(null);
    }
  };

  const handleCategs = async (e) => {
    const id = e.target.value;
    const result = await get_Prom("/Categ/" + id);
    console.log(result);
    setCategFar(result.data?.object);
    if (result.status === 200) {
      const childrenCategs = result.data?.object.Categ_sons;
      console.log(childrenCategs);
      setSecondLevelCategs(childrenCategs);
    }
  };

  const handleCategChild = async (e) => {
    const id = e.target.value;
    const result = await get_Prom("/Categ/" + id);
    setCategChild(result.data?.object);
  };

  return (
    <Form
      autoComplete='off'
      onSubmit={handleUpdatePdInfo}
      noValidate
      validated={validated}>
      {/* //////////////////////////////////// */}
      <Form.Row>
        <Col xs={12} md={6}>
          <Form.Group controlId='formGridCode'>
            <Form.Label>商品条码</Form.Label>
            <Form.Control
              type='text'
              required
              disabled={props.isDisabled}
              readOnly
              value={PdInfo && PdInfo.code}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId='formGridName'>
            <Form.Label>产品名称 *</Form.Label>
            <Form.Control
              type='text'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.nome}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, nome: e.target.value });
              }}
            />
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
              disabled={props.isDisabled}
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
                      console.log("brand", brand);
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
            <Form.Control as='select' required disabled={props.isDisabled}>
              <option value={PdInfo?.Nation._id}>{PdInfo?.Nation.nome}</option>
              {nations?.map((nation) => {
                if (nation._id !== PdInfo?.Nation._id) {
                  return (
                    <option value={nation._id} key={nation._id}>
                      {nation.nome}
                    </option>
                  );
                } else return null;
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
            <Form.Control
              as='select'
              required
              disabled={props.isDisabled}
              onChange={handleCategs}
              defaultValue={categFar?._id}>
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
            <Form.Control
              as='select'
              required
              disabled={props.isDisabled}
              onChange={handleCategChild}
              defaultValue={categChild?._id}>
              {/* {categChild && (
                <option value={categChild._id}>{categChild.code}</option>
              )} */}
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
            <Form.Control
              placeholder='1-999,999'
              type='text'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.sort}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, sort: e.target.value });
              }}
            />
          </Form.Group>
        </Col>
      </Form.Row>
      {/* //////////////////////////////////// */}
      <Form.Row>
        <Col xs={12} md={6}>
          <Form.Group controlId='formGridPrice'>
            <Form.Label>默认价格</Form.Label>
            <Form.Control
              placeholder='00.00'
              type='text'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.price_regular}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, price_regular: e.target.value });
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId='formGridUnit'>
            <Form.Label>产品单位</Form.Label>
            <Form.Control
              placeholder='Pz/瓶/箱/个'
              type='text'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.unit}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, unit: e.target.value });
              }}
            />
          </Form.Group>
        </Col>
      </Form.Row>
      {/* //////////////////////////////////// */}
      <Form.Row>
        <Col>
          <Form.Group controlId='formGridDesp'>
            <Form.Label>产品描述</Form.Label>
            <Form.Control
              as='textarea'
              type='string'
              size='lg'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.desp}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, desp: e.target.value });
              }}
            />
          </Form.Group>
        </Col>
      </Form.Row>
      {props.isDisabled === false && (
        <div>
          <Link to={props.homeLink + "/pds/" + props._id}>
            <Button
              variant='danger'
              className='mt-4'
              onClick={async () => {
                props.setIsDisabled(true);
              }}>
              取消更改
            </Button>
          </Link>
          <Button variant='primary' type='submit' className='mt-4 ml-3'>
            更改信息
          </Button>
        </div>
      )}
    </Form>
  );
}
