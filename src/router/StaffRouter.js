import React, { useState } from "react";
import { Route, Switch,  Redirect } from "react-router-dom";
import SfHome from "../views/d_staff/SfHome";
import SfPds from "../views/d_staff/pd/SfPds";
import SfPdInfo from "../views/d_staff/pd/SfPdInfo";
import SfBrands from "../views/d_staff/brand/SfBrands";
import SfBrandInfo from "../views/d_staff/brand/SfBrandInfo";
import SfCategs from '../views/d_staff/categ/SfCategs'
// import SfUsers from "../views/d_staff/user/SfUsers"
// import SfUserInfo from "../views/d_staff/user/SfUserInfo"

export default function StaffRouter(props) {
	const [homeLink] = useState("/staff/home");
	console.log("StaffRouter");
	return (
		<Switch>
			<Route exact path="/staff/home/">
				<SfHome homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/pds">
				<SfPds homeLink={homeLink} />
			</Route>
			<Route exact path="/staff/home/pds/:_id">
				<SfPdInfo homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/brands">
				<SfBrands homeLink={homeLink} />
			</Route>
			<Route exact path="/staff/home/brands/:_id">
				<SfBrandInfo homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/categs">
				<SfCategs homeLink={homeLink} />
			</Route>


			<Redirect to={homeLink} />
		</Switch>
	);
}
