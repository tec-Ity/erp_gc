import React, { useState } from "react";
import {
	HomeNav,
	HomeTitle,
	HomeList,
} from "../b_component/home/index";

export default function SwHome() {
	const [homeLink] = useState("/sworker/home");

	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />

			<hr />

			<HomeList homeLink={homeLink} list={[]}/>
		</div>
	);
}
