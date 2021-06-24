import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function BrandInfoNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink }>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/brands'}>品牌管理</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/brands' + props._id} active>
				{props.brandInfo && props.brandInfo.nome}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
