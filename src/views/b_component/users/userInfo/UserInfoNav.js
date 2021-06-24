import React from "react";
import {Breadcrumb} from 'react-bootstrap'

export default function UserInfoNav(props) {
	console.log(props.homeLink)
	return (
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink }>{"/  "}主页</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/users'}>员工管理</Breadcrumb.Item>

			<Breadcrumb.Item href={props.homeLink + '/users' + props._id} active>
				{props.userInfo && props.userInfo.nome}
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
