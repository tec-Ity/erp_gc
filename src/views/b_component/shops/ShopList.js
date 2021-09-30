import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get_DNS, get_Prom } from "../../a_global/Api";
import LoadingModal from "../../a_global/LoadingModal";

function ShopCards(props) {
  let shops;
  if (props.Shops === null) {
    shops = null;
  } else if (props.Shops.length > 0) {
    shops = props.Shops.map((shop) => (
      <Card
        border='primary'
        style={{ width: "15rem" }}
        className='m-2'
        key={shop._id}>
        <Card.Img
          variant='top'
          className='m-auto pt-3 w-50'
          src={
            shop.img_url
              ? get_DNS() + shop.img_url
              : process.env.PUBLIC_URL + "/Shop.png"
          }
        />
        <Card.Body className='text-center'>
          <Card.Title title={shop.addr}>
            {shop.nome} ({shop.code})
          </Card.Title>
          <Card.Subtitle>{shop.Cita.nome}</Card.Subtitle>
          <Card.Text className='text-center pt-3'>
            <Link to={props.homeLink + "/shops/" + shop._id}>
              <Button variant='primary'>管理 / 查看</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  } else {
    shops = <p>暂无门店</p>;
  }
  return shops;
}

export default function ShopList(props) {
  const [Shops, set_Shops] = useState(null);
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);

  useEffect(() => {
    async function func() {
      set_LoadingModalShow(true);
      const result = await get_Prom("/Shops");
      const shops = result.data?.objects;
      set_Shops(shops);
    }
    func();
  }, [props.newShop]);

  useEffect(() => {
    if (Shops === null) {
      set_LoadingModalShow(true);
    } else {
      set_LoadingModalShow(false);
    }
  }, [Shops]);
  return (
    <div className='d-flex flex-wrap'>
      <ShopCards
        Shops={Shops}
        homeLink={props.homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
      <LoadingModal show={LoadingModalShow} />
    </div>
  );
}
