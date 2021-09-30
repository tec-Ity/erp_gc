import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { put_Prom, get_Prom } from "../../../a_global/Api";

function ChangeButton(props) {
  return (
    <Button
      className='d-block px-4'
      id={"upbox_" + props.sCita._id}
      onClick={(e) => {
        props.set_showChange(false);
        props.set_btnIndex(props.index);
      }}>
      更改
    </Button>
  );
}

function CancleButton(props) {
  return (
    <Button
      variant='secondary'
      className='d-block ml-3'
      id={"cancle_" + props.sCita._id}
      onClick={(e) => {
        props.set_btnIndex(-1);
        props.set_showChange(true);
      }}>
      取消
    </Button>
  );
}

function ConfirmButton(props) {
  return (
    <Button variant='success' className='d-block' type='submit'>
      确认
    </Button>
  );
}

function DeleteButton(props) {
  return (
    <Button
      variant='danger'
      className='d-block px-4'
      onClick={async (e) => {
        const result = await put_Prom(
          "/Shop/" + props.shopId,
          { serveCitaDelete: {Cita:props.sCita.Cita._id }}
        );
        if (result.status === 200) {
          props.set_newServ(result.data?.object);
        } else {
          alert(result.message);
        }
      }}>
      删除
    </Button>
  );
}

function ConfirmAddButton(props) {
  return (
    <Button variant='success' className='d-block px-4' type='submit'>
      添加
    </Button>
  );
}

function CancleAddButton(props) {
  return (
    <Button
      variant='secondary'
      className='d-block px-4'
      onClick={() => props.onHide()}>
      取消
    </Button>
  );
}

export default function ShopInfoService(props) {
  const [validated] = useState();
  const [serveList, set_serveList] = useState();
  const [avalCita, set_avalCita] = useState();
  const [showAdd, set_showAdd] = useState(false);
  const [showChange, set_showChange] = useState(true);
  const [btnIndex, set_btnIndex] = useState(-1);
  const [citas, set_citas] = useState();

  const handleAddNew = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.Cita = String(e.target.newCity.value);
    obj.price_ship = parseFloat(e.target.newFee.value);

    const result = await put_Prom(
      "/Shop/" + props.shopInfo._id ,
      { serveCitaPost: obj }
    );
    if (result.status === 200) {
      set_showAdd(false);
      props.set_newServ(result.data?.object);
    } else {
      alert(result.message);
    }
  };

  const handleChangeFee = async (e) => {
    e.preventDefault();
    const sCita_id = e.target[1].id;
    const obj = {
      _id: sCita_id,
      price_ship: e.target[1].value,
    };
    const result = await put_Prom(
      "/Shop/" + props.shopInfo._id,
      { serveCitaPut: obj }
    );
    if (result.status === 200) {
      props.set_newServ(result.data?.object);
      set_btnIndex(-1);
      set_showChange(true);
    } else {
      alert(result.message);
    }
  };

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Citas?excludes=" + [serveList]);
      if (result.status === 200) {
        set_avalCita(result.data?.objects);
      } else {
        alert(result.message);
      }
    }
    func();
  }, [showAdd, serveList]);

  useEffect(() => {
    if (props.shopInfo !== null) {
      const SL =
        props.shopInfo &&
        props.shopInfo.serve_Citas?.map((sCita, index) => sCita.Cita._id);
      set_serveList(SL);

      if (props.shopInfo.serve_Citas !== null) {
        set_citas(props.shopInfo.serve_Citas);
      }
    }
  }, [props.shopInfo, showChange, props.newServ]);

  return (
    <div className='container'>
      <div className='d-flex justify-content-end'>
        <Button variant='success' onClick={() => set_showAdd(true)}>
          增加服务
        </Button>
      </div>
      <Form noValidate validated={validated}>
        <Form.Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>服务城市</Form.Label>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>额外运费</Form.Label>
            </Form.Group>
          </Col>
          <Col md={4} className='text-center'>
            <Form.Group className=''>
              <Form.Label>&nbsp;</Form.Label>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      {showAdd && (
        <Form onSubmit={handleAddNew} noValidate validated={validated}>
          <Form.Row>
            <Col md={4}>
              <Form.Group controlId='newCity'>
                <Form.Control type='text' as='select' required>
                  {avalCita?.map((cita) => {
                    return (
                      <option value={cita._id} key={cita._id}>
                        {cita.nome}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='newFee'>
                <Form.Control type='text' required />
              </Form.Group>
            </Col>
            <Col md={4} className='text-center'>
              <Form.Group className='container'>
                <div className='d-flex justify-content-around'>
                  <ConfirmAddButton onHide={() => set_showAdd(false)} />
                  <CancleAddButton onHide={() => set_showAdd(false)} />
                </div>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      )}
      {citas?.map((sCita, index) => {
        return (
          <Form
            key={index}
            onSubmit={handleChangeFee}
            noValidate
            validated={validated}>
            <Form.Row key={sCita._id}>
              <Col md={4}>
                <Form.Group controlId={sCita._id + "city"}>
                  <Form.Control
                    value={sCita._id+' '+sCita.Cita._id +' '+sCita.Cita.nome}
                    type='text'
                    required
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={sCita._id}>
                  <Form.Control
                    value={sCita.price_ship}
                    className={sCita._id}
                    type='text'
                    required
                    disabled={index !== btnIndex}
                    onChange={(e) => {
                      set_citas(
                        citas?.map((cita) => {
                          if (cita._id === sCita._id) {
                            return {
                              ...cita,
                              price_ship: e.target.value,
                            };
                          } else {
                            return cita;
                          }
                        })
                      );
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className='text-center'>
                <Form.Group className='container'>
                  <div className='d-flex justify-content-around'>
                    {showChange === true && btnIndex !== index ? (
                      <ChangeButton
                        set_showChange={set_showChange}
                        sCita={sCita}
                        index={index}
                        set_btnIndex={set_btnIndex}
                      />
                    ) : btnIndex === index ? (
                      <div className='d-flex'>
                        <ConfirmButton
                          set_showChange={set_showChange}
                          sCita={sCita}
                        />
                        <CancleButton
                          set_showChange={set_showChange}
                          set_btnIndex={set_btnIndex}
                          sCita={sCita}
                        />
                      </div>
                    ) : (
                      <ChangeButton
                        set_showChange={set_showChange}
                        sCita={sCita}
                        index={index}
                        set_btnIndex={set_btnIndex}
                      />
                    )}

                    <DeleteButton
                      sCita={sCita}
                      shopId={props.shopInfo._id}
                      set_newServ={props.set_newServ}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        );
      })}
    </div>
  );
}
