import React, { useState, useEffect } from "react";
import { Button, Form, Col, Card } from "react-bootstrap";
import { get_DNS, get_Prom, put_Prom } from "../../../a_global/Api";
import ProdAttr from "../Prod_Attrs/ProdAttr";
import ProdProduct from "../prod_product/ProdProduct";

export default function ProdInfoForm(props) {
  const [validated] = useState();
  const [ProdInfo, setProdInfo] = useState();
  const [categs, set_categs] = useState();
  const [image, set_image] = useState([]);
  const [categChild, setCategChild] = useState();
  const [categFar, setCategFar] = useState();
  const [brand, setBrand] = useState([]);
  const [SecondLevelCategs, setSecondLevelCategs] = useState();
  const [newAttr, setNewAttr] = useState();
  const [newAttrs, setNewAttrs] = useState([]);
  const [newSKU, setNewSKU] = useState();
  const { setLoadingModalShow, _id, newProd } = props;

  useEffect(() => {
    async function func() {
      setLoadingModalShow(true);
      const result = await get_Prom("/Prod/" + _id);
      setProdInfo(result.data?.object);
      setNewAttrs(result.data?.object.Attrs)

      const result1 = await get_Prom("/Categs");
      set_categs(result1.data?.objects);

      const result2 = await get_Prom("/Brand/" + result.data?.object?.Brand);
      setBrand(result2.data?.object);

      const result3 = await get_Prom(
        "/Categ/" + result.data?.object?.Categ?._id
      );
      setCategChild(result3.data?.object);

      const result4 =
        result3.data?.object?.Categ_far &&
        (await get_Prom("/Categ/" + result3.data?.object?.Categ_far?._id));
      setCategFar(result4?.data?.object);
      setSecondLevelCategs(result4?.data?.object?.Categ_sons);

      const result5 = await get_Prom("/Pd/" + result.data?.object?.Pd);
      const productImage = result5.data?.object?.img_urls;
      const imgs = productImage?.map((img) => get_DNS() + img);
      set_image(imgs);
      if (productImage?.length === 0 || imgs?.length > 0) {
        setLoadingModalShow(false);
      }
    }
    func();
  }, [newProd, newAttr, newSKU, setLoadingModalShow, _id]);

  const handleUpdateProdInfo = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.price_regular = parseFloat(e.target.formGridPrice.value);
    obj.sort = parseInt(e.target.formGridSort.value);
    obj.unit = String(e.target.formGridUnit.value);
    obj.desp = String(e.target.formGridDesp.value);
    obj.Categs = [e.target.formGridCateg.value];

    const result = await put_Prom("/Prod/" + props._id, { obj });
    console.log(obj);
    console.log(result);

    if (result.status === 200) {
      const pd = result.data?.object;
      props.set_newProd(pd);
      alert("商品信息修改成功！");
      props.setIsDisabled(true);
    } else {
      alert(result.message);
    }
  };

  const handleCategs = async (e) => {
    const id = e.target.value;
    const result = await get_Prom("/Categ/" + id);
    setCategFar(result.data?.object);
    console.log(result);
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
    <div>
      <h3 className='mb-4'>产品图片</h3>
      <div className='d-flex justify-content-start align-items-center flex-wrap'>
        {image?.length > 0 ? (
          image?.map((img, index) => {
            return (
              <Card style={{ width: "100px" }} className='m-2' key={index}>
                <Card.Img
                  variant='top'
                  src={img}
                  alt='产品图片'
                />
              </Card>
            );
          })
        ) : (
          <h4>暂无图片</h4>
        )}
      </div>
      <hr />
      <h3 className='mb-4'>基本信息</h3>
      <Form>
        {/* //////////////////////////////////// */}
        <Form.Row>
          <Col xs={12} md={6}>
            <Form.Group controlId='formGridCode'>
              <Form.Label>商品条码</Form.Label>
              <Form.Control
                type='text'
                required
                disabled
                value={ProdInfo?.code || ""}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId='formGridName'>
              <Form.Label>产品名称</Form.Label>
              <Form.Control
                type='text'
                required
                disabled
                value={ProdInfo?.nome || ""}
              />
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
                disabled
                value={brand?.code || ""}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId='formGridNation'>
              <Form.Label>所属国家</Form.Label>
              <Form.Control value={ProdInfo?.Nation?.nome || ""} disabled />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <hr />
      {/* //////////////////////////////////// */}
      <h3 className='mb-4'>自定义信息</h3>
      <Form
        autoComplete='off'
        onSubmit={handleUpdateProdInfo}
        noValidate
        validated={validated}>
        <Form.Row>
          <Col xs={12} md={6}>
            <Form.Group controlId='formGridCategFar'>
              <Form.Label>一级分类 *</Form.Label>
              <Form.Control
                as='select'
                required
                disabled={props.isDisabled}
                onChange={handleCategs}>
                <option value={categFar?._id} key={categFar?._id}>
                  {categFar?.code}
                </option>
                {categs?.map((categ) => {
                  return (
                    categ._id !== categFar?._id && (
                      <option value={categ._id} key={categ._id}>
                        {categ.code}
                      </option>
                    )
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
                onChange={handleCategChild}>
                {categChild && (
                  <option value={categChild._id} key={categChild._id}>
                    {categChild.code}
                  </option>
                )}
                {SecondLevelCategs?.map((categ) => {
                  return (
                    categ._id !== categChild?._id && (
                      <option value={categ._id} key={categ._id}>
                        {categ.code}
                      </option>
                    )
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
                value={ProdInfo?.sort || ""}
                onChange={(e) => {
                  setProdInfo({ ...ProdInfo, sort: e.target.value });
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
                value={ProdInfo?.price_regular || ""}
                onChange={(e) => {
                  setProdInfo({ ...ProdInfo, price_regular: e.target.value });
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
                value={ProdInfo?.unit || ""}
                onChange={(e) => {
                  setProdInfo({ ...ProdInfo, unit: e.target.value });
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
                value={ProdInfo?.desp || ""}
                onChange={(e) => {
                  setProdInfo({ ...ProdInfo, desp: e.target.value });
                }}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        {props.isDisabled === false && (
          <div>
            <Button
              variant='danger'
              className='mt-4'
              onClick={async () => {
                props.setIsDisabled(true);
              }}>
              取消更改
            </Button>

            <Button variant='primary' type='submit' className='mt-4 ml-3'>
              更改信息
            </Button>
          </div>
        )}
      </Form>
      <hr />
      {/* {console.log("attr", props)} */}
      {ProdInfo && (
        <ProdAttr
          _id={props._id}
          ProdInfo={ProdInfo}
          newAttr={newAttr}
          setNewAttrs={setNewAttrs}
          setNewAttr={setNewAttr}
        />
      )}

      <hr />

      {ProdInfo && (
        <ProdProduct
          _id={props._id}
          ProdInfo={ProdInfo}
          newAttrs={newAttrs}
          newSKU={newSKU}
          setNewSKU={setNewSKU}
        />
      )}
    </div>
  );
}
