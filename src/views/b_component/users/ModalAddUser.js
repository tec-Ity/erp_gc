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

export default function ModalAddUser(props) {
	const [validated, set_validated] = useState();
	const [crUR] = useState(localStorage.getItem("role_crUser"));
	const [addUserRole, set_addUserRole] = useState(0);
	const [userRole] = useState([
		{ value: 1, key: "拥有者" },
		{ value: 3, key: "管理者" },
		{ value: 5, key: "超级员工" },
		{ value: 101, key: "店铺老板" },
		{ value: 105, key: "店铺员工" },
	]);

	const [Shops, set_Shops] = useState(null);

	useEffect(async () => {
		const result = await get_Prom("/Shops");
		console.log(result);
		const shops = result.data.objects;
		set_Shops(shops);
	}, [addUserRole]);

	const handleAddUser = async (e) => {
		e.preventDefault();
		const obj = new Object();
		obj.code = String(e.target.formGridCode.value);
		obj.nome = String(e.target.formGridName.value);
		obj.phonePre = "0039";
		obj.phone = String(e.target.formGridPhone.value);
		obj.role = String(e.target.formGridRole.value);
		obj.pwd = String(e.target.formGridPwd.value);
		if(addUserRole >= 101 && crUR !== 101){

		obj.Shop= String(e.target.formGridShop.value);
		}
		const result = await post_Prom("/UserPost", { obj });
		console.log(result);
		if (result.status === 200) {
			props.onHide();
			set_addUserRole(0);
			const user = result.data.object;
			props.set_newUser(user);
			alert("用户添加成功！");
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
					添加员工
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleAddUser} noValidate validated={validated}>
				<Modal.Body>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridCode">
							<Form.Label>员工编号</Form.Label>
							<Form.Control type="text" required />
							<Form.Control.Feedback>
								输入正确
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>员工姓名</Form.Label>
							<Form.Control type="text" required />
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridPhone">
							<Form.Label>手机号</Form.Label>
							<InputGroup hasValidation>
								<InputGroup.Text id="inputGroupPrepend">
									+39
								</InputGroup.Text>
								<Form.Control
									placeholder="输入10位手机号"
									type="text"
									required
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridRole">
							<Form.Label>职位</Form.Label>
							<Form.Control
								as="select"
								required
								onChange={(e) =>
									set_addUserRole(e.target.value)
								}
							>
								<option value="">请选择职位</option>
								{userRole.map((role, index) => {
									return (
										crUR < role.value && (
											<option value={role.value}>
												{role.key}
											</option>
										)
									);
								})}
							</Form.Control>
						</Form.Group>
					</Form.Row>

					{addUserRole >= 101 && crUR !== 101 && (
						<Form.Row>
							<Form.Group as={Col} controlId="formGridShop">
								<Form.Label>所属分店</Form.Label>
								<Form.Control as="select" required>
									<option value="">请选择分店</option>
									{Shops?.map((shop) => {
										return (
											<option
												value={shop._id}
												key={shop._id}
											>
												{shop.nome}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Form.Row>
					)}

					<Form.Row>
						<Form.Group as={Col} controlId="formGridPwd">
							<Form.Label>设置密码</Form.Label>
							<Form.Control
								placeholder="输入新密码"
								type="password"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridPwd2">
							<Form.Label>验证密码</Form.Label>
							<Form.Control
								placeholder="再次输入密码"
								type="password"
								required
							/>
						</Form.Group>
					</Form.Row>

					{/* <Form.Group>
	            <Form.File
	              // className="position-relative"
	              required
	              name="file"
	              label="File"
	              // onChange={handleChange}
	              // isInvalid={!!errors.file}
	              // feedback={errors.file}
	              id="formShopLogo"
	              custom
	            />
	          </Form.Group>*/}
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="primary"
						type="submit"
						className="mt-4"
						// onClick={props.onHide;}
					>
						添加
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
