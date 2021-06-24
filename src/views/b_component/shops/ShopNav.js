import React from 'react'
import {Breadcrumb} from 'react-bootstrap'


export default function ShopNav(props){



	return(
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href={props.homeLink}>
				{"/  "}主页
			</Breadcrumb.Item>

			<Breadcrumb.Item href="#" active>
				门店管理
			</Breadcrumb.Item>
		</Breadcrumb>
	)
}