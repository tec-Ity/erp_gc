import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import {
  PdInfoNav,
  PdInfoTitle,
  PdInfoForm,
  PdInfoImage,
} from "../../b_component/pds/pdInfo/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfPdInfo() {
  const [homeLink] = useState("/staff/home");
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [newPd, set_newPd] = useState();
  const [newImage, setNewImage] = useState();
  const [LoadingModalShow, setLoadingModalShow] = useState(true)

  useEffect(() => {
    async function func() {
      if(productInfo!== null){
        setLoadingModalShow(false)
      }else{
        setLoadingModalShow(true)
      }
      // setLoadingModalShow(true)
      const result = await get_Prom("/Pd/" + _id);
      console.log(result.data?.object);
      setProductInfo(Object.assign({}, productInfo, result.data?.object));
    }

    func();
  }, [newPd]);

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
      {LoadingModalShow&&<LoadingModal show={LoadingModalShow}/>}
      
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
      
      <PdInfoImage
        _id={_id}
        productImage={productInfo?.img_urls}
        set_newPd={set_newPd}
        newImage={newImage}
        setNewImage={setNewImage}
      />
      <hr className='my-4' />

      <Link to='/staff/home/pds'>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>

    </div>
  );
}
