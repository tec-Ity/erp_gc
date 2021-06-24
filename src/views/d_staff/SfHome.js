import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	HomeNav,
	HomeTitle,
	HomeList,
	HomeListShops,
	HomeListUsers,
} from "../b_component/home/index";

export default function SfHome() {
	const [homeLink] = useState("/staff/home");

	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />

			<hr />

			<HomeList homeLink={homeLink} list={['products', 'brands','categs']}/>
		</div>
	);
}
