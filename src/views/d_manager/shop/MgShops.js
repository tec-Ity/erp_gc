import React, { useState } from "react";
import { ShopNav, ShopTitle, ShopList, ModalAddShop } from "../../b_component/shops/index";

export default function MgShops(props) {
	const [homeLink] = useState(props.homeLink);
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
					homeLink={homeLink}
				/>
			)}

			<ShopList newShop={newShop} homeLink={homeLink} />
		</div>
	);
}
