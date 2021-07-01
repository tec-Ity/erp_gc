import React, { useState, useEffect } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get_Prom } from "../../a_global/Api";
import LoadingModal from "../../a_global/LoadingModal";

function ShopCards(props) {
  let shops = "";
  if (props.Shops === null) {
    props.set_LoadingModalShow(true);
  } else if (props.Shops.length > 0) {
    props.set_LoadingModalShow(false);

    shops = props.Shops.map((shop) => (
      <Card
        border='primary'
        style={{ width: "15rem" }}
        className='m-2'
        key={shop._id}>
        <Card.Img
          variant='top'
          className='m-auto pt-3 w-50'
          src={process.env.PUBLIC_URL + "/Shop.png"}
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
    props.set_LoadingModalShow(false);
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
      console.log(result);
      const shops = result.data?.objects;
      set_Shops(shops);
    }
    func();
  }, [props.newShop]);

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
