import React from "react";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {delete_Prom} from '../../../a_global/Api'

export default function BrandInfoTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>品牌信息</h1>
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

				<Link to={props.homeLink + "/brands/"}>
					<Button
						variant="danger"
						className="ml-3"
						onClick={async () => {
							const result = await delete_Prom(
								"/Brand/" + props._id
							);
							if(result.status ===200){
								alert('删除成功！')
							}
							else{
								alert(result.message)
							}
						}}
					>
						删除品牌
					</Button>
				</Link>
			</div>
		</div>
	);
}
