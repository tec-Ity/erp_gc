import React from "react";
import {Button} from 'react-bootstrap'

export default function PdTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>产品列表</h1>

			{props.addPd && <Button
				variant="primary"
				onClick={props.addPd}
			>
				添加产品
			</Button>}
		</div>
	);
}
