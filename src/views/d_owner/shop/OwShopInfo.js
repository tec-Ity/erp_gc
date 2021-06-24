import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom, delete_Prom, put_Prom } from "../../a_global/Api";
import { Form, Col, Button, Breadcrumb, Spinner } from "react-bootstrap";
import {
	ShopInfoNav,
	ShopInfoTitle,
	ShopInfoForm,
	ShopInfoService,
} from "../../b_component/shops/shopInfo/index";

export default function OwShopInfo() {
	const [homeLink] = useState("/owner/home");
	const { _id } = useParams();
	const [shopInfo, set_ShopInfo] = useState();
	const [isDisabled, setIsDisabled] = useState(true);
	const [newServ, set_newServ] = useState()

	useEffect(async () => {
		const result = await get_Prom("/Shop/" + _id);
		set_ShopInfo(Object.assign({}, shopInfo, result.data.object));
	}, [newServ]);

	const handleDeleteShop = async () => {
		const result = await delete_Prom("/ShopDelete/" + _id);
		if(result.status!==200){
			alert(result.message);
		}
	};

	return (
		<div className="container">
			<ShopInfoNav homeLink={homeLink} _id={_id} shopInfo={shopInfo} />
			<ShopInfoTitle
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				homeLink={homeLink}
				handleDeleteShop={handleDeleteShop}
			/>

			<hr />

			{shopInfo ? (
				<ShopInfoForm
					_id={_id}
					shopInfo={shopInfo}
					isDisabled={isDisabled}
					setIsDisabled={setIsDisabled}
					set_ShopInfo={set_ShopInfo}
				/>
			) : (
				<div>
					<Spinner animation="border" variant="primary" />
					{"   "}加载中。。。
				</div>
			)}

			<hr className="my-4"/>
			{shopInfo ? <ShopInfoService shopInfo={shopInfo}
			newServ={newServ}
			set_newServ={set_newServ}
			set_ShopInfo={set_ShopInfo}/> : ""}

			<Link to="/owner/home/shops">
				<Button variant="primary" className="mt-5">
					返回
				</Button>
			</Link>
		</div>
	);
}
