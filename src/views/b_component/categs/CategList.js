import React, { useState, useEffect, useContext } from "react";
import { get_Prom } from "../../a_global/Api";
import {
  Button,
  ListGroup,
  Accordion,
  Card,
  AccordionContext,
  useAccordionToggle,
} from "react-bootstrap";
import {
  BsChevronRight,
  BsChevronDown,
  BsFillCaretRightFill,
} from "react-icons/bs";
// import {CgDetailsMore} from 'react-icons/cg'
import "./CategList.css";

function ExpButton(props) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    props.eventKey,
    () => props.callback && props.callback(props.eventKey)
  );

  const isCurrentEventKey = currentEventKey === props.eventKey;

  return isCurrentEventKey ? (
    <BsChevronDown onClick={decoratedOnClick} />
  ) : (
    <BsChevronRight onClick={decoratedOnClick} />
  );
  // return (
  //   <button
  //     type='button'
  //     style={{ backgroundColor: isCurrentEventKey ? "pink" : "lavender" }}
  //     onClick={decoratedOnClick}>
  //     {props.children}
  //   </button>
  // );
}

function CategCard(props) {
  const { cat, index, set_upCateg, set_upModalShow} =
    props;
  return (
    <Card key={index}>
      <Card.Header className=' pl-1'>
        <Accordion.Toggle
          className=' px-4'
          as={Button}
          variant='link'
          eventKey={cat._id}>
          <ExpButton eventKey={cat._id}></ExpButton>
        </Accordion.Toggle>
        <div
          className='d-inline pl-3 pr-5 py-3 '
          onClick={() => {
            set_upModalShow(true);
            set_upCateg(cat);
          }}>
          {cat.code}
        </div>
      </Card.Header>
      <Accordion.Collapse eventKey={cat._id}>
        <Card.Body>
          {cat.Categ_sons.length > 0 ? (
            <ListGroup className='ml-5' variant='flush'>
              {cat.Categ_sons?.map((son) => {
                return (
                  <ListGroup.Item key={son._id} action className='ml-2 pl-1'>
                    <BsFillCaretRightFill />
                    <span
                      className='py-2 px-5'
                      onClick={() => {
                        set_upModalShow(true);
                        set_upCateg(son);
                      }}>
                      {son.code}
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <div className='ml-5 pl-4'>
              <BsFillCaretRightFill />
              暂无子分类
            </div>
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default function CategList(props) {
  const {
    newCateg,
    set_categFars,
    set_LoadingModalShow,
    set_upModalShow,
    set_upCateg,
  } = props;
  const [Categs, setCategs] = useState(null);
  const [expIndex, setExpIndex] = useState(-1);
  useEffect(() => {
    if (Categs !== null) {
      set_LoadingModalShow(false);
    } else {
      set_LoadingModalShow(true);
    }
  }, [Categs, set_LoadingModalShow]);

  useEffect(() => {
    const getCategList = async () => {
      try {
        const result = await get_Prom("/Categs");
        const categs = result.data?.objects;
        setCategs(categs);
        set_categFars(categs);
      } catch {
        // setCategs(null);
      }
    };
    getCategList();
  }, [newCateg, set_categFars]);

  return (
    <div className='container just-padding'>
      <Accordion defaultActiveKey='0'>
        {Categs?.map((cat, index) => {
          return (
            <CategCard
              cat={cat}
              index={index}
              set_upModalShow={set_upModalShow}
              set_upCateg={set_upCateg}
              expIndex={expIndex}
              setExpIndex={setExpIndex}
            />
          );
        })}
      </Accordion>
    </div>
  );
}
