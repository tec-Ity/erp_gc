import React, { useState, useEffect } from "react";
import {
  UserNav,
  UserTitle,
  UserTable,
  ModalAddUser,
} from "../../b_component/users/index";
import LoadingModal from "../../a_global/LoadingModal";
import UserTableFilter from "../../b_component/users/UserTableFilter";

export default function SbUsers(props) {
  const [homeLink] = useState(props.homeLink);
  const [ModalShow, setModalShow] = useState(false);
  const [newUser, set_newUser] = useState();
  const [LoadingModalShow, set_LoadingModalShow] = useState(false);
  const [backPage, setBackPage] = useState(0);
  const [urlQuery, setUrlQuery] = useState({
    page: 1,
    pagesize: 50,
    sortKey: "",
    sortVal: -1,
    search: "",
    is_usable: true,
  });

  useEffect(() => {
    setUrlQuery((prevUq) => ({
      ...prevUq,
      page: 1,
    }));
    setBackPage(0);
  }, [urlQuery.sortKey, urlQuery.sortVal]);

  const handleChangeQuery = (e, key) => {
    if (key === "is_usable") {
      e.target.blur();
      setUrlQuery((prevUq) => ({
        ...prevUq,
        [key]: e.target.checked,
      }));
    } else {
      setUrlQuery((prevUq) => ({
        ...prevUq,
        [key]: e.target.value,
      }));
    }

    setUrlQuery((prevUq) => ({
      ...prevUq,
      sortKey: '',
    }));
    
  };

  return (
    <div className='container'>
      <UserNav homeLink={homeLink} />

      <UserTitle addUser={() => setModalShow(true)} />

      {ModalShow && (
        <ModalAddUser
          show={ModalShow}
          onHide={() => {
            setModalShow(false);
          }}
          set_newUser={set_newUser}
        />
      )}

      <hr />

      <LoadingModal show={LoadingModalShow} />

      <UserTableFilter
        handleChangeQuery={handleChangeQuery}
        urlQuery={urlQuery}
      />

      <UserTable
        newUser={newUser}
        homeLink={homeLink}
        set_LoadingModalShow={set_LoadingModalShow}
        urlQuery={urlQuery}
        setUrlQuery={setUrlQuery}
        backPage={backPage}
        setBackPage={setBackPage}
      />
    </div>
  );
}
