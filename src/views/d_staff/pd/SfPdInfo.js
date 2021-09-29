import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import {
  PdInfoNav,
  PdInfoTitle,
  PdInfoForm,
} from "../../b_component/pds/pdInfo/index";
import LoadingModal from "../../a_global/LoadingModal";
import InfoImageSection from "../../a_global/image/InfoImageSection";
import PdProdsList from "../../b_component/pds/pdInfo/PdProdsList";

export default function SfPdInfo(props) {
  const [homeLink] = useState(props.homeLink);
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [newPd, set_newPd] = useState();
  const [newImage, setNewImage] = useState();
  const [LoadingModalShow, setLoadingModalShow] = useState(true);

  useEffect(() => {
    if (productInfo !== null) {
      setLoadingModalShow(false);
    } else {
      setLoadingModalShow(true);
    }
  }, [productInfo]);

  useEffect(() => {
    async function func() {
      console.log("call pd");
      const result = await get_Prom("/Pd/" + _id);
      setProductInfo(result.data?.object);
    }
    func();
  }, [newPd, _id, newImage]);

  return (
    <div className='container'>
      <PdInfoNav homeLink={homeLink} _id={_id} productInfo={productInfo} />
      <PdInfoTitle
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        homeLink={homeLink}
        _id={_id}
      />

      <hr />
      {LoadingModalShow && <LoadingModal show={LoadingModalShow} />}

      {productInfo && (
        <PdInfoForm
          _id={_id}
          productInfo={productInfo}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          setProductInfo={setProductInfo}
          setLoadingModalShow={setLoadingModalShow}
          homeLink={homeLink}
          set_newPd={set_newPd}
        />
      )}

      <hr className='my-4' />
      {productInfo && (
        <InfoImageSection
          _id={_id}
          infoImage={productInfo?.img_urls}
          sectionName='产品'
          sectionApi='Pd'
        />
      )}
      <hr className='my-4' />
        {console.log('productinfo',productInfo)}
      {productInfo && <PdProdsList prods={productInfo.Prods} />}

      <hr className='my-4' />
      <Link to={homeLink + "/pds"}>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>
    </div>
  );
}
