import React, { useState } from "react";
import {  PdList } from "../../b_component/pds/index";
import { Breadcrumb } from "react-bootstrap";
import LoadingModal from "../../a_global/LoadingModal";
import { post_Prom } from "../../a_global/Api";

export default function SwProdAdd(props) {
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  const [newPd, ] = useState();

  const SyncProd = async (e) => {
    const result = await post_Prom("/Prod", {
      Pd: e.target.value,
      Shop: localStorage.getItem("crShop"),
    });
     ;
    if (result.status === 200) {
      window.location.href =
        props.homeLink + "/prods/" + result.data?.object._id;
      alert("同步成功");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='container'>
      <Breadcrumb className='mt-3'>
        <Breadcrumb.Item href={props.homeLink}>{"/  "}主页</Breadcrumb.Item>

        <Breadcrumb.Item href={props.homeLink + "/prods"}>
          商品管理
        </Breadcrumb.Item>

        <Breadcrumb.Item href="#" active>
          同步产品
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className='d-flex justify-content-between my-4'>
        <h1>同步产品</h1>
      </div>
      <hr />

      <LoadingModal show={LoadingModalShow} />

      <PdList
        SyncProd={SyncProd}
        crShop={localStorage.getItem("crShop")}
        newPd={newPd}
        syncProd={true}
        homeLink={props.homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
    </div>
  );
}
