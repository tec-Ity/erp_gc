import React from "react";
import {Button} from 'react-bootstrap'

export default function CategTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>分类列表</h1>
			<Button
				variant="primary"
				onClick={props.addCateg}
			>
				添加分类
			</Button>
		</div>
	);
}
