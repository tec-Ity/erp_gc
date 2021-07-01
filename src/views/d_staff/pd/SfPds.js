import React, { useState } from "react";
import {
  PdNav,
  PdTitle,
  ModalAddPd,
  PdList,
} from "../../b_component/pds/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfPds() {
  const [homeLink] = useState("/staff/home");
  const [ModalShow, set_ModalShow] = useState(false);
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  const [newPd, set_newPd] = useState();

  return (
    <div className='container'>
      <PdNav homeLink={homeLink} />
      <PdTitle addPd={() => set_ModalShow(true)} />
      <hr />
      {ModalShow && (
        <ModalAddPd
          show={ModalShow}
          onHide={() => set_ModalShow(false)}
          set_newPd={set_newPd}
        />
      )}
      <LoadingModal show={LoadingModalShow} />

      <PdList
        newPd={newPd}
        homeLink={homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
      />
    </div>
  );
}
