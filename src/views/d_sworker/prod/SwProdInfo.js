import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import {
  ProdInfoNav,
  ProdInfoTitle,
  ProdInfoForm,
} from "../../b_component/prods/prodInfo/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfProdInfo(props) {
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [newProd, set_newProd] = useState();
  const [LoadingModalShow, setLoadingModalShow] = useState(true);

  // useEffect(() => {
  //   async function func() {
  //     console.log(productInfo)
  //     if (productInfo === null && productInfo === {}) {

  //       setLoadingModalShow(true);
  //     } else {
  //       setLoadingModalShow(false);
  //     }
  //   }
  //   func();
  // }, [productInfo]);

  useEffect(() => {
    async function func() {
      setLoadingModalShow(true);
      const result = await get_Prom("/Prod/" + _id);
      console.log(result);
      console.log(result.data?.object);
      if(result.data?.object !== null && result.data?.object!==undefined && Object.keys(result.data?.object).length!==0){
        setLoadingModalShow(false);
      }
      if (result.status === 400) {
        setTimeout(() => {
          alert('商品信息不存在，请返回查看');
          window.location.replace(props.homeLink+'/prods')
        }, 5000);
      }
      setProductInfo(Object.assign({}, productInfo, result.data?.object));
    }

    func();
  }, [newProd]);

  return (
    <div className='container'>
      <ProdInfoNav
        homeLink={props.homeLink}
        _id={_id}
        productInfo={productInfo}
      />
      <ProdInfoTitle
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        homeLink={props.homeLink}
        _id={_id}
      />

      <hr />
      {LoadingModalShow && <LoadingModal show={LoadingModalShow} />}

      {productInfo && (
        <ProdInfoForm
          _id={_id}
          productInfo={productInfo}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          setProductInfo={setProductInfo}
          setLoadingModalShow={setLoadingModalShow}
          homeLink={props.homeLink}
          set_newProd={set_newProd}
          newProd={newProd}
        />
      )}

      <hr className='my-4' />


      <Link to='/staff/home/prods'>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>
    </div>
  );
}
