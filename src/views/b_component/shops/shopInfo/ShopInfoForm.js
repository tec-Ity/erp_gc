import React, { useState, useEffect } from "react";
import { Form, Col, Button, Modal, Spinner } from "react-bootstrap";
import { put_Prom, get_Prom } from "../../../a_global/Api";
import LoadingModal from '../../../a_global/LoadingModal'

export default function ShopInfoForm(props) {
	const [validated, setValidated] = useState(false);
	const [nations, setNations] = useState();
	const [areas, setAreas] = useState();
	const [cities, setCities] = useState();
	const [loadingModal, set_loadingModal] = useState(false);

	const [dispOrgArea, setDispOrgArea] = useState(true);
	const [dispOrgCity, setDispOrgACity] = useState(true);

	useEffect(() => {
		getNations();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		set_loadingModal(true);
		const obj = new Object();
		obj.code = String(e.target.formGridCode.value);
		obj.nome = String(e.target.formGridName.value);
		obj.addr = String(e.target.formGridAddress.value);
		obj.Cita = String(e.target.formGridCity.value);
		obj.zip = String(e.target.formGridZip.value);

		const result = await put_Prom("/ShopPut/" + props._id, { obj });

		console.log(result);
		if (result.status === 200) {
			props.setIsDisabled(true);
			set_loadingModal(false);
			alert("修改成功");
		} else {
			set_loadingModal(false);
			alert(result.message);
		}
	};

	const getNations = async () => {
		const result1 = await get_Prom("/Nations");
		setNations(result1.data.objects);

		const NationId = props.shopInfo.Cita.Area.Nation._id;
		const result2 = await get_Prom("/Areas?Nation=" + NationId);
		setAreas(result2.data.objects);

		const AreaId = props.shopInfo.Cita.Area._id;
		const result3 = await get_Prom("/Citas?Area=" + AreaId);
		setCities(result3.data.objects);
	};

	const handleNation = async (e) => {
		const NationId = e.target.value;
		const result = await get_Prom("/Areas?Nation=" + NationId);
		setAreas(result.data.objects);
		setDispOrgArea(false);
	};

	const handleArea = async (e) => {
		const AreaId = e.target.value;
		const result = await get_Prom("/Citas?Area=" + AreaId);
		setCities(result.data.objects);
		setDispOrgACity(false);
	};

	return (
		<div className="container">
		<LoadingModal show={loadingModal}/>
			<Form onSubmit={handleSubmit} noValidate validated={validated}>
				<Form.Row>
					<Form.Group as={Col} controlId="formGridCode">
						<Form.Label>门店编号</Form.Label>
						<Form.Control
							onChange={(e) => {
								props.set_ShopInfo({
									...props.shopInfo,
									code: e.target.value,
								});
							}}
							value={props.shopInfo && props.shopInfo.code}
							type="text"
							required
							disabled={props.isDisabled}
						/>

						<Form.Control.Feedback>输入正确</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridName">
						<Form.Label>门店名称</Form.Label>
						<Form.Control
							onChange={(e) => {
								props.set_ShopInfo({
									...props.shopInfo,
									nome: e.target.value,
								});
							}}
							value={props.shopInfo && props.shopInfo.nome}
							type="text"
							required
							disabled={props.isDisabled}
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Col xs={8}>
						<Form.Group controlId="formGridAddress">
							<Form.Label>门店地址</Form.Label>
							<Form.Control
								onChange={(e) => {
									props.set_ShopInfo({
										...props.shopInfo,
										addr: e.target.value,
									});
								}}
								value={props.shopInfo && props.shopInfo.addr}
								placeholder="Viale xxxx"
								type="text"
								required
								disabled={props.isDisabled}
							/>
						</Form.Group>
					</Col>
					<Col xs={4}>
						<Form.Group controlId="formGridZip">
							<Form.Label>邮编</Form.Label>
							<Form.Control
								onChange={(e) => {
									props.set_ShopInfo({
										...props.shopInfo,
										zip: e.target.value,
									});
								}}
								value={props.shopInfo && props.shopInfo.zip}
								type="text"
								required
								disabled={props.isDisabled}
							/>
						</Form.Group>
					</Col>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId="formGridNation">
						<Form.Label>国家</Form.Label>

						<Form.Control
							as="select"
							onChange={props.handleNation}
							required
							disabled={props.isDisabled}
						>
							<option
								value={
									props.shopInfo &&
									props.shopInfo.Cita.Area.Nation._id
								}
							>
								{props.shopInfo &&
									props.shopInfo.Cita.Area.Nation.nome}
								{"  "}(
								{props.shopInfo &&
									props.shopInfo.Cita.Area.Nation.code}
								)
							</option>
							{props.isDisabled === false &&
								nations?.map((nation) => {
									return props.shopInfo &&
										props.shopInfo.Cita &&
										props.shopInfo.Cita.Area &&
										props.shopInfo.Cita.Area.Nation &&
										String(
											props.shopInfo.Cita.Area.Nation._id
										) === String(nation._id) ? null : (
										<option
											value={nation._id}
											key={nation._id}
										>
											{nation.nome} ({nation.code})
										</option>
									);
								})}
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridArea">
						<Form.Label>区域</Form.Label>
						<Form.Control
							as="select"
							onChange={handleArea}
							required
							disabled={props.isDisabled}
						>
							{dispOrgArea && (
								<option
									value={
										props.shopInfo &&
										props.shopInfo.Cita.Area._id
									}
								>
									{props.shopInfo &&
										props.shopInfo.Cita.Area.nome}
									{"  "}(
									{props.shopInfo &&
										props.shopInfo.Cita.Area.code}
									)
								</option>
							)}
							{areas?.map((area) => {
								return String(props.shopInfo.Cita.Area._id) ===
									String(area._id) ? null : (
									<option value={area._id} key={area._id}>
										{area.nome} ({area.code})
									</option>
								);
							})}
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>城市</Form.Label>
						<Form.Control
							as="select"
							required
							disabled={props.isDisabled}
						>
							{dispOrgCity && (
								<option
									value={
										props.shopInfo &&
										props.shopInfo.Cita._id
									}
								>
									{props.shopInfo && props.shopInfo.Cita.nome}
									{"  "}(
									{props.shopInfo && props.shopInfo.Cita.code}
									)
								</option>
							)}
							{cities?.map((city) => {
								return String(props.shopInfo.Cita._id) ===
									String(city._id) ? null : (
									<option value={city._id} key={city._id}>
										{city.nome} ({city.code})
									</option>
								);
							})}
						</Form.Control>
					</Form.Group>
				</Form.Row>

				{/* <Form.Group>
		            <Form.File
		              // className="position-relative"
		              required disabled={props.isDisabled}
		              name="file"
		              label="File"
		              // onChange={handleChange}
		              // isInvalid={!!errors.file}
		              // feedback={errors.file}
		              id="formShopLogo"
		              custom
		            />
		          </Form.Group>*/}

				{props.isDisabled === false && (
					<div>
						<Button
							variant="danger"
							className="mt-4"
							onClick={async () => {
								props.setIsDisabled(true);
								const result = await get_Prom(
									"/Shop/" + props._id
								);
								console.log(result);
								props.set_ShopInfo(result.data.object);
							}}
						>
							取消更改
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="mt-4 ml-3"
						>
							更改信息
						</Button>
					</div>
				)}
			</Form>
		</div>
	);
}
