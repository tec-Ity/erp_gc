import React, { useState } from "react";
import {
	HomeNav,
	HomeTitle,
	HomeList,
} from "../b_component/home/index";

export default function SfHome(props) {
	const [homeLink] = useState(props.homeLink);

	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />
			<hr />
			<HomeList homeLink={homeLink} list={['pds', 'brands','categs']}/>
		</div>
	);
}
