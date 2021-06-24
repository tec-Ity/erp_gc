import React, { useState } from "react";
import {
	ShopNav,
	ShopTitle,
	ShopList,
	ModalAddShop,
} from "../../b_component/shops/index";
import { post_Prom } from "../../a_global/Api";

export default function OwShops() {
	const [homeLink] = useState("/owner/home");
	const [ModalShow, set_ModalShow] = useState(false);
	const [newShop, set_newShop] = useState();

	return (
		<div className="container">
			<ShopNav homeLink={homeLink} />
			<ShopTitle addShop={() => set_ModalShow(true)} />

			<hr />

			{ModalShow && (
				<ModalAddShop
					show={ModalShow}
					onHide={() => set_ModalShow(false)}
					set_newShop={set_newShop}
				/>
			)}

			<ShopList newShop={newShop} homeLink={homeLink} />
		</div>
	);
}
