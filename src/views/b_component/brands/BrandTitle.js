import React from "react";
import {Button} from 'react-bootstrap'

export default function BrandTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>品牌列表</h1>
			<Button
				variant="primary"
				onClick={props.addBrand}
			>
				添加品牌
			</Button>
		</div>
	);
}
