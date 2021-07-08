import React, { useState } from "react";
import {
	HomeNav,
	HomeTitle,
	HomeList,
} from "../b_component/home/index";

export default function OwHome() {
	const [homeLink] = useState("/owner/home");

	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />

			<hr />

			<HomeList homeLink={homeLink} list={["shops","users"]}/>
		</div>
	);
}
