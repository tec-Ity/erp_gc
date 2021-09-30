import React, { useState } from "react";
import { Form, Modal, Button, Col } from "react-bootstrap";
import { put_Prom } from "../../../a_global/Api";

export default function ModalUserPwd(props) {
	const [validated, ] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const obj = {};
		obj.pwd = String(e.target.formGridPwd.value);
		const result = await put_Prom("/User/" + props.userId, {
			obj,
		});

		 
		if (result.status === 200) {
			alert("修改成功")
			props.onHide();
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
					修改密码
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit} noValidate validated={validated}>
				<Modal.Body>
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
				</Modal.Body>

				<Modal.Footer>
					<Button type="submit">确认修改</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
