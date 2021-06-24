import React from "react";
import {Button} from 'react-bootstrap'

export default function ShopTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>分店列表</h1>

			{props.addShop && <Button
				variant="primary"
				onClick={props.addShop}
			>
				添加门店
			</Button>}
		</div>
	);
}
