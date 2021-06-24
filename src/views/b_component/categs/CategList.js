import React, { useState, useEffect } from "react";
import { get_Prom } from "../../a_global/Api";
import { Button, ListGroup, Accordion, Card } from "react-bootstrap";
import { BsChevronExpand, BsFillCaretRightFill } from "react-icons/bs";
// import {CgDetailsMore} from 'react-icons/cg'
import "./CategList.css";
function Button2(){
  return <Button variant='secondary'/>
}
export default function CategList(props) {
  const [Categs, setCategs] = useState(null);
  const [CategList, setCategList] = useState();
  const [expandIndex, set_expandIndex] = useState(-1);

  const getCategList = async () => {
    try {
      const result = await get_Prom("/Categs");
      const categs = result.data.objects;
      setCategs(categs);
      props.set_categFars(categs);
      console.log(categs);
    } catch {
      // setCategs(null);
    }
  };

  useEffect(() => {
    getCategList();
    if (Categs !== null) {
      props.set_LoadingModalShow(false);
    } else {
      props.set_LoadingModalShow(true);
    }
  }, [props.newCateg]);

  useEffect(() => {
    let catList;
    if (Categs !== null) {
      props.set_LoadingModalShow(false);
    } else {
      props.set_LoadingModalShow(true);
    }
    if (Categs === null) {
    } else {
      catList = Categs?.map((cat, index) => {
        return (
          <Card key={index}>
            <Card.Header className=' pl-1'>
              <Accordion.Toggle
                className=' px-4'
                as={Button}
                variant='link'
                eventKey={cat._id}>
                <div>
                  <BsChevronExpand />
                </div>
              </Accordion.Toggle>
              <div
                className='d-inline pl-3 pr-5 py-3 '
                onClick={() => {
                  props.set_upModalShow(true);
                  props.set_upCateg(cat);
                }}>
                {cat.code}
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={cat._id}>
              <Card.Body>
                {cat.Categ_sons.length > 0 ? (
                  <ListGroup  className='ml-5' variant='flush'>
                    {cat.Categ_sons?.map((son) => {
                      return (
                        <ListGroup.Item key={son._id} action className='ml-2 pl-1'>
                          <BsFillCaretRightFill/><span className='py-2 px-5'
                            onClick={() => {
                              props.set_upModalShow(true);
                              props.set_upCateg(son);
                            }}>
                            {son.code}
                          </span>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <div className='ml-5 pl-4'><BsFillCaretRightFill/>暂无子分类</div>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
    }
    setCategList(catList);
  }, [Categs, expandIndex]);

  return (
    <div className='container just-padding'>
      <Accordion defaultActiveKey='0'>{CategList}</Accordion>
    </div>
  );
}
