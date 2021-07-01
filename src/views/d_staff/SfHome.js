import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	HomeNav,
	HomeTitle,
	HomeList,
} from "../b_component/home/index";

export default function SfHome() {
	const [homeLink] = useState("/staff/home");

	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />

			<hr />

			<HomeList homeLink={homeLink} list={['pds', 'brands','categs']}/>
		</div>
	);
}
