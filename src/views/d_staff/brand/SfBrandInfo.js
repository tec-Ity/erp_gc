import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom, delete_Prom, post_Prom } from "../../a_global/Api";
import { Form, Col, Button, Breadcrumb, InputGroup } from "react-bootstrap";
import {
	BrandInfoNav,
	BrandInfoTitle,
	BrandInfoForm,
} from "../../b_component/brands/brandInfo/index";

export default function SfBrandInfo() {
	const [homeLink] = useState("/staff/home");
	const { _id } = useParams();
	const [brandInfo, set_brandInfo] = useState();
	const [isDisabled, setIsDisabled] = useState(true);
	const [ModalPwdShow, setModalPwdShow] = useState(false);


	useEffect(async () => {
		const result = await get_Prom("/Brand/" + _id);
		set_brandInfo(Object.assign({}, brandInfo, result.data.object));
	}, []);

	const handleUpdatePwd = async () => {};

	return (
		<div className="container">
			<BrandInfoNav homeLink={homeLink} brandInfo={brandInfo} />
			<BrandInfoTitle
				_id={_id}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				setModalPwdShow={setModalPwdShow}
				homeLink={homeLink}
			/>
			<hr />

			<BrandInfoForm
				_id={_id}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				brandInfo={brandInfo}
				set_brandInfo={set_brandInfo}
			/>
			<hr />

			<Link to="/staff/home/brands">
				<Button variant="primary" className="mt-5">
					返回
				</Button>
			</Link>
		</div>
	);
}
