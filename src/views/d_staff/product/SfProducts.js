import React, { useState } from "react";
import {
  ProductNav,
  ProductTitle,
  ModalAddProduct,
  ProductList,
} from "../../b_component/products/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfProducts() {
  const [homeLink] = useState("/staff/home");
  const [ModalShow, set_ModalShow] = useState(false);
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  const [newProduct, set_newProduct] = useState();

  return (
    <div className='container'>
      <ProductNav homeLink={homeLink} />
      <ProductTitle addProduct={() => set_ModalShow(true)} />
      <hr />
      {ModalShow && (
        <ModalAddProduct
          show={ModalShow}
          onHide={() => set_ModalShow(false)}
          set_newProduct={set_newProduct}
        />
      )}
      <LoadingModal show={LoadingModalShow} />
      <ProductList
        newProduct={newProduct}
		homeLink={homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
    </div>
  );
}
