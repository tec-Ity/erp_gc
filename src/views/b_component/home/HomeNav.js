import React from 'react'
import {Breadcrumb} from 'react-bootstrap'

export default function HomeNav(){



	return(
		<Breadcrumb className="mt-3">
			<Breadcrumb.Item href="#" active>
				{"/  "}主页
			</Breadcrumb.Item>
		</Breadcrumb>
	)
}