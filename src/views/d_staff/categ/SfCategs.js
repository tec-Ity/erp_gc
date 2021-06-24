import React, { useState } from "react";
import {
  CategNav,
  CategTitle,
  ModalAddCateg,
  CategList,
  ModalUpdateCateg,
} from "../../b_component/categs/index";

import LoadingModal from "../../a_global/LoadingModal";
export default function SfCategs(props) {
  const [homeLink] = useState("/staff/home");
  const [newCateg, set_newCateg] = useState();
  const [ModalShow, setModalShow] = useState(false);
  const [upModalShow, set_upModalShow] = useState(false);
  const [upCateg, set_upCateg] = useState();
  const [categFars, set_categFars]=useState();
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  

  return (
    <div className="container">
      <CategNav homeLink={homeLink} />

      <CategTitle addCateg={() => setModalShow(true)} />

      {ModalShow && (
        <ModalAddCateg
          show={ModalShow}
          onHide={() => {
            setModalShow(false);
          }}
          set_newCateg={set_newCateg}
        />
      )}

      <hr />
      <LoadingModal show={LoadingModalShow} />
      <CategList
        newCateg={newCateg}
        homeLink={homeLink}
        set_upModalShow={set_upModalShow}
        set_LoadingModalShow={set_LoadingModalShow}
		set_upCateg={set_upCateg}
		set_categFars={set_categFars}
      />
      {upModalShow && (
        <ModalUpdateCateg
          show={upModalShow}
          onHide={() => {
            set_upModalShow(false);
          }}
          set_newCateg={set_newCateg}
		  upCateg={upCateg}
		  set_upCateg={set_upCateg}
		  set_newCateg={set_newCateg}
		  categFars={categFars}
        />
      )}

    </div>
  );
}
