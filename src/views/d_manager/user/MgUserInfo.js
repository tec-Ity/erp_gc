import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom, delete_Prom, post_Prom } from "../../a_global/Api";
import { Form, Col, Button, Breadcrumb, InputGroup } from "react-bootstrap";
import {
	UserInfoNav,
	UserInfoTitle,
	UserInfoForm,
	ModalUserPwd,
} from "../../b_component/users/userInfo/index";

export default function MgUserInfo(props) {
	const [homeLink] = useState("/manager/home")
	const { _id } = useParams();
	const [userInfo, set_userInfo] = useState();
	const [isDisabled, setIsDisabled] = useState(true);
	const [ModalPwdShow, setModalPwdShow] = useState(false);

	useEffect(async () => {
		const result = await get_Prom("/User/" + _id);
		set_userInfo(Object.assign({}, userInfo, result.data.object));
	}, []);



	return (
		<div className="container">
			<UserInfoNav homeLink={homeLink} userInfo={userInfo}/>
			<UserInfoTitle
				_id={_id}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				setModalPwdShow={setModalPwdShow}
				homeLink={homeLink}
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

			<Link to={homeLink + '/users'}>
				<Button variant="primary" className="mt-5">
					返回
				</Button>
			</Link>
		</div>
	);
}
