import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import {  post_Prom } from "../../../a_global/Api";

export default function ProductModalAdd(props) {
  const [validated, ] = useState();
  const [Attrs, setAttrs] = useState();
  const [IsControlStock, setIsControlStock] = useState();
  const [IsUsable, setIsUsable] = useState();
  const [AllowBackOrder, setAllowBackOrder] = useState();
  const [DefaultProduct, setDefaultProduct] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const obj = {};
      obj.Prod = props._id;
      const attrList = [];

      if (e.target.FormProductAttrNome.length) {
        for (let i = 0; i < e.target.FormProductAttrNome.length; i++) {
          if (e.target.FormProductAttrOption[i].value !== "") {
            attrList.push({
              nome: e.target.FormProductAttrNome[i].value,
              option: e.target.FormProductAttrOption[i].value,
            });
          }
        }
      } else {
        attrList.push({
          nome: e.target.FormProductAttrNome.value,
          option: e.target.FormProductAttrOption.value,
        });
      }

      console.log(attrList);
      obj.attrs = attrList;
      obj.is_usable = IsUsable;
      obj.is_controlStock = IsControlStock;
      obj.allow_backorder = AllowBackOrder;
      obj.price_regular = e.target.FormProductPriceRegular.value;
      obj.price_sale = e.target.FormProductPriceSale.value;
      obj.limit_quantity = e.target.FormProductLimitQuantity.value;
      obj.purchase_note = e.target.FormProductNote.value;
      obj.quantity = e.target.FormProductQuantity.value;

      console.log(obj);
      const result = await post_Prom("/SkuPost", { obj });
      console.log(result);

      if (result.status === 200) {
        alert("SKU添加成功");
        props.setNewSKU(result.data?.object);
        props.onHide();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDefaultProduct(props.DefaultProduct);
    console.log('attrs', props.Attrs)
    setAttrs(props.Attrs && props.Attrs);
    setIsControlStock(
      props.DefaultProduct?.is_controlStock &&
        props.DefaultProduct?.is_controlStock
    );
    setIsUsable(
      props.DefaultProduct?.is_usable && props.DefaultProduct?.is_usable
    );
    setAllowBackOrder(
      props.DefaultProduct?.allow_backorder &&
        props.DefaultProduct?.allow_backorder
    );
  }, [props.ProdInfo, props.Products, props.Attrs, props.DefaultProduct]);

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>添加SKU</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
        autoComplete='off'>
        <Modal.Body>
          <Form.Row>
            <Col sm={12}>
              <Form.Label className='font-weight-bold'>选择属性</Form.Label>
            </Col>
          </Form.Row>
          <Form.Row>
            {Attrs?.map((attr, index) => {
              return (
                <Col sm={3} className='mb-2' key={attr._id}>
                  <Form.Group controlId='FormProductAttrNome'>
                    <Form.Control value={attr.nome} hidden />
                  </Form.Group>
                  <Form.Group controlId='FormProductAttrOption'>
                    <Form.Label>{attr.nome}</Form.Label>
                    <Form.Control as='select'>
                      <option value=''>请选择属性值</option>
                      {attr.options?.map((option, index) => {
                        return (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
              );
            })}
          </Form.Row>
          <Form.Row className='mt-2'>
            <Col>
              <Form.Group controlId='FormProductIsUsable'>
                <Form.Label>属性是否可用</Form.Label>
                <Form.Check
                  type='switch'
                  className='ml-2'
                  id="isUsable-switch-add"
                  checked={IsUsable && IsUsable}
                  onChange={() => setIsUsable(!IsUsable)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col sm={12}>
              <Form.Label className='font-weight-bold'>购买设置</Form.Label>
            </Col>
          </Form.Row>
          <Form.Row className='mt-2'>
            <Col sm={4}>
              <Form.Group controlId='FormProductPriceRegular'>
                <Form.Label>商品标价</Form.Label>
                <Form.Control
                  value={DefaultProduct?.price_regular}
                  onChange={(e) => {
                    setDefaultProduct({
                      ...DefaultProduct,
                      price_regular: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId='FormProductPriceSale'>
                <Form.Label>商品卖价</Form.Label>
                <Form.Control
                  value={DefaultProduct?.price_sale}
                  onChange={(e) => {
                    setDefaultProduct({
                      ...DefaultProduct,
                      price_sale: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId='FormProductLimitQuantity'>
                <Form.Label>限购数量</Form.Label>
                <Form.Control
                  value={DefaultProduct?.limit_quantity}
                  onChange={(e) => {
                    setDefaultProduct({
                      ...DefaultProduct,
                      limit_quantity: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId='FormProductNote'>
                <Form.Label>采购通知</Form.Label>
                <Form.Control as='textarea' />
              </Form.Group>
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col sm={12}>
              <Form.Label className='font-weight-bold'>库存设置</Form.Label>
            </Col>
          </Form.Row>
          <Form.Row className='mt-2'>
            <Col sm={2}>
              <Form.Group controlId='FormProductIsControlStock'>
                <Form.Label>管理库存</Form.Label>
                <Form.Check
                  type='switch'
                  className='ml-2'
                  id='stock-switch-
                  className="ml-2"add'
                  onChange={(e) => {
                    setIsControlStock(!IsControlStock);
                  }}
                  checked={IsControlStock && IsControlStock}
                />
              </Form.Group>
            </Col>
            {IsControlStock === true && (
              <Col sm={2}>
                <Form.Group controlId='FormProductBackOrder'>
                  <Form.Label>缺货下单</Form.Label>
                  <Form.Check
                    type='switch'
                    className='ml-2'
                    id='back-switch-add'
                    checked={AllowBackOrder && AllowBackOrder}
                    onChange={(e) => {setAllowBackOrder(!AllowBackOrder)}}
                  />
                </Form.Group>
              </Col>
            )}
            {IsControlStock === true && (
              <Col sm={4}>
                <Form.Group controlId='FormProductQuantity'>
                  <Form.Label>库存数量</Form.Label>
                  <Form.Control
                    value={DefaultProduct?.quantity}
                    onChange={(e) => {
                      setDefaultProduct({
                        ...DefaultProduct,
                        quantity: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            )}
            {IsControlStock === true && (
              <Col sm={4}>
                <Form.Group controlId='FormProductQuantityAlert'>
                  <Form.Label>库存警戒值</Form.Label>
                  <Form.Control
                    value={DefaultProduct?.quantity_alert}
                    onChange={(e) => {
                      setDefaultProduct({
                        ...DefaultProduct,
                        quantity_alert: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            )}
          </Form.Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' type='submit' className='mt-4'>
            完成添加
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
