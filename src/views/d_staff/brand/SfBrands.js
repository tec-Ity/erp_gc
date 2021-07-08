import React, { useState } from "react";
import {
  BrandNav,
  BrandTitle,
  BrandList,
  ModalAddBrand,
} from "../../b_component/brands/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfBrands(props) {
  const [homeLink] = useState(props.homeLink);
  const [newBrand, set_newBrand] = useState();
  const [ModalShow, setModalShow] = useState(false);
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);

  return (
    <div className='container'>
      <BrandNav homeLink={homeLink} />

      <BrandTitle addBrand={() => setModalShow(true)} />

      {ModalShow && (
        <ModalAddBrand
          show={ModalShow}
          onHide={() => {
            setModalShow(false);
          }}
          set_newBrand={set_newBrand}
        />
      )}

      <hr />
      <LoadingModal show={LoadingModalShow} />
      <BrandList
        newBrand={newBrand}
        homeLink={homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
    </div>
  );
}
