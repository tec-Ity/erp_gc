import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function HomeList(props) {
	const [listName]=useState({
		shops:"门店管理",
		users:"员工管理",
		pds:"产品管理",
		orders:"订单管理",
		brands:"品牌管理",
		categs:"分类管理",
		prods:"商品管理"
	})
	
	return (
		<div className="d-flex justify-content-around mt-4">
			{props.list?.map((elem, index) => (
				listName[elem]&&
				<Link
					className="m-auto"
					key={index}
					to={props.homeLink + "/" + elem}
				>
					<div className="border border-primary rounded p-2">
						<img
							src={process.env.PUBLIC_URL + "/comment.png"}
							alt={listName[elem]}
							className="img-thumbnail"
							style={{ height: "70px", width: "70px" }}
						/>
						<span className="d-block text-center font-weight-bold mt-3">
							{listName[elem]}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
}
