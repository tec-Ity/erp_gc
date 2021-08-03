import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { get_Prom} from "../../a_global/Api";
import { Button} from "react-bootstrap";
import {
  UserInfoNav,
  UserInfoTitle,
  UserInfoForm,
  ModalUserPwd,
} from "../../b_component/users/userInfo/index";

export default function SbUserInfo(props) {
  const [homeLink] = useState(props.homeLink);
  const { _id } = useParams();
  const [userInfo, set_userInfo] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [ModalPwdShow, setModalPwdShow] = useState(false);
  const hist=useHistory();

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/User/" + _id);
      set_userInfo(result.data?.object);
    }
	func();
  }, [_id]);

  return (
    <div className='container'>
      <UserInfoNav homeLink={homeLink} userInfo={userInfo} />
      <UserInfoTitle
        _id={_id}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        setModalPwdShow={setModalPwdShow}
        homeLink={homeLink}
        hist={hist}
      />

      {ModalPwdShow && (
        <ModalUserPwd
          homeLink={homeLink}
          userId={_id}
          show={ModalPwdShow}
          onHide={() => {
            setModalPwdShow(false);
          }}
        />
      )}
      <hr />

      <UserInfoForm
        _id={_id}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        userInfo={userInfo}
        set_userInfo={set_userInfo}
      />

      <hr />

      <Link to={homeLink + "/users"}>
        <Button variant='primary' className='mt-5'>
          返回
        </Button>
      </Link>
    </div>
  );
}
