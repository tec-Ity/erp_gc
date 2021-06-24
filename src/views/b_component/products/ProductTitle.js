import React from "react";
import {Button} from 'react-bootstrap'

export default function ProductTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>产品列表</h1>

			{props.addProduct && <Button
				variant="primary"
				onClick={props.addProduct}
			>
				添加产品
			</Button>}
		</div>
	);
}
