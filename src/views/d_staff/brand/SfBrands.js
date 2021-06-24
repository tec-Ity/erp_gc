import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	BrandNav,
	BrandTitle,
	BrandList,
	ModalAddBrand,
} from "../../b_component/brands/index";
import {
	fetchGet_Prom,
	get_Prom,
	post_Prom,
	delete_Prom,
} from "../../a_global/Api";
import LoadingModal from "../../a_global/LoadingModal";

export default function SfBrands() {
	const [homeLink] = useState("/staff/home");
	const [newBrand, set_newBrand] = useState();
	const [ModalShow, setModalShow] = useState(false);
	const [LoadingModalShow, set_LoadingModalShow] = useState(false);

	return (
		<div className="container">
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
