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
      setCategChild(props.productInfo?.Categ && props.productInfo?.Categ);
      setBrandId(props.productInfo?.Brand?._id);
      const result = await get_Prom("/Nations");
      set_nations(result.data?.objects);

      if (props.productInfo?.Categ) {
        const result3 = await get_Prom(
          "/Categ/" + props.productInfo?.Categ?._id
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
      const result2 = await get_Prom("/Categs");
      set_categs(result2.data.objects);
    }
    func();
  }, [props.productInfo]);

  useEffect(() => {
    // setBrandId(null);
    async function func() {
      if (brandFilter) {
        const result3 = await get_Prom("/Brands?&search=" + brandFilter);
        if (result3.status === 200 && result3.data.objects.length > 0) {
          if (result3.data.object !== null) {
            setBrandId(result3.data.object._id);
          }
          setBrands(result3.data.objects);
        } else {
          setBrands([{ _id: null, code: "?????????" }]);
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
    obj.Categ = e.target.formGridCateg.value;
    const result = await put_Prom("/Pd/" + props._id, { obj });

    if (result.status === 200) {
      const pd = result.data?.object;
      props.set_newPd(pd);
      alert("???????????????????????????");
      props.setIsDisabled(true);
    } else {
      alert(result.message);
    }
  };

  const handleShowBrand = (e) => {
    if (e.target.value.length > 2) {
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
    setCategFar(result.data?.object);
    if (result.status === 200) {
      const childrenCategs = result.data?.object.Categ_sons;
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
            <Form.Label>????????????</Form.Label>
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
            <Form.Label>???????????? *</Form.Label>
            <Form.Control
              type='text'
              required
              disabled={props.isDisabled}
              value={PdInfo && PdInfo.nome}
              onChange={(e) => {
                setPdInfo({ ...PdInfo, nome: e.target.value });
              }}
            />
            <Form.Control.Feedback>????????????</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      {/* //////////////////////////////////// */}
      <Form.Row>
        <Col xs={12} md={6}>
          <Form.Group controlId='formGridBrand'>
            <Form.Label>????????????</Form.Label>
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
            <Form.Label>???????????? *</Form.Label>
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
            <Form.Label>???????????? *</Form.Label>
            <Form.Control
              as='select'
              required
              disabled={props.isDisabled}
              onChange={handleCategs}>
              {categFar && (
                <option value={categFar._id} key={categFar._id}>
                  {categFar.code}
                </option>
              )}
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
            <Form.Label>???????????? *</Form.Label>
            <Form.Control
              as='select'
              required
              disabled={props.isDisabled}
              onChange={handleCategChild}
              defaultValue={categChild?._id}>
              {categChild && (
                <option value={categChild._id}>{categChild.code}</option>
              )}
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
            <Form.Label>?????????</Form.Label>
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
            <Form.Label>????????????</Form.Label>
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
            <Form.Label>????????????</Form.Label>
            <Form.Control
              placeholder='Pz/???/???/???'
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
            <Form.Label>????????????</Form.Label>
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
              ????????????
            </Button>
          </Link>
          <Button variant='primary' type='submit' className='mt-4 ml-3'>
            ????????????
          </Button>
        </div>
      )}
    </Form>
  );
}
