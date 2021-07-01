import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function ProdInfoNav(props) {
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink }>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/prods'}>商品管理</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/prods' + props._id} active>
				{props.productInfo && props.productInfo.nome}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}



