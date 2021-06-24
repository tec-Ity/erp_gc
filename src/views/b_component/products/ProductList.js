import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom, get_DNS } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductList(props) {
	const [Products, setProducts] = useState(null);
	const [ProductList, setProductList] = useState();

	const getProductList = async () => {
		try {
			const result = await get_Prom("/Pds");
			// console.log(result);
			const pds = result.data.objects;
			setProducts(pds);
			console.log(pds);
		} catch {
			// setProducts(null);
		}
	};

	useEffect(() => {
		getProductList();
		console.log("update");
		if (Products !== null) {
			props.set_LoadingModalShow(false);
		} else {
			props.set_LoadingModalShow(true);
		}
	}, [props.newProduct]);


	useEffect(() => {
		let pdList;
		if (Products !== null) {
			props.set_LoadingModalShow(false);
		} else {
			props.set_LoadingModalShow(true);
		}
		if (Products === null) {
		} else {
			pdList = (
				<tbody >
					{Products?.map((pd, index) => (
						<tr key={pd._id} >
							<td className=" align-middle">{index + 1}</td>
							<td className=" align-middle">
								{pd.img_urls.length>0
									? <img width="50px" src={ get_DNS()+pd.img_urls[0]} alt={pd.code}/>
									: <img width="50px" src={process.env.PUBLIC_URL +
									  "/Pd_default.png"} alt={pd._id}/>}
							</td>
							<td className=" align-middle" title={pd.code_bar}>{pd.nome}</td>
							<td className=" align-middle">{pd.price}</td>
							<td className=" align-middle">{pd.unit}</td>
							<td className=" align-middle">{pd.Brand?.code}</td>
							<td className=" align-middle">{pd.Nation.code}</td>
							<td className=" align-middle">{pd.sort}</td>
							<td className=" align-middle">
								{localStorage.getItem("role_crUser") <
									100 && (
									<Link
										to={props.homeLink + "/products/" + pd._id}
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
		setProductList(pdList);
	}, [Products, props.newProduct]);

	return (
		<div className="container">
			<Table striped hover className="text-center">
				<thead>
					<tr>
						<th>序号</th>
						<th>图片</th>
						<th title="条形码">产品名</th>
						<th>默认价格</th>
						<th>单位</th>
						<th>品牌</th>
						<th>国家</th>
						<th>优先级</th>

						<th>查看更多</th>
					</tr>
				</thead>
				{Products !== null ? (
					ProductList
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