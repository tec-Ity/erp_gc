import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ProdTitle(props) {
  return (
    <div className='d-flex justify-content-between my-4'>
      <h1>商品列表</h1>
      <Link to={props.homeLink + '/prodAdd'}>
        <Button variant='primary'>
          添加商品
        </Button>
      </Link>
    </div>
  );
}
