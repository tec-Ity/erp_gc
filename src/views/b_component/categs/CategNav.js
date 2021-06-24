import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function CategNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink}>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href="#" active>
				分类管理
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
