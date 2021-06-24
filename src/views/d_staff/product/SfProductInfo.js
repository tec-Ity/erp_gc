import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import {
  ProductInfoNav,
  ProductInfoTitle,
  ProductInfoForm,
  ProductInfoImage,
} from "../../b_component/products/productInfo/index";

export default function SfProductInfo() {
  const [homeLink] = useState("/staff/home");
  const { _id } = useParams();
  const [productInfo, set_ProductInfo] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [newPd, set_newPd] = useState();
  const [newImage, setNewImage] = useState();

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Pd/" + _id);
      console.log(result.data.object);
      set_ProductInfo(Object.assign({}, productInfo, result.data.object));
    }

    func();
  }, [newPd]);

  return (
    <div className='container'>
      <ProductInfoNav homeLink={homeLink} _id={_id} productInfo={productInfo} />
      <ProductInfoTitle
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        homeLink={homeLink}
        _id={_id}
      />

      <hr />

      {productInfo && (
        <ProductInfoForm
          _id={_id}
          productInfo={productInfo}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          set_ProductInfo={set_ProductInfo}
        />
      )}

      <hr className='my-4' />

      <ProductInfoImage
        _id={_id}
        productImage={productInfo?.img_urls}
        set_newPd={set_newPd}
        newImage={newImage}
        setNewImage={setNewImage}
      />
      <hr className='my-4' />

      <Link to='/staff/home/products'>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>

    </div>
  );
}
