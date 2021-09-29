import React, { useState } from "react";
import { useEffect } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { Button, Form, Col, Card, Accordion } from "react-bootstrap";
import { delete_Prom, put_Prom } from "../../../a_global/Api";

export default function ProdProductList(props) {
  return (
    <Accordion>
      {props.Products?.length > 0 &&
        props.Products?.map((product, index) => {
          return (
            <SkuCard
              key={index}
              product={product}
              index={index}
              Attrs={props.Attrs}
              _id={product._id}
              setNewSKU={props.setNewSKU}
            />
          );
        })}
    </Accordion>
  );
}

function SkuCard(props) {
  const [IsControlStock, setIsControlStock] = useState();
  const [IsUsable, setIsUsable] = useState();
  const [AllowBackOrder, setAllowBackOrder] = useState();
  const [Product, setProduct] = useState();

  useEffect(() => {
    setProduct(props.product && props.product);

    setIsControlStock(
      props.product?.is_controlStock && props.product?.is_controlStock
    );
    setIsUsable(props.product?.is_usable && props.product?.is_usable);
    setAllowBackOrder(
      props.product?.allow_backorder && props.product?.allow_backorder
    );
  }, [props.product]);

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(Product?._id);
    const result = await delete_Prom("/Sku/" + Product?._id);
    console.log(result);

    if (result.status === 200) {
      alert("删除成功");
      props.setNewSKU(Product && Product);
    } else {
      alert(result.message);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const obj = {};
      obj.Prod = props._id;
      const attrList = [];

      if (e.target.FormProductAttrNome?.length) {
        for (let i = 0; i < e.target.FormProductAttrNome.length; i++) {
          if (e.target.FormProductAttrOption[i].value !== "") {
            attrList.push({
              nome: e.target.FormProductAttrNome[i].value,
              option: e.target.FormProductAttrOption[i].value,
            });
          }
        }
      } else {
        if (e.target.FormProductAttrNome && e.target.FormProductAttrOption) {
          attrList.push({
            nome: e.target.FormProductAttrNome.value,
            option: e.target.FormProductAttrOption.value,
          });
        }
      }

      obj.attrs = attrList;
      obj.is_usable = IsUsable;
      obj.is_controlStock = IsControlStock;
      obj.allow_backorder = AllowBackOrder;
      obj.price_regular = e.target.FormProductPriceRegular?.value;
      obj.price_sale = e.target.FormProductPriceSale?.value;
      obj.limit_quantity = e.target.FormProductLimitQuantity?.value;
      obj.purchase_note = e.target.FormProductNote?.value;
      obj.quantity = e.target.FormProductQuantity?.value;

      console.log(obj);
      const result = await put_Prom("/SkuPut/" + Product?._id, { obj });
      console.log(result);

      if (result.status === 200) {
        alert("SKU修改成功");
        props.setNewSKU(result.data?.object);
        props.onHide();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAttrList = (attr) => {
    const attop = Product?.attrs?.find((at) => {
      return at.nome === attr.nome;
    })?.option;
    console.log(attop);
    const attList = attr.options?.map((option, index) => {
      return attop !== option ? (
        <option value={option || ""} key={option + (index + 1)}>
          {option}
        </option>
      ) : (
        <option value={option || ""} selected key={option + (index + 1)}>
          {option}
        </option>
      );
    });
    
    return attop? [attList]: [<option value="" >请选择属性</option>, attList];
  };

  return (
    <Card key={props.index}>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={props.index + 1}
        className='d-flex justify-content-between align-items-center'>
        {props.index === 0 ? (
          <h5>默认SKU</h5>
        ) : (
          <h5>
            {props.index}
            &nbsp;----&nbsp;
            {Product?.attrs?.map((attr) => {
              return (
                <span className='bg-white p-3 mx-3' key={attr._id}>
                  {attr.nome + " : " + attr.option}
                </span>
              );
            })}
          </h5>
        )}
        <BsChevronExpand />
      </Accordion.Toggle>

      <Accordion.Collapse eventKey={props.index + 1}>
        <Card.Body>
          <Form noValidate autoComplete='off' onSubmit={handleUpdate}>
            <Form.Row>
              <Col sm={12}>
                <Form.Label className='font-weight-bold'>选择属性</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row>
              {props.index === 0 ? (
                <span className='ml-3'>无属性</span>
              ) : (
                props.Attrs?.map((attr, index) => {
                  return (
                    <Col sm={3} className='mb-2' key={attr._id}>
                      <Form.Group controlId='FormProductAttrNome'>
                        <Form.Control value={attr.nome || ""} hidden readOnly />
                      </Form.Group>
                      <Form.Group controlId='FormProductAttrOption'>
                        <Form.Label>{attr.nome}</Form.Label>
                        <Form.Control as='select'>
                          {getAttrList(attr)}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  );
                })
              )}
            </Form.Row>
            <Form.Row className='mt-2'>
              <Col>
                <Form.Group controlId='FormProductIsUsable'>
                  <Form.Label>属性是否可用</Form.Label>
                  <Form.Check
                    type='switch'
                    className='ml-2'
                    id={"isUsable-switch-" + Product?._id}
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
                    value={Product?.price_regular || ""}
                    onChange={(e) => {
                      setProduct({
                        ...Product,
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
                    value={Product?.price_sale || ""}
                    onChange={(e) => {
                      setProduct({
                        ...Product,
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
                    value={
                      Product?.limit_quantity === null
                        ? 0
                        : Product?.limit_quantity
                    }
                    onChange={(e) => {
                      setProduct({
                        ...Product,
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
                  <Form.Control
                    as='textarea'
                    value={Product?.purchase_note || ""}
                    onChange={(e) => {
                      setProduct({
                        ...Product,
                        purchase_note: e.target.value,
                      });
                    }}
                  />
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
                    id={"stock-switch-" + Product?._id}
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
                      id={"back-switch-" + Product?._id}
                      checked={AllowBackOrder && AllowBackOrder}
                      onChange={(e) => {
                        setAllowBackOrder(!AllowBackOrder);
                      }}
                    />
                  </Form.Group>
                </Col>
              )}
              {IsControlStock === true && (
                <Col sm={4}>
                  <Form.Group controlId='FormProductQuantity'>
                    <Form.Label>库存数量</Form.Label>
                    <Form.Control
                      value={Product?.quantity || ""}
                      onChange={(e) => {
                        setProduct({
                          ...Product,
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
                      value={
                        Product?.quantity_alert === null
                          ? 0
                          : Product?.quantity_alert
                      }
                      onChange={(e) => {
                        setProduct({
                          ...Product,
                          quantity_alert: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              )}
            </Form.Row>
            <div className='d-flex justify-content-between'>
              <Button variant='primary' type='submit' className='mt-4'>
                保存修改
              </Button>
              {props.index!==0 &&(<Button variant='danger' className='mt-4' onClick={handleDelete}>
                删除SKU
              </Button>)}
            </div>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
