import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function ShopInfoNav(props) {
  return (
    <Breadcrumb className='mt-3'>
      <Breadcrumb.Item href={props.homeLink}>{"/  "}主页</Breadcrumb.Item>

      <Breadcrumb.Item href={props.homeLink + "/shops"}>
        门店管理
      </Breadcrumb.Item>

      <Breadcrumb.Item href={props.homeLink + "/shops" + props._id} active>
        {props.shopInfo && props.shopInfo.nome}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
