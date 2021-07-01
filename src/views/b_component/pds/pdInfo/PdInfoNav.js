import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function PdInfoNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink }>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/pds'}>产品管理</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/pds' + props._id} active>
				{props.productInfo && props.productInfo.nome}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}



