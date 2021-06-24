import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Table, Button, Spinner } from "react-bootstrap";
import {
	UserNav,
	UserTitle,
	UserTable,
	ModalAddUser,
} from "../../b_component/users/index";
import {
	fetchGet_Prom,
	get_Prom,
	post_Prom,
	delete_Prom,
} from "../../a_global/Api";

export default function SbUsers() {
	const [homeLink] = useState("/sboss/home");
	const [newUser, set_newUser] = useState();
	const [ModalShow, setModalShow] = useState(false);
	
	return (
		<div className="container">
			<UserNav homeLink={homeLink} />

			<UserTitle addUser={() => setModalShow(true)} />
			
			{ModalShow && (
				<ModalAddUser
					show={ModalShow}
					onHide={() => {
						setModalShow(false);
					}}
					set_newUser={set_newUser}
				/>
			)}

			<hr />

			<UserTable newUser={newUser} homeLink={homeLink} />
		</div>
	);
}
