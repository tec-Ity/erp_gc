import React, { useState, useEffect } from "react";
import {
	Modal,
	Button,
	Form,
	Col,
	FormFile,
	InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchGet_Prom, get_Prom, post_Prom } from "../../a_global/Api";

export default function ModalAddCateg(props) {
	const [validated, set_validated] = useState();
	const [levFar, set_levFar] = useState();
	const [showFar, set_showFar] = useState(false);

	useEffect(async () => {
		const result = await get_Prom("/Categs?&level=1");
		set_levFar(result.data.objects);
	}, []);

	const handleAddCateg = async (e) => {
		e.preventDefault();
		const obj = new Object();
		obj.code = String(e.target.formGridCode.value);
		obj.level = String(e.target.formGridLevel.value);
		console.log(obj.code)
		showFar?obj.Categ_far = String(e.target.formGridFar.value):obj.Categ_far=null;
		// obj.img_url = String(e.target.formGridNation.value);
		const result = await post_Prom("/CategPost", { obj });
		console.log(result);
		if (result.status === 200) {
			props.onHide();
			const bd = result.data.object;
			set_showFar(false);
			props.set_newCateg(bd);
			alert("分类添加成功！");
		} else {
			alert(result.message);
		}
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					添加分类
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleAddCateg} noValidate validated={validated}>
				<Modal.Body>
					<Form.Row>
						<Col xs={12} md={6}>
							<Form.Group controlId="formGridCode">
								<Form.Label>分类编号 *</Form.Label>
								<Form.Control type="text" required />
							</Form.Group>
						</Col>
						<Col xs={12} md={6}>
							<Form.Group controlId="formGridLevel">
								<Form.Label>分类层级 *</Form.Label>
								<Form.Control
									as="select"
									required
									onChange={(e) => {
										if(e.target.value == 2){
											set_showFar(true);
										}
										else if(e.target.value == 1){
											set_showFar(false)
										}
									}}
								>
									<option value="1"> 一级分类 </option>
									<option value="2"> 二级分类 </option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Form.Row>

					{showFar&&<Form.Row>
						<Col xs={12} md={6}>
							<Form.Group controlId="formGridFar">
								<Form.Label>所属上级分类</Form.Label>
								<Form.Control as="select" required>
									<option value="">请选择分类</option>
									{levFar?.map((far) => {
										console.log(levFar)
										return (
											<option
												value={far._id}
												key={far._id}
											>
												{far.code}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Col>
					</Form.Row>}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" type="submit" className="mt-4">
						添加
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
