import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function ProductInfoNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink }>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/products'}>产品管理</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/products' + props._id} active>
				{props.brandInfo && props.brandInfo.nome}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}



