import React from "react";
import {
	HomeNav,
	HomeTitle,
	HomeList,
} from "../b_component/home/index";

export default function MgHome({homeLink}) {
	
	return (
		<div className="container">
			<HomeNav />
			<HomeTitle />

			<hr />

			<HomeList homeLink={homeLink} list={["shops","users"]}/>

		</div>
	);
}