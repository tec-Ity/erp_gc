import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { get_Prom, delete_Prom } from "../../a_global/Api";
import { Button, Spinner } from "react-bootstrap";
import {
  ShopInfoNav,
  ShopInfoTitle,
  ShopInfoForm,
  ShopInfoService,
} from "../../b_component/shops/shopInfo/index";
import InfoImageSection from "../../a_global/image/InfoImageSection";
import ProdList from "../../b_component/prods/ProdList";
import LoadingModal from "../../a_global/LoadingModal";

export default function MgShopInfo(props) {
  const [homeLink] = useState(props.homeLink);
  const { _id } = useParams();
  const [shopInfo, set_ShopInfo] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [newServ, set_newServ] = useState();
  const [LodingModalShow, setLodingModalShow] = useState(false);
  const hist = useHistory();

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Shop/" + _id);
      set_ShopInfo(result.data?.object);
    }
    func();
  }, [_id, newServ]);

  const handleDeleteShop = async () => {
    const result = await delete_Prom("/Shop/" + _id);
    hist.push(homeLink + "/shops");
    if (result.status !== 200) {
      alert(result.message);
    }
  };

  return (
    <div className='container'>
      <ShopInfoNav homeLink={homeLink} _id={_id} shopInfo={shopInfo} />
      <ShopInfoTitle
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        homeLink={homeLink}
        handleDeleteShop={handleDeleteShop}
      />

      <hr />

      {shopInfo ? (
        <ShopInfoForm
          _id={_id}
          shopInfo={shopInfo}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          set_ShopInfo={set_ShopInfo}
        />
      ) : (
        <div>
          <Spinner animation='border' variant='primary' />
          {"   "}加载中。。。
        </div>
      )}

      <hr className='my-4' />
      {shopInfo && (
        <ShopInfoService
          shopInfo={shopInfo}
          newServ={newServ}
          set_newServ={set_newServ}
          set_ShopInfo={set_ShopInfo}
        />
      )}

      <hr className='my-4' />

      {shopInfo && (
        <InfoImageSection
          _id={_id}
          infoImage={[shopInfo?.img_url]}
          sectionName='门店Logo'
          sectionApi='Shop'
          isSingle
        />
      )}
      <LoadingModal show={LodingModalShow} />
      <hr className='my-4' />
      <h3>商品列表</h3>
      {shopInfo && (
        <ProdList
          homeLink={homeLink}
          query={"Shops=" + _id}
          set_LoadingModalShow={setLodingModalShow}
        />
      )}
      <Link to={homeLink + "/shops"}>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>
    </div>
  );
}
