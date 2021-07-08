import React, { useState,  } from "react";
import {
	UserNav,
	UserTitle,
	UserTable,
	ModalAddUser,
} from "../../b_component/users/index";
import LoadingModal from "../../a_global/LoadingModal";

export default function MgUsers(props) {
	const [homeLink] = useState(props.homeLink);
	const [ModalShow, setModalShow] = useState(false);
	const [newUser, set_newUser] = useState();
	const [LoadingModalShow, set_LoadingModalShow] = useState(false);

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

			<LoadingModal show={LoadingModalShow} />

			
			<UserTable
				newUser={newUser}
				homeLink={homeLink}
				set_LoadingModalShow={set_LoadingModalShow}
			/>
		</div>
	);
}
