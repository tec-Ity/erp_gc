import React from "react";
import {Button} from 'react-bootstrap'

export default function UserTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>员工列表</h1>
			<Button
				variant="primary"
				onClick={props.addUser}
			>
				添加员工
			</Button>
		</div>
	);
}
