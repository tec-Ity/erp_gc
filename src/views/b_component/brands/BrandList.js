import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom, get_DNS } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BrandList(props) {
	const [Brands, setBrands] = useState(null);
	const [BrandList, setBrandList] = useState();

	const getBrandList = async () => {
		try {
			const result = await get_Prom("/Brands");
			console.log(result);
			const brands = result.data.objects;
			setBrands(brands);
			// console.log(brands);
		} catch {
			// setBrands(null);
		}
	};

	useEffect(() => {
		getBrandList();
		if (Brands !== null) {
			props.set_LoadingModalShow(false);
		} else {
			props.set_LoadingModalShow(true);
		}
	}, [props.newBrand]);


	useEffect(() => {
		let bdList;
		if (Brands !== null) {
			props.set_LoadingModalShow(false);
		} else {
			props.set_LoadingModalShow(true);
		}
		if (Brands === null) {
		} else {
			bdList = (
				<tbody >
					{Brands?.map((bd, index) => (
						<tr key={bd._id} >
							<td className=" align-middle">{index + 1}</td>
							<td className=" align-middle">
								{bd.img_url
									? <img width="50px" src={get_DNS() + (bd.img_url).substring(1)}/>
									: <img width="50px" src={process.env.PUBLIC_URL +
									  "/Pd_default.png"}/>}
							</td>
							<td className=" align-middle">{bd.code}</td>
							<td className=" align-middle">{bd.nome}</td>
							<td className=" align-middle">{bd.Nation.code}</td>
							<td className=" align-middle">{bd.sort}</td>
							<td className=" align-middle">
								{localStorage.getItem("role_crUser") <
									100 && (
									<Link
										to={props.homeLink + "/brands/" + bd._id}
									>
										<Button variant="success">管理</Button>
									</Link>
								)}
							</td>
						</tr>
					))}
				</tbody>
			);
		}
		setBrandList(bdList);
	}, [Brands]);

	return (
		<div className="container">
			<Table striped hover className="text-center">
				<thead>
					<tr>
						<th>序号</th>
						<th>图片</th>
						<th>品牌编号</th>
						<th>品牌名称</th>
						<th>所属国家</th>
						<th>优先级</th>

						<th>查看更多</th>
					</tr>
				</thead>
				{Brands !== null ? (
					BrandList
				) : (
					<tbody>
						<tr>
							<td colSpan="6">
								{/*<Spinner animation="border" variant="primary" />
								{"   "}加载中。。。*/}
							</td>
						</tr>
					</tbody>
				)}
			</Table>
		</div>
	);
}
