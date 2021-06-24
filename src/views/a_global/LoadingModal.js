import React from 'react'
import {Modal, Spinner} from 'react-bootstrap'

export default function LoadingModal(props) {
	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<div className="Row d-flex justify-content-center m-5">
				<Spinner
					animation="border"
					variant="primary"
					className="mr-3"
				/>
				<h3>loading......</h3>
			</div>
		</Modal>
	);
}
