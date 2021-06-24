import React from "react";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {delete_Prom} from '../../../a_global/Api'

export default function ShopInfoTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>门店信息</h1>
			<div>
				{props.isDisabled === true && (
					<Button
						variant="warning"
						className=""
						onClick={() => {
							props.setIsDisabled(false);
						}}
					>
						修改信息
					</Button>
				)}

				<Link to={props.homeLink + "/shops/"}>
					<Button
						variant="danger"
						className="ml-3"
						onClick={props.handleDeleteShop}
					>
						删除门店
					</Button>
				</Link>
			</div>
		</div>
	);
}
