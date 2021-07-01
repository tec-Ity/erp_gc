import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function ProdNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink}>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href="#" active>
				商品管理
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
