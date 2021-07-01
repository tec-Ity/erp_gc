import React, { useState } from "react";
import { ProdNav, ProdTitle, ProdList,} from "../../b_component/prods/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SwProds(props) {
  const [ModalShow, set_ModalShow] = useState(false);
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  const [newProd, set_newProd] = useState();
  return (
    <div className='container'>
      <ProdNav homeLink={props.homeLink} />
      <ProdTitle homeLink={props.homeLink} />
      <hr />
      
      <LoadingModal show={LoadingModalShow} />

      <ProdList
        newProd={newProd}
        homeLink={props.homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
    </div>
  );
}
