import React from "react";
import { Button } from "react-bootstrap";
import { delete_Prom } from "../../../a_global/Api";
import { Link } from "react-router-dom";

export default function UserInfoTitle(props) {
	return (
		<div className="d-flex justify-content-between my-4">
			<h1>员工信息</h1>
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

				{props.isDisabled === true && (
					<Button
						variant="warning"
						className="ml-3"
						onClick={() => props.setModalPwdShow(true)}
					>
						修改密码
					</Button>
				)}
				<Link to={props.homeLink + "/users"}>
					<Button
						variant="danger"
						className="ml-3"
						onClick={async () => {
							const result = await delete_Prom(
								"/UserDelete/" + props._id
							);
							if(result.status === 200){
								alert('删除成功')
							}
							else{
								alert(result.message)
							}
						}}
					>
						删除员工
					</Button>
				</Link>
			</div>
		</div>
	);
}
